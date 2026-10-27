'use strict';

const useRuntimeCache = process.env.VERCEL_ENV === 'production'
    || process.env.VERCEL_ENV === 'preview';


const useSupabase = process.env.PRODUCTS_PROVIDER === 'supabase';

const productProvider = useSupabase
    ? require('./supabase-product-provider')
    : useRuntimeCache
        ? require('./cached-product-provider')
        : require('./opensheet-provider');


const { normalizeProduct } = require('./product-normalizer');

const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;

function createProductRepository(provider = productProvider) {
    if (!provider || typeof provider.fetchRows !== 'function') {
        throw new TypeError('El proveedor debe implementar fetchRows().');
    }

    async function getAllProducts() {
        const rows = await provider.fetchRows();

        return rows
            .map(normalizeProduct)
            .filter(product => product !== null);
    }

    async function getProductById(id) {
        if (typeof id !== 'string' || !PRODUCT_ID_PATTERN.test(id)) {
            return null;
        }

        const products = await getAllProducts();
        return products.find(product => product.id === id) || null;
    }

    return Object.freeze({
        getAllProducts,
        getProductById
    });
}

const defaultRepository = createProductRepository();

module.exports = {
    createProductRepository,
    getAllProducts: defaultRepository.getAllProducts,
    getProductById: defaultRepository.getProductById
};
