'use strict';

const productRepository = require('./_lib/product-repository');
const { OpenSheetProviderError } = require('./_lib/opensheet-provider');
const {
    createProductPath,
    createProductSlug,
    createProductUrl,
    isCanonicalProductSlug
} = require('./_lib/product-url');
const { resolveProductImageUrl } = require('./_lib/product-image-url');
const { renderProductPage } = require('./_lib/product-template');

const SITE_URL = process.env.SITE_URL || 'https://tienda-nails.vercel.app';
const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;
const ALLOWED_METHODS = 'GET, HEAD';
const HTML_HEADERS = Object.freeze({
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
});
const PRODUCT_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=300, must-revalidate';
const NO_STORE_CACHE_CONTROL = 'no-store';

const STATUS_PAGES = Object.freeze({
    404: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Producto no encontrado | Nanty Nails Shop</title></head><body><main><h1>Producto no encontrado</h1><p>No encontramos el producto solicitado.</p></main></body></html>',
    405: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Método no permitido | Nanty Nails Shop</title></head><body><main><h1>Método no permitido</h1><p>Este recurso sólo admite GET y HEAD.</p></main></body></html>',
    500: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Error interno | Nanty Nails Shop</title></head><body><main><h1>No pudimos mostrar este producto</h1><p>Ocurrió un error inesperado.</p></main></body></html>',
    503: '<!DOCTYPE html><html lang="es"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"><title>Servicio temporalmente no disponible | Nanty Nails Shop</title></head><body><main><h1>Servicio temporalmente no disponible</h1><p>No pudimos cargar este producto temporalmente.</p></main></body></html>'
});

function setHeaders(response, headers = {}) {
    Object.entries({ ...HTML_HEADERS, ...headers }).forEach(([name, value]) => {
        response.setHeader(name, value);
    });
}

function setCacheHeaders(response, statusCode) {
    response.removeHeader?.('Vercel-CDN-Cache-Control');

    if (statusCode === 200) {
        response.setHeader('Cache-Control', PRODUCT_CACHE_CONTROL);
        return;
    }

    response.setHeader('Cache-Control', NO_STORE_CACHE_CONTROL);
}

function sendResponse(request, response, statusCode, body = '', headers = {}) {
    response.statusCode = statusCode;
    setHeaders(response, headers);
    setCacheHeaders(response, statusCode);
    response.end(request.method === 'HEAD' ? undefined : body);
}

function hasInvalidQueryValue(value) {
    return Array.isArray(value) || (value !== undefined && typeof value !== 'string');
}

function resolveActiveReplacementUrl(product, products, siteUrl) {
    const replacementId = product.replacementId;

    if (product.active !== false
        || typeof replacementId !== 'string'
        || !PRODUCT_ID_PATTERN.test(replacementId)
        || replacementId === product.id) {
        return null;
    }

    const replacement = products.find(candidate => candidate.id === replacementId);
    if (!replacement || replacement.active !== true) return null;

    return createProductUrl(replacement, siteUrl);
}

function createStableHash(value) {
    let hash = 2_166_136_261;

    for (const character of String(value)) {
        hash ^= character.codePointAt(0);
        hash = Math.imul(hash, 16_777_619);
    }

    return hash >>> 0;
}

function getDisplayedPrice(product) {
    const salePrice = Number.isFinite(product?.salePrice) && product.salePrice >= 0
        ? product.salePrice
        : null;
    const price = Number.isFinite(product?.price) && product.price >= 0
        ? product.price
        : null;

    return salePrice ?? price;
}

