// URL de tu Google Sheet publicado vía opensheet
const SHEET_ID = "1pwoKKCUUlxmqUQGEMCEemXHngq-4wWUMPfMReI2vQdA";
const SHEET_NOMBRE = "productos"; // nombre exacto de la pestaña/hoja
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NOMBRE}`;
const CATALOGO_CACHE_KEY = 'tiendaCatalogoCache_v1';

// Esta variable queda disponible igual que antes,
// pero ahora se llena de forma asíncrona desde el Sheet.
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

function guardarCatalogoCache(products) {
    if (!Array.isArray(products) || products.length === 0) return;

    const cache = {
        version: 1,
        savedAt: Date.now(),
        products
    };

    try {
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
            || cache.version !== 1
            || !Array.isArray(cache.products)
            || cache.products.length === 0
        ) {
            return null;
        }

        return cache;
    } catch (err) {
        console.warn('No se pudo leer el respaldo local del catálogo:', err);
        return null;
    }
}

function normalizarPrecioSheet(valor) {
    if (typeof valor === 'number') {
        return Number.isFinite(valor) && valor >= 0 ? valor : null;
    }

    if (typeof valor !== 'string') return null;

    const texto = valor.trim();
    if (!texto) return null;

    const formatoValido = /^\$?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
    if (!formatoValido.test(texto)) return null;

    const numero = Number(texto.replace(/^\$/, '').replace(/,/g, ''));
    return Number.isFinite(numero) && numero >= 0 ? numero : null;
}

function normalizarNumeroOpcionalSheet(valor) {
    if (valor === null || valor === undefined || valor === '') return null;
    if (typeof valor === 'number') {
        return Number.isFinite(valor) && valor >= 0 ? valor : null;
    }
    if (typeof valor !== 'string') return null;

    const texto = valor.trim();
    if (!/^(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(texto)) return null;

    const numero = Number(texto.replace(/,/g, ''));
    return Number.isFinite(numero) && numero >= 0 ? numero : null;
}

function normalizarBooleanoOpcionalSheet(valor) {
    if (typeof valor === 'boolean') return valor;
    if (valor === 1) return true;
    if (valor === 0) return false;
    if (typeof valor !== 'string') return null;

    const texto = valor
        .trim()
        .toLowerCase()
        .normalize('NFD')
        .replace(/\p{Diacritic}/gu, '');

    if (['true', '1', 'si', 'yes', 'activo'].includes(texto)) return true;
    if (['false', '0', 'no', 'inactivo'].includes(texto)) return false;
    return null;
}

function normalizarProductoSheet(fila) {
    const producto = {
        id: (fila.id || '').trim(),
        category: (fila.category || '').trim(),
        data: (fila.data || '').trim(),
        data2: normalizarPrecioSheet(fila.data2),
        altTexto: (fila.altTexto || '').trim(),
        image: (fila.image || '').trim()
    };

    const salePriceField = Object.prototype.hasOwnProperty.call(fila, 'salePrice')
        ? 'salePrice'
        : Object.prototype.hasOwnProperty.call(fila, 'precioOferta')
            ? 'precioOferta'
            : null;
    const activeField = Object.prototype.hasOwnProperty.call(fila, 'active')
        ? 'active'
        : Object.prototype.hasOwnProperty.call(fila, 'activo')
            ? 'activo'
            : null;

    if (salePriceField) {
        producto.salePrice = normalizarPrecioSheet(fila[salePriceField]);
    }
    if (Object.prototype.hasOwnProperty.call(fila, 'stock')) {
        producto.stock = normalizarNumeroOpcionalSheet(fila.stock);
    }
    if (activeField) {
        producto.active = normalizarBooleanoOpcionalSheet(fila[activeField]);
    }

    return producto;
}

async function cargarProductosDesdeSheet() {
    try {
        const res = await fetch(SHEET_URL);

        if (!res.ok) {
            throw new Error("Error al obtener el sheet: " + res.status);
        }

        const filas = await res.json();

        // Normaliza los datos (por si vienen espacios o vacíos)
        const nuevosProductos = filas
            .filter(p => p.data && p.data.trim() !== "")
            .map(normalizarProductoSheet);

        if (nuevosProductos.length === 0) {
            actualizarEstadoProductos('empty', {
                hasProducts: misProductos.length > 0
            });
            console.warn('Google Sheets devolvió un catálogo vacío. Se conserva el catálogo actual.');
            return misProductos;
        }

        guardarCatalogoCache(nuevosProductos);
        actualizarEstadoProductos('online', {
            savedAt: Date.now(),
            hasProducts: true
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
            "No se pudieron cargar los productos desde Google Sheets:",
            err
        );

        return [];
    }
}

const catalogoCache = leerCatalogoCache();
if (misProductos.length === 0 && catalogoCache) {
    misProductos = catalogoCache.products;
    actualizarEstadoProductos('cache', {
        savedAt: catalogoCache.savedAt,
        hasProducts: true
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

async function actualizarProductosPeriodicamente() {
    await cargarProductosDesdeSheet();
    setTimeout(actualizarProductosPeriodicamente, PRODUCTOS_REFRESH_MS);
}

actualizarProductosPeriodicamente();
