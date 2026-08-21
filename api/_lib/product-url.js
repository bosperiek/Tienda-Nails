'use strict';

const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;
const PRODUCT_SLUG_MAX_LENGTH = 80;

function toSafeString(value) {
    return value === null || value === undefined ? '' : String(value);
}

function createProductSlug(name) {
    let slug = toSafeString(name)
        .trim()
        .normalize('NFKD')
        .replace(/\p{M}/gu, '')
        .toLowerCase()
        .replace(/&/g, ' y ')
        .replace(/\+/g, ' mas ')
        .replace(/%/g, ' por ciento ')
        .replace(/['"’‘“”`´]/g, '')
        .replace(/[^a-z0-9]+/g, '-')
        .replace(/-+/g, '-')
        .replace(/^-+|-+$/g, '');

    if (slug.length > PRODUCT_SLUG_MAX_LENGTH) {
        slug = slug
            .slice(0, PRODUCT_SLUG_MAX_LENGTH)
            .replace(/-+$/g, '');
    }

    return slug || 'producto';
}

function isValidProduct(product) {
    if (!product || typeof product !== 'object' || Array.isArray(product)) {
        return false;
    }

    if (typeof product.id !== 'string' || !PRODUCT_ID_PATTERN.test(product.id)) {
        return false;
    }

    return toSafeString(product.name).trim() !== '';
}

function createProductPath(product) {
    if (!isValidProduct(product)) return null;

    return `/producto/${product.id}/${createProductSlug(product.name)}/`;
}

function createProductUrl(product, siteUrl) {
    const productPath = createProductPath(product);
    if (!productPath || typeof siteUrl !== 'string' || siteUrl.trim() === '') {
        return null;
    }

    try {
        const parsedSiteUrl = new URL(siteUrl.trim());
        if (parsedSiteUrl.protocol !== 'http:' && parsedSiteUrl.protocol !== 'https:') {
            return null;
        }

        return new URL(productPath, parsedSiteUrl.origin).href;
    } catch (error) {
        return null;
    }
}

function isCanonicalProductSlug(product, requestedSlug) {
    if (!isValidProduct(product) || typeof requestedSlug !== 'string') {
        return false;
    }

    return requestedSlug === createProductSlug(product.name);
}

module.exports = {
    createProductPath,
    createProductSlug,
    createProductUrl,
    isCanonicalProductSlug
};
