

'use strict';

const SUPABASE_URL = process.env.SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.SUPABASE_ANON_KEY;

async function fetchRows() {
    if (!SUPABASE_URL || !SUPABASE_ANON_KEY) {
        throw new Error(
            'Faltan las variables de entorno de Supabase.'
        );
    }

    const baseUrl = SUPABASE_URL.replace(/\/+$/, '');
    const url = new URL(`${baseUrl}/rest/v1/products`);

    url.searchParams.set('select', '*');
    url.searchParams.set('order', 'id.asc');

    const response = await fetch(url.toString(), {
        method: 'GET',
        headers: {
            apikey: SUPABASE_ANON_KEY,
            Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
            Accept: 'application/json'
        }
    });

    if (!response.ok) {
        const details = await response.text();

        throw new Error(
            `Error al consultar Supabase (${response.status}): ${details}`
        );
    }

    const products = await response.json();

    if (!Array.isArray(products)) {
        throw new Error(
            'Supabase devolvió una respuesta de productos inválida.'
        );
    }

    return products.map(product => ({
        id: product.id,
        name: product.name,
        category: product.category,
        price: product.price,
        altText: product.alt_text || product.name,
        image: product.image,
        brand: product.brand,
        subcategory: product.subcategory,
        salePrice: product.sale_price,
        description: product.description,
        stock: product.stock,
        additionalImages: product.additional_images,
        featured: product.featured,
        active: product.active,
        updatedAt: product.updated_at,
        replacementId: product.replacement_id
    }));
}

module.exports = {
    fetchRows
};
