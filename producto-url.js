(function attachProductUrlHelper(root, factory) {
    'use strict';

    const api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }

    if (root && typeof root === 'object') {
        root.NantyProductUrl = api;
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createProductUrlApi() {
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

    return Object.freeze({
        createProductPath,
        createProductSlug
    });
});
