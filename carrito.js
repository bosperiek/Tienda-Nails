(function attachNantyCart(root, factory) {
    'use strict';

    const api = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = api;
    }

    if (root && typeof root === 'object') {
        root.NantyCart = api;

        if (root.document) {
            const initialize = () => {
                let storage;

                try {
                    storage = root.localStorage;
                } catch (error) {
                    return;
                }

                try {
                    const store = api.createCartStore({ storage });
                    api.bindProductCartButtons(root.document, store);
                } catch (error) {
                    // La página debe seguir disponible aunque el storage esté bloqueado.
                }
            };

            if (root.document.readyState === 'loading') {
                root.document.addEventListener('DOMContentLoaded', initialize, { once: true });
            } else {
                initialize();
            }
        }
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createNantyCartApi() {
    'use strict';

    const CART_KEY = 'miCarritoNanty_v2';
    const CONTRACT_FIELDS = ['id', 'nombre', 'precio', 'qty', 'img'];

    function isRecord(value) {
        return Boolean(value) && typeof value === 'object' && !Array.isArray(value);
    }

    function parsePrice(value) {
        if (typeof value === 'number') {
            return Number.isFinite(value) && value >= 0 ? value : null;
        }

        if (typeof value !== 'string') return null;

        const text = value.trim();
        if (!text || !/^\$?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/.test(text)) {
            return null;
        }

        const price = Number(text.replace(/^\$/, '').replace(/,/g, ''));
        return Number.isFinite(price) && price >= 0 ? price : null;
    }

    function normalizeId(value, { requireString = false } = {}) {
        if (typeof value === 'string') {
            const id = value.trim();
            return id || null;
        }

        if (!requireString && typeof value === 'number' && Number.isSafeInteger(value)) {
            return String(value);
        }

        return null;
    }

    function getEffectivePrice(product) {
        if (!isRecord(product)) return null;

        const salePrice = parsePrice(product.salePrice);
        if (salePrice !== null) return salePrice;

        for (const candidate of [product.price, product.data2, product.precio]) {
            const price = parsePrice(candidate);
            if (price !== null) return price;
        }

        return null;
    }

    function getProductName(product) {
        for (const candidate of [product.nombre, product.data, product.name]) {
            if (typeof candidate !== 'string') continue;
            const name = candidate.trim();
            if (name) return name;
        }

        return null;
    }

    function getProductImage(product) {
        for (const candidate of [product.img, product.image]) {
            if (typeof candidate === 'string') return candidate;
        }

        return '';
    }

    function normalizeProductForCart(product) {
        if (!isRecord(product)) return null;

        const id = normalizeId(product.id);
        const nombre = getProductName(product);
        const precio = getEffectivePrice(product);
        if (!id || !nombre || precio === null) return null;

        return {
            id,
            nombre,
            precio,
            img: getProductImage(product),
            active: product.active,
            stock: product.stock
        };
    }

    function normalizeStoredItem(item) {
        if (!isRecord(item)) return null;

        const id = normalizeId(item.id, { requireString: true });
        const nombre = typeof item.nombre === 'string' ? item.nombre.trim() : '';
        const qtyIsValid = typeof item.qty === 'number'
            && Number.isSafeInteger(item.qty)
            && item.qty > 0;
        const imgIsValid = typeof item.img === 'string';
        const currentPrice = parsePrice(item.precio);
        const legacyPrice = currentPrice !== null
            ? currentPrice
            : parsePrice(item.precioRaw);

        if (!id || !nombre || legacyPrice === null || !qtyIsValid || !imgIsValid) {
            return null;
        }

        return {
            id,
            nombre,
            precio: legacyPrice,
            qty: item.qty,
            img: item.img
        };
    }

    function sameCartItem(firstItem, secondItem) {
        return CONTRACT_FIELDS.every(field => firstItem?.[field] === secondItem?.[field])
            && Object.keys(firstItem || {}).length === CONTRACT_FIELDS.length;
    }

    function sanitizeCartState(value) {
        if (!isRecord(value)) {
            return { cart: {}, changed: true, discarded: [] };
        }

        const sanitizedCart = {};
        const discarded = [];
        let changed = false;

        Object.entries(value).forEach(([storageId, item]) => {
            const normalizedItem = normalizeStoredItem(item);
            if (!normalizedItem || sanitizedCart[normalizedItem.id]) {
                discarded.push(storageId);
                changed = true;
                return;
            }

            sanitizedCart[normalizedItem.id] = normalizedItem;
            if (storageId !== normalizedItem.id || !sameCartItem(item, normalizedItem)) {
                changed = true;
            }
        });

        return { cart: sanitizedCart, changed, discarded };
    }

    function reconcileCartState(currentCart, products) {
        const sanitized = sanitizeCartState(currentCart);
        const catalog = new Map();

        if (Array.isArray(products)) {
            products.forEach(product => {
                const normalizedProduct = normalizeProductForCart(product);
                const id = normalizeId(product?.id);
                if (!id || catalog.has(id)) return;

                catalog.set(id, {
                    normalizedProduct,
                    active: product.active,
                    stock: product.stock
                });
            });
        }

        const reconciledCart = {};
        const removed = [];
        const priceChanged = [];
        const nameChanged = [];
        const imageChanged = [];

        Object.values(sanitized.cart).forEach(item => {
            const catalogEntry = catalog.get(item.id);
            let unavailableReason = null;

            if (!catalogEntry) {
                unavailableReason = 'missing';
            } else if (catalogEntry.active === false) {
                unavailableReason = 'inactive';
            } else if (typeof catalogEntry.stock === 'number'
                && Number.isFinite(catalogEntry.stock)
                && catalogEntry.stock === 0) {
                unavailableReason = 'out-of-stock';
            } else if (!catalogEntry.normalizedProduct) {
                unavailableReason = 'invalid-product';
            }

            if (unavailableReason) {
                removed.push({ id: item.id, reason: unavailableReason });
                return;
            }

            const currentProduct = catalogEntry.normalizedProduct;
            const nextItem = {
                id: currentProduct.id,
                nombre: currentProduct.nombre,
                precio: currentProduct.precio,
                qty: item.qty,
                img: currentProduct.img
            };

            if (item.precio !== nextItem.precio) priceChanged.push(item.id);
            if (item.nombre !== nextItem.nombre) nameChanged.push(item.id);
            if (item.img !== nextItem.img) imageChanged.push(item.id);
            reconciledCart[nextItem.id] = nextItem;
        });

        const changed = sanitized.changed
            || removed.length > 0
            || priceChanged.length > 0
            || nameChanged.length > 0
            || imageChanged.length > 0;

        return {
            cart: reconciledCart,
            changed,
            removed,
            priceChanged,
            nameChanged,
            imageChanged,
            requiresReview: removed.length > 0 || priceChanged.length > 0
        };
    }

    function createCartStore({ storage, key = CART_KEY } = {}) {
        if (!storage
            || typeof storage.getItem !== 'function'
            || typeof storage.setItem !== 'function') {
            throw new TypeError('storage debe implementar getItem() y setItem().');
        }

        let cart = {};
        let lastOperation = {
            ok: true,
            operation: 'initialize',
            code: null,
            persisted: true,
            error: null
        };

        function setOperation(operation, {
            ok = true,
            code = null,
            persisted = ok,
            error = null
        } = {}) {
            lastOperation = { ok, operation, code, persisted, error };
            return lastOperation;
        }

        function getLastOperation() {
            return { ...lastOperation };
        }

        function persist(nextCart, operation) {
            try {
                storage.setItem(key, JSON.stringify(nextCart));
                cart = nextCart;
                setOperation(operation);
                return true;
            } catch (error) {
                setOperation(operation, {
                    ok: false,
                    code: 'storage-write',
                    persisted: false,
                    error
                });
                return false;
            }
        }

        function load() {
            let parsed = {};
            let mustRepair = false;

            try {
                const raw = storage.getItem(key);
                if (raw !== null) {
                    try {
                        parsed = JSON.parse(raw);
                    } catch (error) {
                        parsed = {};
                        mustRepair = true;
                    }
                }
            } catch (error) {
                cart = {};
                setOperation('load', {
                    ok: false,
                    code: 'storage-read',
                    persisted: false,
                    error
                });
                return cart;
            }

            const sanitized = sanitizeCartState(parsed);
            cart = sanitized.cart;
            mustRepair = mustRepair || sanitized.changed;

            if (mustRepair) {
                persist(cart, 'repair');
            } else {
                setOperation('load');
            }

            return cart;
        }

        function refreshBeforeWrite() {
            load();
            return lastOperation.ok;
        }

        function getCart() {
            return cart;
        }

        function getItem(id) {
            const normalizedId = normalizeId(id);
            return normalizedId ? cart[normalizedId] || null : null;
        }

        function add(product) {
            const normalizedProduct = normalizeProductForCart(product);
            if (!normalizedProduct) {
                setOperation('add', {
                    ok: false,
                    code: 'invalid-product',
                    persisted: false
                });
                return null;
            }

            if (!refreshBeforeWrite()) return null;

            const existingItem = cart[normalizedProduct.id];
            const nextQty = existingItem ? existingItem.qty + 1 : 1;
            if (!Number.isSafeInteger(nextQty) || nextQty <= 0) {
                setOperation('add', {
                    ok: false,
                    code: 'invalid-qty',
                    persisted: false
                });
                return null;
            }

            const nextItem = {
                id: normalizedProduct.id,
                nombre: normalizedProduct.nombre,
                precio: normalizedProduct.precio,
                qty: nextQty,
                img: normalizedProduct.img
            };
            const nextCart = { ...cart, [nextItem.id]: nextItem };

            return persist(nextCart, 'add') ? nextItem : null;
        }

        function changeQty(id, quantity) {
            const normalizedId = normalizeId(id);
            const quantityIsValid = typeof quantity === 'number'
                && Number.isSafeInteger(quantity)
                && quantity >= 0;

            if (!normalizedId || !quantityIsValid) {
                setOperation('changeQty', {
                    ok: false,
                    code: 'invalid-qty',
                    persisted: false
                });
                return null;
            }

            if (!refreshBeforeWrite()) return null;
            if (!cart[normalizedId]) {
                setOperation('changeQty', {
                    ok: false,
                    code: 'missing-item',
                    persisted: false
                });
                return null;
            }

            const nextCart = { ...cart };
            if (quantity === 0) {
                delete nextCart[normalizedId];
            } else {
                nextCart[normalizedId] = {
                    ...cart[normalizedId],
                    qty: quantity
                };
            }

            if (!persist(nextCart, 'changeQty')) return null;
            return nextCart[normalizedId] || null;
        }

        function clear() {
            return persist({}, 'clear') ? cart : null;
        }

        function reconcile(products) {
            if (!Array.isArray(products)) {
                setOperation('reconcile', {
                    ok: false,
                    code: 'invalid-catalog',
                    persisted: false
                });
                return {
                    ok: false,
                    persisted: false,
                    changed: false,
                    cart,
                    removed: [],
                    priceChanged: [],
                    nameChanged: [],
                    imageChanged: [],
                    requiresReview: false
                };
            }

            if (!refreshBeforeWrite()) {
                return {
                    ok: false,
                    persisted: false,
                    changed: false,
                    cart,
                    removed: [],
                    priceChanged: [],
                    nameChanged: [],
                    imageChanged: [],
                    requiresReview: false
                };
            }

            const result = reconcileCartState(cart, products);
            if (!result.changed) {
                setOperation('reconcile');
                return { ...result, ok: true, persisted: true };
            }

            if (!persist(result.cart, 'reconcile')) {
                return { ...result, ok: false, persisted: false, cart };
            }

            return { ...result, ok: true, persisted: true, cart };
        }

        return Object.freeze({
            key,
            load,
            getCart,
            getItem,
            getLastOperation,
            add,
            changeQty,
            clear,
            reconcile
        });
    }

    function readProductFromButton(button) {
        return normalizeProductForCart({
            id: button.dataset.productId,
            nombre: button.dataset.productName,
            precio: button.dataset.productPrice,
            img: button.dataset.productImage || ''
        });
    }

    function updateProductCartButton(button, store) {
        const item = store.getItem(button.dataset.productId);
        const label = button.querySelector('.product-button__label') || button;

        label.textContent = item
            ? `En carrito (${item.qty})`
            : 'Agregar al carrito';
        button.classList.toggle('is-added', Boolean(item));
    }

    function showProductCartError(button) {
        const label = button.querySelector('.product-button__label') || button;
        label.textContent = 'No se pudo guardar. Intenta nuevamente.';
        button.classList.remove('is-added');
    }

    function bindProductCartButtons(documentReference, store) {
        if (!documentReference || typeof documentReference.querySelectorAll !== 'function') {
            throw new TypeError('documentReference debe permitir buscar elementos.');
        }

        if (!store
            || typeof store.load !== 'function'
            || typeof store.add !== 'function'
            || typeof store.getLastOperation !== 'function') {
            throw new TypeError('store debe ser un carrito válido.');
        }

        const buttons = [...documentReference.querySelectorAll('[data-product-cart]')];
        if (buttons.length === 0) return buttons;

        store.load();

        const refreshButtons = () => {
            buttons.forEach(button => updateProductCartButton(button, store));
        };
        const showStorageError = () => {
            buttons.forEach(showProductCartError);
        };

        buttons.forEach(button => {
            const product = readProductFromButton(button);
            if (!product) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', () => {
                const item = store.add(product);
                if (!item) {
                    showProductCartError(button);
                    return;
                }

                refreshButtons();
            });
        });

        if (store.getLastOperation().ok) {
            refreshButtons();
        } else {
            showStorageError();
        }

        const view = documentReference.defaultView;
        view?.addEventListener('storage', event => {
            if (event.key !== store.key) return;
            store.load();
            if (store.getLastOperation().ok) {
                refreshButtons();
            } else {
                showStorageError();
            }
        });

        return buttons;
    }

    return Object.freeze({
        CART_KEY,
        createCartStore,
        getEffectivePrice,
        normalizeProductForCart,
        reconcileCartState,
        bindProductCartButtons
    });
});
