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

                const store = api.createCartStore({ storage });
                api.bindProductCartButtons(root.document, store);
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

    function createCartStore({ storage, key = CART_KEY } = {}) {
        if (!storage
            || typeof storage.getItem !== 'function'
            || typeof storage.setItem !== 'function') {
            throw new TypeError('storage debe implementar getItem() y setItem().');
        }

        let cart = {};

        function persist() {
            storage.setItem(key, JSON.stringify(cart));
            return cart;
        }

        function load() {
            try {
                const raw = storage.getItem(key);
                const parsed = raw ? JSON.parse(raw) : {};
                cart = parsed && typeof parsed === 'object' && !Array.isArray(parsed)
                    ? parsed
                    : {};
            } catch (error) {
                cart = {};
            }

            let cartUpdated = false;
            Object.values(cart).forEach(item => {
                if (!item || typeof item !== 'object') return;

                const currentPrice = parsePrice(item.precio);
                const legacyPrice = currentPrice !== null
                    ? currentPrice
                    : parsePrice(item.precioRaw);

                if (item.precio !== legacyPrice
                    || Object.prototype.hasOwnProperty.call(item, 'precioRaw')) {
                    item.precio = legacyPrice;
                    delete item.precioRaw;
                    cartUpdated = true;
                }
            });

            if (cartUpdated) {
                try {
                    persist();
                } catch (error) {
                    // La migración heredada no debe impedir cargar el carrito.
                }
            }
            return cart;
        }

        function getCart() {
            return cart;
        }

        function getItem(id) {
            return cart[String(id)] || null;
        }

        function add(product) {
            if (!product || typeof product !== 'object') return null;

            const id = String(product.id ?? '');
            const price = parsePrice(product.precio);
            if (!id || price === null) return null;

            const name = String(product.nombre || 'Producto');
            const image = typeof product.img === 'string' ? product.img : '';

            if (!cart[id]) {
                cart[id] = {
                    id,
                    nombre: name,
                    precio: price,
                    qty: 0,
                    img: image
                };
            }

            cart[id].qty += 1;
            persist();
            return cart[id];
        }

        function changeQty(id, quantity) {
            const normalizedId = String(id);
            if (!cart[normalizedId]) return null;

            cart[normalizedId].qty = Math.max(0, quantity);
            if (cart[normalizedId].qty === 0) {
                delete cart[normalizedId];
            }

            persist();
            return cart[normalizedId] || null;
        }

        function clear() {
            cart = {};
            persist();
            return cart;
        }

        return Object.freeze({
            load,
            getCart,
            getItem,
            add,
            changeQty,
            clear
        });
    }

    function readProductFromButton(button) {
        const id = button.dataset.productId;
        const name = button.dataset.productName;
        const priceText = button.dataset.productPrice;

        if (!id || !name || !priceText) return null;

        const price = parsePrice(priceText);
        if (price === null) return null;

        return {
            id,
            nombre: name,
            precio: price,
            img: button.dataset.productImage || ''
        };
    }

    function updateProductCartButton(button, store) {
        const item = store.getItem(button.dataset.productId);
        const label = button.querySelector('.product-button__label') || button;

        label.textContent = item
            ? `En carrito (${item.qty})`
            : 'Agregar al carrito';
        button.classList.toggle('is-added', Boolean(item));
    }

    function bindProductCartButtons(documentReference, store) {
        if (!documentReference || typeof documentReference.querySelectorAll !== 'function') {
            throw new TypeError('documentReference debe permitir buscar elementos.');
        }

        if (!store || typeof store.load !== 'function' || typeof store.add !== 'function') {
            throw new TypeError('store debe ser un carrito válido.');
        }

        const buttons = [...documentReference.querySelectorAll('[data-product-cart]')];
        if (buttons.length === 0) return buttons;

        store.load();

        const refreshButtons = () => {
            buttons.forEach(button => updateProductCartButton(button, store));
        };

        buttons.forEach(button => {
            const product = readProductFromButton(button);
            if (!product) {
                button.disabled = true;
                return;
            }

            button.addEventListener('click', () => {
                store.add(product);
                refreshButtons();
            });
        });

        refreshButtons();

        const view = documentReference.defaultView;
        view?.addEventListener('storage', event => {
            if (event.key !== CART_KEY) return;
            store.load();
            refreshButtons();
        });

        return buttons;
    }

    return Object.freeze({
        CART_KEY,
        createCartStore,
        bindProductCartButtons
    });
});
