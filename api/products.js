'use strict';

const productRepository = require('./_lib/product-repository');


const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;
const ALLOWED_METHODS = 'GET, HEAD';
const SUCCESS_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=300, stale-if-error=86400';
const NO_STORE_CACHE_CONTROL = 'no-store';

function isNullableString(value) {
    return value === null || typeof value === 'string';
}

function isNullableNonNegativeNumber(value) {
    return value === null
        || (typeof value === 'number' && Number.isFinite(value) && value >= 0);
}

function isCanonicalPublicProduct(product) {
    return Boolean(
        product
        && typeof product === 'object'
        && !Array.isArray(product)
        && typeof product.id === 'string'
        && PRODUCT_ID_PATTERN.test(product.id)
        && typeof product.name === 'string'
        && product.name.trim() !== ''
        && typeof product.category === 'string'
        && isNullableNonNegativeNumber(product.price)
        && typeof product.altText === 'string'
        && typeof product.image === 'string'
        && isNullableString(product.brand)
        && isNullableString(product.subcategory)
        && isNullableNonNegativeNumber(product.salePrice)
        && isNullableString(product.description)
        && isNullableNonNegativeNumber(product.stock)
        && Array.isArray(product.additionalImages)
        && product.additionalImages.every(image => typeof image === 'string')
        && (product.featured === null || typeof product.featured === 'boolean')
        && product.active === true
        && isNullableString(product.updatedAt)
        && (
            product.replacementId === null
            || (
                typeof product.replacementId === 'string'
                && PRODUCT_ID_PATTERN.test(product.replacementId)
            )
        )
    );
}

function toPublicProductResponse(product) {
    if (product?.active !== true) return null;

    const publicProduct = {
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        altText: product.altText,
        image: product.image,
        brand: product.brand,
        subcategory: product.subcategory,
        salePrice: product.salePrice,
        description: product.description,
        stock: product.stock,
        additionalImages: product.additionalImages,
        featured: product.featured,
        active: product.active,
        updatedAt: product.updatedAt,
        replacementId: product.replacementId
    };

    if (!isCanonicalPublicProduct(publicProduct)) {
        throw new TypeError('El repositorio devolvió un producto público inválido.');
    }

    return publicProduct;
}

function sendJson(request, response, statusCode, payload, headers = {}) {
    const body = JSON.stringify(payload);

    response.statusCode = statusCode;
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Length', Buffer.byteLength(body));
    response.setHeader(
        'Cache-Control',
        statusCode === 200 ? SUCCESS_CACHE_CONTROL : NO_STORE_CACHE_CONTROL
    );
    Object.entries(headers).forEach(([name, value]) => response.setHeader(name, value));
    response.end(request.method === 'HEAD' ? undefined : body);
}


function createProductsHandler({ repository = productRepository } = {}) {
    if (!repository || typeof repository.getAllProducts !== 'function') {
        throw new TypeError('repository debe implementar getAllProducts().');
    }

    return async function productsHandler(request, response) {
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

            const publicProducts = products
                .filter(product => product?.active === true)
                .map(toPublicProductResponse);

            sendJson(request, response, 200, publicProducts);
        } catch (error) {
            console.error('Error interno al obtener el catálogo público.', {
                name: error?.name,
                message: error?.message
            });

            sendJson(request, response, 500, {
                error: 'INTERNAL_SERVER_ERROR'
            });
        }
    };
}

const handler = createProductsHandler();

module.exports = handler;
module.exports.createProductsHandler = createProductsHandler;
module.exports.isCanonicalPublicProduct = isCanonicalPublicProduct;
module.exports.toPublicProductResponse = toPublicProductResponse;
