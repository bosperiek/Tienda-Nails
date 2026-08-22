'use strict';

const productRepository = require('./_lib/product-repository');
const { OpenSheetProviderError } = require('./_lib/opensheet-provider');
const {
    createProductPath,
    createProductSlug,
    createProductUrl,
    isCanonicalProductSlug
} = require('./_lib/product-url');
const { renderProductPage } = require('./_lib/product-template');

const SITE_URL = process.env.SITE_URL || 'https://tienda-nails.vercel.app';
const ALLOWED_METHODS = 'GET, HEAD';
const HTML_HEADERS = Object.freeze({
    'Content-Type': 'text/html; charset=utf-8',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
});
const PRODUCT_CACHE_CONTROL = 'public, max-age=0, must-revalidate';
const PRODUCT_CDN_CACHE_CONTROL = 'public, s-maxage=300, stale-while-revalidate=300';
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
    if (statusCode === 200) {
        response.setHeader('Cache-Control', PRODUCT_CACHE_CONTROL);
        response.setHeader('Vercel-CDN-Cache-Control', PRODUCT_CDN_CACHE_CONTROL);
        return;
    }

    response.setHeader('Cache-Control', NO_STORE_CACHE_CONTROL);
    response.removeHeader?.('Vercel-CDN-Cache-Control');
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

function resolveProductImageUrl(image, siteUrl) {
    if (typeof image !== 'string' || image.trim() === '') return null;

    try {
        const imageUrl = new URL(image.trim(), siteUrl);
        return imageUrl.protocol === 'http:' || imageUrl.protocol === 'https:'
            ? imageUrl.href
            : null;
    } catch (error) {
        return null;
    }
}

function createProductHandler({
    repository = productRepository,
    siteUrl = SITE_URL,
    renderPage = renderProductPage
} = {}) {
    if (!repository || typeof repository.getProductById !== 'function') {
        throw new TypeError('repository debe implementar getProductById().');
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

        if (hasInvalidQueryValue(id) || hasInvalidQueryValue(slug)) {
            sendResponse(request, response, 404, STATUS_PAGES[404]);
            return;
        }

        try {
            const product = await repository.getProductById(id);

            if (!product) {
                sendResponse(request, response, 404, STATUS_PAGES[404]);
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
            const html = renderPage({
                product,
                canonicalUrl,
                siteUrl,
                imageUrl
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
