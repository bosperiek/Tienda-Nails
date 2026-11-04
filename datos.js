'use strict';

// La única fuente del catálogo es Supabase. No se guarda una copia del inventario
// en localStorage ni se muestra un catálogo antiguo si la conexión falla.
let misProductos = [];
let productosEstadoActual = { status: 'loading', savedAt: null, hasProducts: false };
const listenersProductos = [];
let cargaProductosEnCurso = null;

function actualizarEstadoProductos(status, { hasProducts = misProductos.length > 0 } = {}) {
  productosEstadoActual = { status, savedAt: null, hasProducts };
  document.dispatchEvent(new CustomEvent('productosEstado', { detail: productosEstadoActual }));
}

function alCargarProductos(callback) {
  if (productosEstadoActual.status === 'online') callback(misProductos);
  else listenersProductos.push(callback);
}

function mapSupabaseProduct(row) {
  return {
    id: row.id,
    name: row.name,
    category: row.category || '',
    price: row.price === null ? null : Number(row.price),
    altText: row.alt_text || row.name || '',
    image: row.image || '',
    brand: row.brand ?? null,
    subcategory: row.subcategory ?? null,
    salePrice: row.sale_price === null ? null : Number(row.sale_price),
    description: row.description ?? null,
    stock: row.stock === null ? null : Number(row.stock),
    additionalImages: Array.isArray(row.additional_images) ? row.additional_images : [],
    featured: typeof row.featured === 'boolean' ? row.featured : null,
    active: row.active === true,
    updatedAt: row.updated_at || null,
    replacementId: row.replacement_id ?? null
  };
}

async function consultarCatalogoSupabase() {
  const client = await window.NantySupabase.getClient();
  const rows = [];
  const pageSize = 1000;
  for (let from = 0; ; from += pageSize) {
    const { data, error } = await client.from('products')
      .select('id,name,category,price,alt_text,image,brand,subcategory,sale_price,description,stock,additional_images,featured,active,updated_at,replacement_id')
      .eq('active', true)
      .order('id', { ascending: true })
      .range(from, from + pageSize - 1);
    if (error) throw error;
    rows.push(...(data || []));
    if (!data || data.length < pageSize) break;
  }
  return rows.map(mapSupabaseProduct);
}

async function cargarProductosDesdeSupabase() {
  if (cargaProductosEnCurso) return cargaProductosEnCurso;
  actualizarEstadoProductos('loading');
  cargaProductosEnCurso = (async () => {
    try {
      const nuevos = await consultarCatalogoSupabase();
      const changed = JSON.stringify(nuevos) !== JSON.stringify(misProductos);
      misProductos = nuevos;
      actualizarEstadoProductos('online', { hasProducts: nuevos.length > 0 });
      if (changed) {
        listenersProductos.splice(0).forEach(callback => callback(misProductos));
        document.dispatchEvent(new CustomEvent('productosActualizados', { detail: misProductos }));
      }
      return misProductos;
    } catch (error) {
      const hadProducts = misProductos.length > 0;
      misProductos = [];
      actualizarEstadoProductos('error', { hasProducts: false });
      if (hadProducts) {
        document.dispatchEvent(new CustomEvent('productosActualizados', { detail: [] }));
      }
      console.error('No se pudo consultar el catálogo directamente en Supabase:', error);
      return [];
    } finally {
      cargaProductosEnCurso = null;
    }
  })();
  return cargaProductosEnCurso;
}

const PRODUCTOS_REFRESH_MS = 10000;
let productosRefreshTimer = null;
async function actualizarProductosPeriodicamente() {
  if (document.hidden) return;
  await cargarProductosDesdeSupabase();
  programarProductosRefresh();
}
function programarProductosRefresh() {
  if (productosRefreshTimer !== null) clearTimeout(productosRefreshTimer);
  if (!document.hidden) productosRefreshTimer = setTimeout(actualizarProductosPeriodicamente, PRODUCTOS_REFRESH_MS);
}
document.addEventListener('visibilitychange', () => {
  if (document.hidden) {
    if (productosRefreshTimer !== null) clearTimeout(productosRefreshTimer);
    productosRefreshTimer = null;
  } else {
    cargarProductosDesdeSupabase().finally(programarProductosRefresh);
  }
});
cargarProductosDesdeSupabase().finally(programarProductosRefresh);
