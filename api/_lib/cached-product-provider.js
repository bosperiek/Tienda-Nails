'use strict';

const { getCache } = require('@vercel/functions');
const openSheetProvider = require('./opensheet-provider');
const { normalizeProduct } = require('./product-normalizer');

const FRESH_CACHE_KEY = 'catalog:rows:v1:fresh';
const LAST_GOOD_CACHE_KEY = 'catalog:rows:v1:last-good';
const FRESH_TTL_SECONDS = 300;
const LAST_GOOD_TTL_SECONDS = 86_400;

function isValidRows(rows) {
    if (!Array.isArray(rows) || rows.length === 0) return false;

    const normalizedProducts = rows.map(normalizeProduct);
    if (normalizedProducts.some(product => product === null)) return false;

    const ids = normalizedProducts.map(product => product.id);
    return new Set(ids).size === ids.length;
}

function preservesHistoricalIds(rows, lastGoodRows) {
    if (!isValidRows(rows)) return false;
    if (!isValidRows(lastGoodRows)) return true;

    const currentIds = new Set(rows.map(row => normalizeProduct(row).id));
    return lastGoodRows.every(row => currentIds.has(normalizeProduct(row).id));
}

function validateCacheKey(key, name) {
    if (typeof key !== 'string' || key.trim() === '') {
        throw new TypeError(`${name} debe ser una clave de cache válida.`);
    }
}

function validateTtl(ttl, name) {
    if (!Number.isInteger(ttl) || ttl <= 0) {
        throw new TypeError(`${name} debe ser un entero positivo.`);
    }
}

function createCachedProductProvider({
    provider = openSheetProvider,
    cache = getCache(),
    freshKey = FRESH_CACHE_KEY,
    lastGoodKey = LAST_GOOD_CACHE_KEY,
    freshTtl = FRESH_TTL_SECONDS,
    lastGoodTtl = LAST_GOOD_TTL_SECONDS
} = {}) {
    if (!provider || typeof provider.fetchRows !== 'function') {
        throw new TypeError('El proveedor de origen debe implementar fetchRows().');
    }

    if (!cache || typeof cache.get !== 'function' || typeof cache.set !== 'function') {
        throw new TypeError('La cache debe implementar get() y set().');
    }

    validateCacheKey(freshKey, 'freshKey');
    validateCacheKey(lastGoodKey, 'lastGoodKey');
    validateTtl(freshTtl, 'freshTtl');
    validateTtl(lastGoodTtl, 'lastGoodTtl');

    async function readValidRows(key) {
        try {
            const rows = await cache.get(key);
            return isValidRows(rows) ? rows : null;
        } catch (error) {
            return null;
        }
    }

    async function writeRows(key, rows, ttl) {
        try {
            await cache.set(key, rows, { ttl });
        } catch (error) {
            // Runtime Cache is an optimization; origin data remains usable.
        }
    }

    async function fetchRows() {
        const freshRows = await readValidRows(freshKey);

        if (freshRows) return freshRows;

        const lastGoodRows = await readValidRows(lastGoodKey);
        let originError;

        try {
            const rows = await provider.fetchRows();

            if (!preservesHistoricalIds(rows, lastGoodRows)) {
                throw new TypeError('El proveedor de origen devolvió un catálogo inválido.');
            }

            await Promise.all([
                writeRows(freshKey, rows, freshTtl),
                writeRows(lastGoodKey, rows, lastGoodTtl)
            ]);

            return rows;
        } catch (error) {
            originError = error;
        }

        if (lastGoodRows) {
            console.warn('Using last-good product catalog fallback');
            return lastGoodRows;
        }

        throw originError;
    }

    return Object.freeze({ fetchRows });
}

const defaultProvider = createCachedProductProvider();

module.exports = {
    createCachedProductProvider,
    fetchRows: defaultProvider.fetchRows,
    FRESH_CACHE_KEY,
    LAST_GOOD_CACHE_KEY,
    FRESH_TTL_SECONDS,
    LAST_GOOD_TTL_SECONDS
};
