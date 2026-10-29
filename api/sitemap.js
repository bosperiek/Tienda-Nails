
'use strict';

const productRepository = require('./_lib/product-repository');
const { createProductUrl } = require('./_lib/product-url');

const CANONICAL_SITE_URL = 'https://tienda-nails.vercel.app';
const SITE_URL = process.env.SITE_URL === CANONICAL_SITE_URL
    ? process.env.SITE_URL
    : CANONICAL_SITE_URL;
const ALLOWED_METHODS = 'GET, HEAD';
const SUCCESS_CACHE_CONTROL = 'public, max-age=0, s-maxage=300, stale-while-revalidate=300, must-revalidate';
const NO_STORE_CACHE_CONTROL = 'no-store';
const BASE_HEADERS = Object.freeze({
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin'
});

function escapeXml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&apos;'
    })[character]);
}

function normalizeSiteUrl(value) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError('siteUrl debe ser una URL HTTPS válida.');
    }

    try {
        const parsed = new URL(value.trim());

        if (parsed.protocol !== 'https:') {
            throw new TypeError('siteUrl debe utilizar HTTPS.');
        }

        return parsed.origin;
    } catch (error) {
        if (error instanceof TypeError && error.message.startsWith('siteUrl')) {
            throw error;
        }

        throw new TypeError('siteUrl debe ser una URL HTTPS válida.');
    }
}

function normalizeLastModified(value) {
    if (typeof value !== 'string') return null;

    const normalized = value.trim();

    if (/^\d{4}-\d{2}-\d{2}$/.test(normalized)) {
        const date = new Date(`${normalized}T00:00:00.000Z`);

        return Number.isNaN(date.getTime())
            || date.toISOString().slice(0, 10) !== normalized
            ? null
            : normalized;
    }

    if (!/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|[+-]\d{2}:\d{2})$/.test(normalized)) {
        return null;
    }

    const timestamp = Date.parse(normalized);

    return Number.isNaN(timestamp)
        ? null
        : new Date(timestamp).toISOString();
}

function createSitemapEntries(products, { siteUrl = SITE_URL } = {}) {
    if (!Array.isArray(products)) {
        throw new TypeError('products debe ser un arreglo de productos normalizados.');
    }

    const safeSiteUrl = normalizeSiteUrl(siteUrl);
    const entries = [];
    const includedUrls = new Set();

    function addEntry(loc, lastmod = null) {
        if (includedUrls.has(loc)) return;

        includedUrls.add(loc);
        entries.push(lastmod ? { loc, lastmod } : { loc });
    }

    addEntry(new URL('/', safeSiteUrl).href);
    addEntry(new URL('/tienda.html', safeSiteUrl).href);

    const indexableProducts = products
        .filter(product => product?.active === true)
        .sort((firstProduct, secondProduct) => String(firstProduct.id ?? '').localeCompare(
            String(secondProduct.id ?? ''),
            'en',
            { numeric: true, sensitivity: 'base' }
        ));

    for (const product of indexableProducts) {
        const productUrl = createProductUrl(product, safeSiteUrl);

        if (!productUrl) continue;

        addEntry(productUrl, normalizeLastModified(product.updatedAt));
    }

    return entries;
}

function createSitemapXml(products, options) {
    const entries = createSitemapEntries(products, options);

    const urlElements = entries.map(({ loc, lastmod }) => {
        const lastModifiedElement = lastmod
            ? `\n    <lastmod>${escapeXml(lastmod)}</lastmod>`
            : '';

        return `  <url>\n    <loc>${escapeXml(loc)}</loc>${lastModifiedElement}\n  </url>`;
    }).join('\n');

    return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urlElements}\n</urlset>`;
}

function setHeaders(response, statusCode, headers = {}) {
    response.removeHeader?.('Vercel-CDN-Cache-Control');

    Object.entries({ ...BASE_HEADERS, ...headers }).forEach(([name, value]) => {
        response.setHeader(name, value);
    });

    response.setHeader(
        'Cache-Control',
        statusCode === 200 ? SUCCESS_CACHE_CONTROL : NO_STORE_CACHE_CONTROL
    );
}

function sendResponse(request, response, statusCode, body, headers = {}) {
    response.statusCode = statusCode;
    setHeaders(response, statusCode, headers);
    response.end(request.method === 'HEAD' ? undefined : body);
}

function createSitemapHandler({
    repository = productRepository,
    siteUrl = SITE_URL
} = {}) {
    if (!repository || typeof repository.getAllProducts !== 'function') {
        throw new TypeError('repository debe implementar getAllProducts().');
    }

    const safeSiteUrl = normalizeSiteUrl(siteUrl);

    return async function sitemapHandler(request, response) {
        const method = request.method || '';

        if (method !== 'GET' && method !== 'HEAD') {
            sendResponse(request, response, 405, 'Método no permitido.', {
                'Content-Type': 'text/plain; charset=utf-8',
                Allow: ALLOWED_METHODS
            });
            return;
        }

        try {
            const products = await repository.getAllProducts();
            const xml = createSitemapXml(products, { siteUrl: safeSiteUrl });

            sendResponse(request, response, 200, xml, {
                'Content-Type': 'application/xml; charset=utf-8'
            });
        } catch (error) {
            console.error('Error interno al generar el sitemap.', {
                name: error?.name,
                message: error?.message
            });

            sendResponse(request, response, 500, 'Error interno.', {
                'Content-Type': 'text/plain; charset=utf-8'
            });
        }
    };
}

const handler = createSitemapHandler();

module.exports = handler;
module.exports.createSitemapEntries = createSitemapEntries;
module.exports.createSitemapHandler = createSitemapHandler;
module.exports.createSitemapXml = createSitemapXml;
module.exports.escapeXml = escapeXml;
module.exports.normalizeLastModified = normalizeLastModified;