function selectRelatedProducts(product, products, {
    siteUrl = SITE_URL,
    limit = 4
} = {}) {
    if (!product || !Array.isArray(products)) return [];

    const category = typeof product.category === 'string'
        ? product.category.trim()
        : '';
    if (!category) return [];

    const safeLimit = Number.isInteger(limit) && limit > 0
        ? Math.min(limit, 4)
        : 4;
    const seenIds = new Set();
    const seenUrls = new Set();
    const candidates = [];

    for (const candidate of products) {
        if (!candidate
            || candidate.active !== true
            || candidate.id === product.id
            || typeof candidate.id !== 'string'
            || !PRODUCT_ID_PATTERN.test(candidate.id)
            || candidate.category !== category
            || seenIds.has(candidate.id)) {
            continue;
        }

        const price = getDisplayedPrice(candidate);
        const imageUrl = resolveProductImageUrl(candidate.image, siteUrl);
        const canonicalUrl = createProductUrl(candidate, siteUrl);

        if (price === null
            || !imageUrl
            || !canonicalUrl
            || seenUrls.has(canonicalUrl)) {
            continue;
        }

        seenIds.add(candidate.id);
        seenUrls.add(canonicalUrl);
        candidates.push({
            product: candidate,
            canonicalUrl,
            imageUrl,
            price,
            score: createStableHash(`${product.id}:${candidate.id}`)
        });
    }

    return candidates
        .sort((firstCandidate, secondCandidate) => (
            firstCandidate.score - secondCandidate.score
            || firstCandidate.product.id.localeCompare(secondCandidate.product.id)
        ))
        .slice(0, safeLimit)
        .map(({ score, ...candidate }) => candidate);
}

function createProductHandler({
    repository = productRepository,
    siteUrl = SITE_URL,
    renderPage = renderProductPage
} = {}) {
    if (!repository || typeof repository.getAllProducts !== 'function') {
        throw new TypeError('repository debe implementar getAllProducts().');
    }

    if (typeof renderPage !== 'function') {
        throw new TypeError('renderPage debe ser una función.');
    }

    return async function productHandler(request, response) {
        const method = request.method || '';

        if (method !== 'GET' && method !== 'HEAD') {
            sendResponse(request, response, 405, STATUS_PAGES[405], {
                Allow: ALLOWED_METHODS
            });
            return;
        }

        const id = request.query?.id;
        const slug = request.query?.slug;

        if (hasInvalidQueryValue(id)
            || hasInvalidQueryValue(slug)
            || typeof id !== 'string'
            || !PRODUCT_ID_PATTERN.test(id)) {
            sendResponse(request, response, 404, STATUS_PAGES[404]);
            return;
        }

        try {
            const products = await repository.getAllProducts();
            const product = products.find(candidate => candidate.id === id) || null;

            if (!product) {
                sendResponse(request, response, 404, STATUS_PAGES[404]);
                return;
            }

            if (product.active !== true && product.active !== false) {
                sendResponse(request, response, 404, STATUS_PAGES[404]);
                return;
            }

            const replacementUrl = resolveActiveReplacementUrl(
                product,
                products,
                siteUrl
            );
            if (replacementUrl) {
                sendResponse(request, response, 308, '', {
                    Location: replacementUrl
                });
                return;
            }

            const canonicalSlug = createProductSlug(product.name);
            const canonicalPath = createProductPath(product);
            const canonicalUrl = createProductUrl(product, siteUrl);

            if (!canonicalPath || !canonicalUrl || !canonicalSlug) {
                throw new TypeError('No se pudo construir la URL canónica del producto.');
            }

            if (!slug || !isCanonicalProductSlug(product, slug)) {
                sendResponse(request, response, 308, '', {
                    Location: canonicalUrl
                });
                return;
            }

            const imageUrl = resolveProductImageUrl(product.image, siteUrl);
            const relatedProducts = selectRelatedProducts(product, products, {
                siteUrl
            });
            const html = renderPage({
                product,
                canonicalUrl,
                siteUrl,
                imageUrl,
                relatedProducts,
                indexable: product.active === true
            });

            sendResponse(request, response, 200, html);
        } catch (error) {
            if (error instanceof OpenSheetProviderError) {
                sendResponse(request, response, 503, STATUS_PAGES[503], {
                    'Retry-After': '60'
                });
                return;
            }

            console.error('Error interno al resolver un producto.', {
                name: error?.name,
                message: error?.message
            });
            sendResponse(request, response, 500, STATUS_PAGES[500]);
        }
    };
}

const handler = createProductHandler();

module.exports = handler;
module.exports.createProductHandler = createProductHandler;
module.exports.selectRelatedProducts = selectRelatedProducts;
