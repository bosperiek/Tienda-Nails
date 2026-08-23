(function attachNantyShopConfig(root, factory) {
    'use strict';

    const config = factory();

    if (typeof module === 'object' && module.exports) {
        module.exports = config;
    }

    if (root && typeof root === 'object') {
        root.NantyShopConfig = config;

        if (root.document) {
            const initialize = () => config.bindCommercialContact(root.document);

            if (root.document.readyState === 'loading') {
                root.document.addEventListener('DOMContentLoaded', initialize, { once: true });
            } else {
                initialize();
            }
        }
    }
})(typeof globalThis !== 'undefined' ? globalThis : this, function createShopConfig() {
    'use strict';

    const WHATSAPP_NATIONAL_NUMBER = '5645723784';
    const WHATSAPP_ORDER_NUMBER = '525645723784';
    const PHONE_DISPLAY = '56 4572 3784';

    function createWhatsAppUrl(message = '') {
        const text = typeof message === 'string' ? message : String(message ?? '');
        return `https://wa.me/${WHATSAPP_ORDER_NUMBER}?text=${encodeURIComponent(text)}`;
    }

    function bindCommercialContact(documentReference) {
        if (!documentReference || typeof documentReference.querySelectorAll !== 'function') {
            throw new TypeError('documentReference debe permitir buscar elementos.');
        }

        documentReference.querySelectorAll('[data-whatsapp-message]').forEach(link => {
            link.href = createWhatsAppUrl(link.dataset.whatsappMessage || '');
        });

        documentReference.querySelectorAll('[data-shop-phone]').forEach(element => {
            element.textContent = PHONE_DISPLAY;
        });
    }

    return Object.freeze({
        WHATSAPP_NATIONAL_NUMBER,
        WHATSAPP_ORDER_NUMBER,
        PHONE_DISPLAY,
        createWhatsAppUrl,
        bindCommercialContact
    });
});
