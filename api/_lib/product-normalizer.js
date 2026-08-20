'use strict';

const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;
const PRICE_PATTERN = /^\$?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;

const FIELD_ALIASES = Object.freeze({
    name: ['name', 'data', 'nombre'],
    category: ['category', 'categoria', 'categoría'],
    price: ['price', 'data2', 'precio'],
    altText: ['altText', 'altTexto', 'textoAlternativo'],
    image: ['image', 'imagen'],
    brand: ['brand', 'marca'],
    subcategory: ['subcategory', 'subcategoria', 'subcategoría'],
    salePrice: ['salePrice', 'precioOferta'],
    description: ['description', 'descripcion', 'descripción'],
    stock: ['stock'],
    additionalImages: ['additionalImages', 'imagenesAdicionales', 'imágenesAdicionales'],
    featured: ['featured', 'destacado'],
    active: ['active', 'activo'],
    updatedAt: ['updatedAt'],
    replacementId: ['replacementId']
});

function getAliasedField(row, aliases) {
    for (const alias of aliases) {
        if (Object.prototype.hasOwnProperty.call(row, alias)) {
            return { found: true, value: row[alias] };
        }
    }

    return { found: false, value: undefined };
}

function normalizeText(value) {
    return value === null || value === undefined
        ? ''
        : String(value).trim();
}

function normalizeOptionalText(value) {
    const normalized = normalizeText(value);
    return normalized === '' ? null : normalized;
}

function normalizePrice(value) {
    if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0 ? value : null;
    }

    if (typeof value !== 'string') return null;

    const normalized = value.trim();
    if (normalized === '' || !PRICE_PATTERN.test(normalized)) return null;

    const price = Number(normalized.replace(/^\$/, '').replace(/,/g, ''));
    return Number.isFinite(price) && price >= 0 ? price : null;
}

function normalizeOptionalNumber(value) {
    if (value === null || value === undefined || value === '') return null;

    if (typeof value === 'number') {
        return Number.isFinite(value) && value >= 0 ? value : null;
    }

    if (typeof value !== 'string') return null;

    const normalized = value.trim();
    if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(normalized)) {
        return null;
    }

    const number = Number(normalized.replace(/,/g, ''));
    return Number.isFinite(number) && number >= 0 ? number : null;
}

function normalizeOptionalBoolean(value) {
    if (typeof value === 'boolean') return value;
    if (value === 1) return true;
    if (value === 0) return false;
    if (typeof value !== 'string') return null;

    const normalized = value
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    if (['true', '1', 'si', 'yes', 'activo'].includes(normalized)) return true;
    if (['false', '0', 'no', 'inactivo'].includes(normalized)) return false;

    return null;
}

function normalizeAdditionalImages(value) {
    if (Array.isArray(value)) {
        return value
            .map(normalizeText)
            .filter(Boolean);
    }

    if (typeof value !== 'string') return [];

    const normalized = value.trim();
    if (normalized === '') return [];

    if (normalized.startsWith('[') && normalized.endsWith(']')) {
        try {
            const parsed = JSON.parse(normalized);
            return Array.isArray(parsed) ? normalizeAdditionalImages(parsed) : [];
        } catch (error) {
            return [];
        }
    }

    return [normalized];
}

function normalizeProduct(row) {
    if (!row || typeof row !== 'object' || Array.isArray(row)) return null;

    const id = normalizeText(row.id);
    const name = normalizeText(getAliasedField(row, FIELD_ALIASES.name).value);

    if (!PRODUCT_ID_PATTERN.test(id) || name === '') return null;

    const activeField = getAliasedField(row, FIELD_ALIASES.active);
    const replacementId = normalizeOptionalText(
        getAliasedField(row, FIELD_ALIASES.replacementId).value
    );

    return {
        id,
        name,
        category: normalizeText(getAliasedField(row, FIELD_ALIASES.category).value),
        price: normalizePrice(getAliasedField(row, FIELD_ALIASES.price).value),
        altText: normalizeText(getAliasedField(row, FIELD_ALIASES.altText).value),
        image: normalizeText(getAliasedField(row, FIELD_ALIASES.image).value),
        brand: normalizeOptionalText(getAliasedField(row, FIELD_ALIASES.brand).value),
        subcategory: normalizeOptionalText(
            getAliasedField(row, FIELD_ALIASES.subcategory).value
        ),
        salePrice: normalizePrice(getAliasedField(row, FIELD_ALIASES.salePrice).value),
        description: normalizeOptionalText(
            getAliasedField(row, FIELD_ALIASES.description).value
        ),
        stock: normalizeOptionalNumber(getAliasedField(row, FIELD_ALIASES.stock).value),
        additionalImages: normalizeAdditionalImages(
            getAliasedField(row, FIELD_ALIASES.additionalImages).value
        ),
        featured: normalizeOptionalBoolean(
            getAliasedField(row, FIELD_ALIASES.featured).value
        ),
        active: activeField.found
            ? normalizeOptionalBoolean(activeField.value)
            : true,
        updatedAt: normalizeOptionalText(
            getAliasedField(row, FIELD_ALIASES.updatedAt).value
        ),
        replacementId: replacementId && PRODUCT_ID_PATTERN.test(replacementId)
            ? replacementId
            : null
    };
}

module.exports = {
    normalizePrice,
    normalizeProduct
};
