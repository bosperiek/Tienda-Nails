const PRODUCTS_API_URL = '/api/products';
const PRODUCTS_API_TIMEOUT_MS = 10_000;
const CATALOGO_CACHE_KEY = 'tiendaCatalogoCache_v2';
const CATALOGO_CACHE_VERSION = 2;
const PRODUCT_ID_PATTERN = /^prod_[0-9]+$/;

// Esta variable queda disponible igual que antes,
// pero ahora se llena de forma asíncrona desde la API propia.
let misProductos = [];
let productosEstadoActual = {
    status: 'loading',
    savedAt: null,
    hasProducts: false
};

// Callbacks que se ejecutan cuando los productos ya están listos
// (útil si tu código necesita saber cuándo llegaron los datos)
const listenersProductos = [];

function actualizarEstadoProductos(status, {
    savedAt = null,
    hasProducts = misProductos.length > 0
} = {}) {
    productosEstadoActual = {
        status,
        savedAt,
        hasProducts
    };

    document.dispatchEvent(
        new CustomEvent('productosEstado', {
            detail: productosEstadoActual
        })
    );
}

function alCargarProductos(callback) {
    if (misProductos.length > 0) {
        callback(misProductos);
    } else {
        listenersProductos.push(callback);
    }
}

function esTextoOpcionalCanonico(value) {
    return value === null || typeof value === 'string';
}

function esNumeroOpcionalCanonico(value) {
    return value === null
        || (typeof value === 'number' && Number.isFinite(value) && value >= 0);
}

function esProductoCanonicoValido(producto) {
    return Boolean(
        producto
        && typeof producto === 'object'
        && !Array.isArray(producto)
        && typeof producto.id === 'string'
        && PRODUCT_ID_PATTERN.test(producto.id)
        && typeof producto.name === 'string'
        && producto.name.trim() !== ''
        && typeof producto.category === 'string'
        && esNumeroOpcionalCanonico(producto.price)
        && typeof producto.altText === 'string'
        && typeof producto.image === 'string'
        && esTextoOpcionalCanonico(producto.brand)
        && esTextoOpcionalCanonico(producto.subcategory)
        && esNumeroOpcionalCanonico(producto.salePrice)
        && esTextoOpcionalCanonico(producto.description)
        && esNumeroOpcionalCanonico(producto.stock)
        && Array.isArray(producto.additionalImages)
        && producto.additionalImages.every(image => typeof image === 'string')
        && (producto.featured === null || typeof producto.featured === 'boolean')
        && producto.active === true
        && esTextoOpcionalCanonico(producto.updatedAt)
        && (
            producto.replacementId === null
            || (
                typeof producto.replacementId === 'string'
                && PRODUCT_ID_PATTERN.test(producto.replacementId)
            )
        )
    );
}

function esCatalogoCanonicoValido(products) {
    return Array.isArray(products) && products.every(esProductoCanonicoValido);
}

function guardarCatalogoCache(products) {
    if (!esCatalogoCanonicoValido(products)) return;

    const serializedProducts = JSON.stringify(products);
    const cache = {
        version: CATALOGO_CACHE_VERSION,
        savedAt: Date.now(),
        products
    };

    try {
        const storedCache = leerCatalogoCache();
        if (
            storedCache
            && JSON.stringify(storedCache.products) === serializedProducts
        ) {
            return;
        }

        localStorage.setItem(CATALOGO_CACHE_KEY, JSON.stringify(cache));
    } catch (err) {
        console.warn('No se pudo guardar el respaldo local del catálogo:', err);
    }
}

function leerCatalogoCache() {
    try {
        const raw = localStorage.getItem(CATALOGO_CACHE_KEY);
        if (!raw) return null;

        const cache = JSON.parse(raw);
        if (
            !cache
            || cache.version !== CATALOGO_CACHE_VERSION
            || !esCatalogoCanonicoValido(cache.products)
        ) {
            return null;
        }

        return cache;
    } catch (err) {
        console.warn('No se pudo leer el respaldo local del catálogo:', err);
        return null;
    }
}

async function cargarProductosDesdeSheet() {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), PRODUCTS_API_TIMEOUT_MS);

    try {
        const res = await fetch(PRODUCTS_API_URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
            signal: controller.signal
        });

        if (!res.ok) {
            throw new Error('Error al obtener el catálogo: ' + res.status);
        }

        const nuevosProductos = await res.json();
        if (!esCatalogoCanonicoValido(nuevosProductos)) {
            throw new TypeError('La API devolvió un catálogo con formato inesperado.');
        }

        guardarCatalogoCache(nuevosProductos);
        actualizarEstadoProductos('online', {
            savedAt: Date.now(),
            hasProducts: nuevosProductos.length > 0
        });

        if (JSON.stringify(nuevosProductos) === JSON.stringify(misProductos)) {
            return misProductos;
        }

        misProductos = nuevosProductos;

        // Avisa a quien esté esperando los datos
        listenersProductos.forEach(cb => cb(misProductos));
        listenersProductos.length = 0;

        // Dispara un evento global por si otras partes del código lo escuchan
        document.dispatchEvent(
            new CustomEvent("productosActualizados", {
                detail: misProductos
            })
        );

        return misProductos;

    } catch (err) {
        actualizarEstadoProductos('error', {
            hasProducts: misProductos.length > 0
        });
        console.error(
            'No se pudieron cargar los productos desde la API del catálogo:',
            err
        );

        return [];
    } finally {
        clearTimeout(timeoutId);
    }
}

const catalogoCache = leerCatalogoCache();
if (misProductos.length === 0 && catalogoCache) {
    misProductos = catalogoCache.products;
    actualizarEstadoProductos('cache', {
        savedAt: catalogoCache.savedAt,
        hasProducts: misProductos.length > 0
    });
    listenersProductos.forEach(cb => cb(misProductos));
    listenersProductos.length = 0;
    document.dispatchEvent(
        new CustomEvent("productosActualizados", {
            detail: misProductos
        })
    );
}

const PRODUCTOS_REFRESH_MS = 5 * 60 * 1000;
let productosRefreshTimer = null;
let ultimaActualizacionPeriodica = 0;
let actualizacionPeriodicaEnCurso = false;

function cancelarProductosRefreshTimer() {
    if (productosRefreshTimer === null) return;
    clearTimeout(productosRefreshTimer);
    productosRefreshTimer = null;
}

function programarProductosRefresh() {
    cancelarProductosRefreshTimer();
    if (document.hidden || actualizacionPeriodicaEnCurso) return;

    const elapsed = Date.now() - ultimaActualizacionPeriodica;
    const delay = ultimaActualizacionPeriodica === 0
        ? 0
        : Math.max(0, PRODUCTOS_REFRESH_MS - elapsed);

    productosRefreshTimer = setTimeout(actualizarProductosPeriodicamente, delay);
}

async function actualizarProductosPeriodicamente() {
    cancelarProductosRefreshTimer();
    if (document.hidden || actualizacionPeriodicaEnCurso) return;

    actualizacionPeriodicaEnCurso = true;
    try {
        await cargarProductosDesdeSheet();
    } finally {
        ultimaActualizacionPeriodica = Date.now();
        actualizacionPeriodicaEnCurso = false;
        programarProductosRefresh();
    }
}

document.addEventListener('visibilitychange', () => {
    if (document.hidden) {
        cancelarProductosRefreshTimer();
        return;
    }

    programarProductosRefresh();
});

programarProductosRefresh();
