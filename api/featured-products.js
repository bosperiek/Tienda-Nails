'use strict';

const productRepository = require('./_lib/product-repository');
const { resolveProductImageUrl } = require('./_lib/product-image-url');

const SITE_URL = process.env.SITE_URL || 'https://tienda-nails.vercel.app';
const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;
const MAX_FEATURED_PRODUCTS = 6;
const ALLOWED_METHODS = 'GET, HEAD';
const FEATURED_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=300, must-revalidate';
const NO_STORE_CACHE_CONTROL = 'no-store';
const FALLBACK_IMAGE_URL = 'https://placehold.co/600x600/f8f0ed/a13f62?text=Sin+Imagen';

function getEffectivePrice(product) {
    const salePrice = Number.isFinite(product?.salePrice) && product.salePrice >= 0
        ? product.salePrice
        : null;
    const price = Number.isFinite(product?.price) && product.price >= 0
        ? product.price
        : null;

    return salePrice ?? price;
}

function isFeaturedProductAvailable(product) {
    return Boolean(
        product
        && typeof product.id === 'string'
        && PRODUCT_ID_PATTERN.test(product.id)
        && product.active === true
        && getEffectivePrice(product) !== null
    );
}

function selectFeaturedProducts(products, {
    limit = MAX_FEATURED_PRODUCTS
} = {}) {
    if (!Array.isArray(products)) return [];

    const safeLimit = Number.isInteger(limit) && limit > 0
        ? Math.min(limit, MAX_FEATURED_PRODUCTS)
        : MAX_FEATURED_PRODUCTS;

    const eligibleFeatured = [];
    const featuredIds = new Set();

    for (const product of products) {
        if (product?.featured !== true
            || featuredIds.has(product.id)
            || !isFeaturedProductAvailable(product)) {
            continue;
        }

        featuredIds.add(product.id);
        eligibleFeatured.push(product);

        if (eligibleFeatured.length >= safeLimit) break;
    }

    return eligibleFeatured;
}

function toFeaturedProductResponse(product, { siteUrl = SITE_URL } = {}) {
    const effectivePrice = getEffectivePrice(product);

    if (!isFeaturedProductAvailable(product) || effectivePrice === null) {
        return null;
    }

    const name = typeof product.name === 'string' ? product.name.trim() : '';
    if (!name) return null;

    return {
        id: product.id,
        name,
        category: typeof product.category === 'string' ? product.category : '',
        price: Number.isFinite(product.price) ? product.price : null,
        salePrice: Number.isFinite(product.salePrice) ? product.salePrice : null,
        effectivePrice,
        image: resolveProductImageUrl(product.image, siteUrl) || FALLBACK_IMAGE_URL,
        altText: typeof product.altText === 'string' && product.altText.trim()
            ? product.altText.trim()
            : name,
        featured: product.featured === true,
        active: product.active,
        stock: Number.isFinite(product.stock) ? product.stock : null
    };
}

function sendJson(request, response, statusCode, payload, headers = {}) {
    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader(
        'Cache-Control',
        statusCode === 200 ? FEATURED_CACHE_CONTROL : NO_STORE_CACHE_CONTROL
    );

    Object.entries(headers).forEach(([name, value]) => {
        response.setHeader(name, value);
    });

    response.end(request.method === 'HEAD' ? undefined : JSON.stringify(payload));
}

function createFeaturedProductsHandler({
    repository = productRepository,
    siteUrl = SITE_URL
} = {}) {
    if (!repository || typeof repository.getAllProducts !== 'function') {
        throw new TypeError('repository debe implementar getAllProducts().');
    }

    return async function featuredProductsHandler(request, response) {
        const method = request.method || '';

        if (method !== 'GET' && method !== 'HEAD') {
            sendJson(request, response, 405, { error: 'METHOD_NOT_ALLOWED' }, {
                Allow: ALLOWED_METHODS
            });
            return;
        }

        try {
            const products = await repository.getAllProducts();

            if (!Array.isArray(products)) {
                throw new TypeError('El repositorio devolvió un catálogo inválido.');
            }

            const featuredProducts = selectFeaturedProducts(products)
                .map(product => toFeaturedProductResponse(product, { siteUrl }))
                .filter(product => product !== null);

            sendJson(request, response, 200, featuredProducts);
        } catch (error) {
            console.error('Error interno al obtener productos destacados.', {
                name: error?.name,
                message: error?.message
            });

            sendJson(request, response, 500, {
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    };
}

const handler = createFeaturedProductsHandler();

module.exports = handler;
module.exports.createFeaturedProductsHandler = createFeaturedProductsHandler;
module.exports.getEffectivePrice = getEffectivePrice;
module.exports.isFeaturedProductAvailable = isFeaturedProductAvailable;
module.exports.selectFeaturedProducts = selectFeaturedProducts;
module.exports.toFeaturedProductResponse = toFeaturedProductResponse;
module.exports.MAX_FEATURED_PRODUCTS = MAX_FEATURED_PRODUCTS;
