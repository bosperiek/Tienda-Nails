function isCatalogProductAvailable(product) {
    if (!product || product.active === false) return false;
    if (product.stock === null || typeof product.stock === 'undefined') return true;
    if (typeof product.stock !== 'number') return false;
    return Number.isFinite(product.stock) && product.stock > 0;
}

function normalizeSearchText(value) {
    return String(value ?? '')
        .trim()
        .toLowerCase()
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '');
}

const catalogSearchIndex = new WeakMap();

function getCatalogProductSearchText(product) {
    if (!product || typeof product !== 'object') return '';
    const cached = catalogSearchIndex.get(product);
    if (typeof cached === 'string') return cached;

    const commercialFields = [
        product.data,
        product.nombre,
        product.name,
        product.category,
        product.brand,
        product.subcategory,
        product.description
    ];
    const searchText = normalizeSearchText(
        commercialFields.filter(value => value !== null && typeof value !== 'undefined').join(' ')
    );
    catalogSearchIndex.set(product, searchText);
    return searchText;
}

document.addEventListener('DOMContentLoaded', () => {

    if (typeof misProductos === 'undefined') {
        alert("⚠️ ERROR: No encuentro 'misProductos'. Revisa que hayas guardado bien datos.js");
        return;
    }

    if (!window.NantyCart || typeof window.NantyCart.createCartStore !== 'function') {
        console.error('No se pudo inicializar el carrito compartido.');
        return;
    }

    console.log("✅ Datos cargados:", misProductos.length, "productos.");

    let activeCategory = '';
    let searchText = '';
    const itemsPerPage = 24;
    const eagerProductImageCount = 4;
    const imageUrlSchemePattern = /^[a-z][a-z0-9+.-]*:/i;
    const unsafeImageWhitespacePattern = /[\u0000-\u0020\u007f]/u;
    let currentLimit = itemsPerPage;
    let currentPage = 1;
    let selectedSort = '';
    let filteredAndSorted = [];

    // Lista actual visible para la navegación del modal
    let currentVisibleList = [];
    let currentModalIndex = -1;
    let currentModalProduct = null;
    let modalTriggerElement = null;
    let isModalImageZoomed = false;
    let modalSwipeStart = null;
    let didModalImageSwipe = false;

    const categoriesContainer = document.getElementById('categories');

    function decodeImagePathSegment(value) {
        let decoded = value;

        for (let attempt = 0; attempt < 3; attempt += 1) {
            const nextValue = decodeURIComponent(decoded);
            if (nextValue === decoded) break;
            decoded = nextValue;
        }

        return decoded;
    }

    function isSafeLocalImagePath(value) {
        if (value.startsWith('//')
            || value.includes('\\')
            || unsafeImageWhitespacePattern.test(value)) {
            return false;
        }

        const path = value.split(/[?#]/u, 1)[0];
        if (!path || path.includes('//')) return false;

        try {
            return path.split('/').every(segment => {
                if (segment === '') return true;

                const decodedSegment = decodeImagePathSegment(segment);
                return decodedSegment !== '.'
                    && decodedSegment !== '..'
                    && !decodedSegment.includes('/')
                    && !decodedSegment.includes('\\')
                    && !unsafeImageWhitespacePattern.test(decodedSegment);
            });
        } catch (error) {
            return false;
        }
    }

    function parseHttpsImageUrl(value) {
        try {
            const parsed = new URL(value);
            if (parsed.protocol !== 'https:'
                || !parsed.hostname
                || parsed.username
                || parsed.password) {
                return null;
            }

            parsed.hash = '';
            return parsed;
        } catch (error) {
            return null;
        }
    }

    function resolveProductImageUrl(value) {
        if (typeof value !== 'string') return '';

        const normalized = value.trim();
        if (!normalized
            || normalized.startsWith('//')
            || unsafeImageWhitespacePattern.test(normalized)) {
            return '';
        }

        if (imageUrlSchemePattern.test(normalized)) {
            const absoluteImageUrl = parseHttpsImageUrl(normalized);
            return absoluteImageUrl ? absoluteImageUrl.href : '';
        }

        if (!isSafeLocalImagePath(normalized)) return '';

        const pathWithoutFragment = normalized.split('#', 1)[0];
        return pathWithoutFragment.startsWith('/')
            ? pathWithoutFragment
            : `/${pathWithoutFragment}`;
    }

    // -------------------------------------------------------
    // UTILIDADES DE CATEGORÍA
    // -------------------------------------------------------
    function extractCategorySlug(prod) {
        if (prod && prod.category && typeof prod.category === 'string' && prod.category.trim() !== '') {
            return String(prod.category).trim();
        }
        const keyCat = Object.keys(prod).find(k => /category|categoria|category-link/i.test(k));
        const url = keyCat ? prod[keyCat] : null;
        if (!url || typeof url !== 'string') return 'sin-categoria';
        const m = String(url).match(/\/c\/([^\/\?#]+)/i);
        let slug = null;
        if (m && m[1]) slug = m[1];
        else {
            const parts = String(url).split('/').filter(Boolean);
            slug = parts.length ? parts[parts.length - 1] : null;
        }
        if (slug) prod.category = slug;
        return slug || 'sin-categoria';
    }

    function prettyNameFromSlug(slug) {
        if (!slug || slug === 'sin-categoria') return 'Sin categoría';
        return slug.replace(/[-_]/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    }

    misProductos.forEach(p => {
        try {
            const slug = extractCategorySlug(p);
            if (slug && slug !== 'sin-categoria') p.category = slug;
        } catch (e) {}
        Object.keys(p).forEach(k => { if (/^category-link/i.test(k)) delete p[k]; });
        if (p.image2) delete p.image2;
    });

    const categoriesMap = {};

    function getAvailableCatalogProducts() {
        return misProductos.filter(isCatalogProductAvailable);
    }

    function rebuildCategoriesMap() {
        Object.keys(categoriesMap).forEach(key => delete categoriesMap[key]);
        getAvailableCatalogProducts().forEach(product => {
            const slug = extractCategorySlug(product);
            categoriesMap[slug] = (categoriesMap[slug] || 0) + 1;
        });

        if (activeCategory && !categoriesMap[activeCategory]) activeCategory = '';
    }

    rebuildCategoriesMap();

    // -------------------------------------------------------
    // RENDER CATEGORÍAS
    // -------------------------------------------------------
    function selectCategory(slug) {
        activeCategory = slug;
        applyFilters();
        requestAnimationFrame(() => {
            const selectedButton = Array.from(categoriesContainer?.querySelectorAll('[data-category-filter]') || [])
                .find(button => button.dataset.categoryFilter === slug);
            selectedButton?.focus();
        });
    }

    function renderCategoryButtons() {
        if (!categoriesContainer) return;
        categoriesContainer.innerHTML = '';

        const allBtn = document.createElement('button');
        allBtn.type = 'button';
        allBtn.className = 'category-btn' + (activeCategory === '' ? ' active' : '');
        allBtn.textContent = `Todas (${getAvailableCatalogProducts().length})`;
        allBtn.dataset.categoryFilter = '';
        allBtn.setAttribute('aria-pressed', String(activeCategory === ''));
        allBtn.addEventListener('click', () => selectCategory(''));
        categoriesContainer.appendChild(allBtn);

        const preferredOrder = ['miss cherry', 'mussa', 'kalanzi', 'dijes y cristales', 'basicos y economicos', 'herramientas'];

        function normalizeText(s) {
            return String(s || '').toLowerCase().replace(/[-_]/g, ' ').normalize('NFD').replace(/\p{Diacritic}/gu, '').trim();
        }

        const allSlugs = Object.keys(categoriesMap);
        const preferredSlugs = [];
        const otherSlugs = [];

        allSlugs.forEach(slug => {
            const pretty = normalizeText(prettyNameFromSlug(slug));
            const matchIndex = preferredOrder.findIndex(p => normalizeText(p) === pretty || pretty.includes(normalizeText(p)) || normalizeText(slug).includes(normalizeText(p)));
            if (matchIndex >= 0) {
                preferredSlugs.push({ slug, index: matchIndex });
            } else {
                otherSlugs.push(slug);
            }
        });

        preferredSlugs.sort((a, b) => a.index - b.index);

        preferredSlugs.forEach(item => {
            const slug = item.slug;
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'category-btn' + (activeCategory === slug ? ' active' : '');
            btn.textContent = `${prettyNameFromSlug(slug)} (${categoriesMap[slug]})`;
            btn.dataset.slug = slug;
            btn.dataset.categoryFilter = slug;
            btn.setAttribute('aria-pressed', String(activeCategory === slug));
            btn.addEventListener('click', () => selectCategory(slug));
            categoriesContainer.appendChild(btn);
        });

        const hiddenContainer = document.createElement('div');
        const hasActiveOtherCategory = otherSlugs.includes(activeCategory);
        hiddenContainer.id = 'more-categories';
        hiddenContainer.className = 'more-categories' + (hasActiveOtherCategory ? '' : ' d-none');

        otherSlugs.sort((a, b) => prettyNameFromSlug(a).localeCompare(prettyNameFromSlug(b))).forEach(slug => {
            const btn = document.createElement('button');
            btn.type = 'button';
            btn.className = 'category-btn' + (activeCategory === slug ? ' active' : '');
            btn.textContent = `${prettyNameFromSlug(slug)} (${categoriesMap[slug]})`;
            btn.dataset.slug = slug;
            btn.dataset.categoryFilter = slug;
            btn.setAttribute('aria-pressed', String(activeCategory === slug));
            btn.addEventListener('click', () => selectCategory(slug));
            hiddenContainer.appendChild(btn);
        });

        categoriesContainer.appendChild(hiddenContainer);

        if (otherSlugs.length > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.type = 'button';
            toggleBtn.className = 'category-btn more-toggle';
            toggleBtn.setAttribute('aria-controls', hiddenContainer.id);
            let expanded = hasActiveOtherCategory;
            toggleBtn.setAttribute('aria-expanded', String(expanded));
            toggleBtn.textContent = expanded ? 'Ocultar' : 'Más categorías';
            toggleBtn.addEventListener('click', () => {
                expanded = !expanded;
                hiddenContainer.classList.toggle('d-none', !expanded);
                toggleBtn.textContent = expanded ? 'Ocultar' : 'Más categorías';
                toggleBtn.setAttribute('aria-expanded', String(expanded));
            });
            categoriesContainer.appendChild(toggleBtn);
        }
    }

    const sortSelect = document.getElementById('sort');
    const loadingEl = document.getElementById('loading');
    const paginationContainer = document.getElementById('pagination');
    const catalogStatusEl = document.getElementById('catalog-status');
    const catalogStatusMessageEl = document.getElementById('catalog-status-message');
    const retryProductsBtn = document.getElementById('retry-products');
    const gridProductosEl = document.getElementById('grid-productos');
    const catalogSkeletonEl = document.getElementById('catalog-skeleton');
    const catalogActionFeedbackEl = document.getElementById('catalog-action-feedback');
    const catalogResultsStatusEl = document.getElementById('catalog-results-status');
    let resultsAnnouncementTimer = null;
    let lastResultsAnnouncementSignature = '';

    function showCatalogActionFeedback(message) {
        if (!catalogActionFeedbackEl) return;
        catalogActionFeedbackEl.textContent = message;
        catalogActionFeedbackEl.classList.remove('d-none');
    }

    function clearCatalogActionFeedback() {
        if (!catalogActionFeedbackEl) return;
        catalogActionFeedbackEl.textContent = '';
        catalogActionFeedbackEl.classList.add('d-none');
    }

    function scheduleResultsAnnouncement() {
        if (!catalogResultsStatusEl) return;
        const total = filteredAndSorted.length;
        const message = total === 0
            ? 'No se encontraron productos.'
            : `${total} ${total === 1 ? 'producto encontrado' : 'productos encontrados'}.`;
        const signature = `${searchText}|${activeCategory}|${selectedSort}|${total}`;
        if (signature === lastResultsAnnouncementSignature) return;

        clearTimeout(resultsAnnouncementTimer);
        resultsAnnouncementTimer = setTimeout(() => {
            catalogResultsStatusEl.textContent = message;
            lastResultsAnnouncementSignature = signature;
        }, 300);
    }

    function actualizarInterfazEstadoCatalogo(estado) {
        if (!estado) return;

        const hasProducts = estado.hasProducts === true;
        const showSkeleton = estado.status === 'loading' && estado.hasProducts !== true;
        let message = '';
        let showStatus = false;
        let showRetry = false;
        let hideCatalog = false;
        let alertClass = 'alert-warning';
        let role = 'status';
        let ariaLive = 'polite';

        if (estado.status === 'loading') {
            hideCatalog = !hasProducts;
        } else if (estado.status === 'cache') {
            message = 'Mostrando una copia guardada del catálogo. Algunos precios o productos podrían haber cambiado.';
            showStatus = true;
            showRetry = true;
        } else if (estado.status === 'error' && hasProducts) {
            message = 'Mostrando una copia guardada del catálogo. No pudimos verificar la actualización.';
            showStatus = true;
            showRetry = true;
        } else if (estado.status === 'empty' && hasProducts) {
            message = 'No pudimos verificar la actualización. Se conserva el catálogo disponible.';
            showStatus = true;
            showRetry = true;
        } else if (
            (estado.status === 'error' || estado.status === 'empty')
            && !hasProducts
        ) {
            message = 'No pudimos cargar el catálogo. Revisa tu conexión e inténtalo nuevamente.';
            showStatus = true;
            showRetry = true;
            hideCatalog = true;
            alertClass = 'alert-danger';
            role = 'alert';
            ariaLive = 'assertive';
        }

        if (catalogStatusEl) {
            catalogStatusEl.classList.remove('alert-warning', 'alert-danger');
            catalogStatusEl.classList.add(alertClass);
            catalogStatusEl.classList.toggle('d-none', !showStatus);
            catalogStatusEl.setAttribute('role', role);
            catalogStatusEl.setAttribute('aria-live', ariaLive);
        }
        if (catalogStatusMessageEl) catalogStatusMessageEl.textContent = message;
        if (retryProductsBtn) retryProductsBtn.classList.toggle('d-none', !showRetry);
        if (catalogSkeletonEl) catalogSkeletonEl.hidden = !showSkeleton;
        if (gridProductosEl) gridProductosEl.hidden = hideCatalog;
        if (hideCatalog && loadingEl) loadingEl.hidden = true;
    }

    if (typeof productosEstadoActual !== 'undefined') {
        actualizarInterfazEstadoCatalogo(productosEstadoActual);
    }

    document.addEventListener('productosEstado', (event) => {
        actualizarInterfazEstadoCatalogo(event.detail);
    });

    if (retryProductsBtn) {
        retryProductsBtn.addEventListener('click', async () => {
            if (retryProductsBtn.disabled) return;

            retryProductsBtn.disabled = true;
            retryProductsBtn.textContent = 'Reintentando…';
            try {
                await cargarProductosDesdeSheet();
            } finally {
                retryProductsBtn.textContent = 'Reintentar';
                retryProductsBtn.disabled = false;
            }
        });
    }

    if (loadingEl) {
        loadingEl.addEventListener('click', () => {
            currentLimit += itemsPerPage;
            renderPaginated();
        });
    }

    // -------------------------------------------------------
    // ORDENADO Y FILTRADO
    // -------------------------------------------------------
    const currencyFormatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    });

    function sortList(list, sortVal) {
        const copy = list.slice();
        if (!sortVal) return copy;
        if (sortVal === 'price-asc' || sortVal === 'price-desc') {
            copy.sort((a, b) => {
                const priceA = window.NantyCart.getEffectivePrice(a);
                const priceB = window.NantyCart.getEffectivePrice(b);

                if (priceA === null && priceB === null) return 0;
                if (priceA === null) return 1;
                if (priceB === null) return -1;

                return sortVal === 'price-asc' ? priceA - priceB : priceB - priceA;
            });
        } else if (sortVal === 'name-asc') {
            copy.sort((a, b) => (a.data || a.nombre || '').toString().toLowerCase().localeCompare((b.data || b.nombre || '').toString().toLowerCase()));
        } else if (sortVal === 'name-desc') {
            copy.sort((a, b) => (b.data || b.nombre || '').toString().toLowerCase().localeCompare((a.data || a.nombre || '').toString().toLowerCase()));
        }
        return copy;
    }

    function applyFilters({ resetLimit = true, announceResults = true } = {}) {
        const filtrados = getAvailableCatalogProducts().filter(producto => {
            const textoOK = searchText === '' || getCatalogProductSearchText(producto).includes(searchText);
            if (!textoOK) return false;
            if (!activeCategory) return true;
            return extractCategorySlug(producto) === activeCategory;
        });

        filteredAndSorted = sortList(filtrados, selectedSort);
        currentPage = 1;
        if (resetLimit) {
            currentLimit = itemsPerPage;
        }
        renderPaginated();
        renderCategoryButtons();
        if (announceResults) scheduleResultsAnnouncement();
    }

    function renderPaginated() {
        const total = filteredAndSorted.length;
        const visibles = filteredAndSorted.slice(0, currentLimit);
        currentVisibleList = visibles;
        renderizarProductos(visibles);
        if (loadingEl) {
            loadingEl.hidden = (currentLimit >= total);
            loadingEl.textContent = 'Ver más';
        }
        if (paginationContainer) {
            paginationContainer.hidden = true;
            paginationContainer.innerHTML = '';
        }
    }

    // -------------------------------------------------------
    // PAGINACIÓN
    // -------------------------------------------------------
    function renderPaginationControls(totalPages, page) {
        if (!paginationContainer) return;
        paginationContainer.hidden = false;
        paginationContainer.innerHTML = '';
        const ul = document.createElement('ul');
        ul.className = 'pagination';

        function makePageItem(label, targetPage, disabled = false, active = false) {
            const li = document.createElement('li');
            li.className = 'page-item' + (disabled ? ' disabled' : '') + (active ? ' active' : '');
            const a = document.createElement('a');
            a.className = 'page-link';
            a.href = '#';
            a.textContent = label;
            a.addEventListener('click', (e) => {
                e.preventDefault();
                if (disabled || targetPage === page) return;
                currentPage = targetPage;
                renderPaginated();
                window.scrollTo({ top: 0, behavior: 'smooth' });
            });
            li.appendChild(a);
            return li;
        }

        ul.appendChild(makePageItem('← Anterior', Math.max(1, page - 1), page <= 1));
        const maxButtons = 5;
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxButtons - 1);
        if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

        for (let p = start; p <= end; p++) {
            ul.appendChild(makePageItem(String(p), p, false, p === page));
        }

        ul.appendChild(makePageItem('Siguiente →', Math.min(totalPages, page + 1), page >= totalPages));
        paginationContainer.appendChild(ul);
    }

    // -------------------------------------------------------
    // MODAL DE IMAGEN — REDISEÑADO CON NAVEGACIÓN
    // -------------------------------------------------------
    const imageModalEl  = document.getElementById('imageModal');
    const modalImg      = document.getElementById('modalImage');
    const modalImageWrapper = modalImg?.closest('.modal-image-wrapper');
    const modalTitle    = document.getElementById('modalTitle');
    const modalPrice    = document.getElementById('modalPrice');
    const modalLoader   = document.getElementById('modal-loader');
    const modalAddBtn   = document.getElementById('modal-add-to-cart');
    const modalProductLink = document.getElementById('modal-product-link');
    const modalPrevBtn  = document.getElementById('modal-prev');
    const modalNextBtn  = document.getElementById('modal-next');

    function createCanonicalProductPath(prod, productName) {
        if (!window.NantyProductUrl || typeof window.NantyProductUrl.createProductPath !== 'function') {
            return null;
        }

        return window.NantyProductUrl.createProductPath({
            id: prod.id,
            name: productName
        });
    }

    function updateProductLink(link, prod, productName) {
        if (!link) return;

        const productPath = createCanonicalProductPath(prod, productName);
        if (!productPath) {
            link.removeAttribute('href');
            link.hidden = true;
            return;
        }

        link.href = productPath;
        link.hidden = false;
    }

    function actualizarContenidoBotonModal(item) {
        if (!modalAddBtn) return;

        const svgNamespace = 'http://www.w3.org/2000/svg';
        const icon = document.createElementNS(svgNamespace, 'svg');
        icon.setAttribute('class', 'me-1');
        icon.setAttribute('width', '1em');
        icon.setAttribute('height', '1em');
        icon.setAttribute('viewBox', '0 0 24 24');
        icon.setAttribute('fill', 'none');
        icon.setAttribute('stroke', 'currentColor');
        icon.setAttribute('stroke-width', '2');
        icon.setAttribute('stroke-linecap', 'round');
        icon.setAttribute('stroke-linejoin', 'round');
        icon.setAttribute('aria-hidden', 'true');
        icon.setAttribute('focusable', 'false');

        const pathData = item
            ? ['M5 12l4 4L19 6']
            : ['M6 8h12l1 13H5L6 8Z', 'M9 10V6a3 3 0 0 1 6 0v4', 'M12 13v5', 'M9.5 15.5h5'];

        pathData.forEach((data) => {
            const path = document.createElementNS(svgNamespace, 'path');
            path.setAttribute('d', data);
            icon.appendChild(path);
        });

        const text = document.createElement('span');
        text.textContent = item
            ? ` En carrito (${item.qty})`
            : ' Añadir al carrito';

        modalAddBtn.replaceChildren(icon, text);
    }

    // Inicializar el modal de Bootstrap de forma diferida para asegurar
    // que Bootstrap ya esté cargado cuando se use por primera vez.
    function getBsImageModal() {
        if (!imageModalEl) return null;
        return bootstrap.Modal.getOrCreateInstance(imageModalEl);
    }

    function resetModalImageZoom() {
        isModalImageZoomed = false;
        if (!modalImg) return;
        modalImg.classList.remove('is-zoomed');
        modalImg.setAttribute('aria-pressed', 'false');
    }

    function toggleModalImageZoom() {
        if (!modalImg || modalImg.classList.contains('changing')) return;
        isModalImageZoomed = !isModalImageZoomed;
        modalImg.classList.toggle('is-zoomed', isModalImageZoomed);
        modalImg.setAttribute('aria-pressed', String(isModalImageZoomed));
    }

    function getProductData(prod) {
        const llaves = Object.keys(prod);
        const keyNombre = llaves.find(k => /(^data\b|nom|name|titul|title|producto|descripcion)/i.test(k)) || llaves[0];
        const imageCandidates = [
            prod.image,
            ...llaves
                .filter(key => /(image|imagen|img|src|foto)/i.test(key))
                .map(key => prod[key])
        ];
        const imgUrl = imageCandidates
            .map(resolveProductImageUrl)
            .find(Boolean) || '';
        const altProducto =
            String(prod.altTexto || '').trim()
            || String(prod.data || '').trim()
            || 'Producto';
        return {
            nombre: prod[keyNombre] || 'Producto',
            precio: window.NantyCart.getEffectivePrice(prod),
            imgUrl,
            altProducto
        };
    }

    function loadModalImage(prod, index) {
        if (!modalImg || !modalTitle) return;

        resetModalImageZoom();
        currentModalIndex = index;

        const { nombre, precio, imgUrl, altProducto } = getProductData(prod);
        updateProductLink(modalProductLink, prod, nombre);

        // Mostrar loader + animar salida de imagen
        if (modalLoader) modalLoader.classList.add('visible');
        modalImg.classList.add('changing');

        // Pequeño delay para la transición
        setTimeout(() => {
            modalTitle.textContent = nombre;
            if (modalPrice) {
                modalPrice.textContent = formatPriceForDisplay(precio);
            }

            modalImg.alt = altProducto;

            modalImg.onload = () => {
                if (modalLoader) modalLoader.classList.remove('visible');
                modalImg.classList.remove('changing');
            };
            modalImg.onerror = () => {
                modalImg.src = 'https://placehold.co/400x400/f8f0ed/e67e9f?text=Sin+Imagen';
                if (modalLoader) modalLoader.classList.remove('visible');
                modalImg.classList.remove('changing');
            };
            modalImg.src = imgUrl || 'https://placehold.co/400x400/f8f0ed/e67e9f?text=Sin+Imagen';
        }, 120);

        // Botón añadir al carrito desde el modal
        // Guardamos el producto activo en una variable que el listener siempre lee al momento del click
        currentModalProduct = prod;
        if (modalAddBtn) {
            const inCart = carrito[String(prod.id)];
            actualizarContenidoBotonModal(inCart);
        }

        // Actualizar botones de navegación
        updateNavButtons();
    }

    if (modalImg) {
        modalImg.setAttribute('role', 'button');
        modalImg.setAttribute('tabindex', '0');
        modalImg.setAttribute('aria-label', 'Alternar zoom de la imagen del producto');
        modalImg.setAttribute('aria-pressed', 'false');
        modalImg.draggable = false;

        modalImg.addEventListener('click', () => {
            if (didModalImageSwipe) {
                didModalImageSwipe = false;
                return;
            }
            toggleModalImageZoom();
        });
        modalImg.addEventListener('keydown', (e) => {
            if (e.key !== 'Enter' && e.key !== ' ') return;
            e.preventDefault();
            toggleModalImageZoom();
        });
    }

    if (modalImageWrapper) {
        modalImageWrapper.addEventListener('pointerdown', (e) => {
            if (!e.isPrimary || e.button !== 0) return;
            didModalImageSwipe = false;
            modalSwipeStart = {
                pointerId: e.pointerId,
                x: e.clientX,
                y: e.clientY
            };
            e.target.setPointerCapture?.(e.pointerId);
        });

        modalImageWrapper.addEventListener('pointerup', (e) => {
            if (!modalSwipeStart || e.pointerId !== modalSwipeStart.pointerId) return;

            const deltaX = e.clientX - modalSwipeStart.x;
            const deltaY = e.clientY - modalSwipeStart.y;
            const isHorizontalSwipe = Math.abs(deltaX) >= 50 && Math.abs(deltaX) > Math.abs(deltaY);
            modalSwipeStart = null;

            if (!isHorizontalSwipe) return;

            didModalImageSwipe = true;
            setTimeout(() => {
                didModalImageSwipe = false;
            }, 0);

            if (isModalImageZoomed || !currentModalProduct) return;

            if (deltaX < 0) {
                modalNextBtn?.click();
            } else {
                modalPrevBtn?.click();
            }
        });

        modalImageWrapper.addEventListener('pointercancel', () => {
            modalSwipeStart = null;
            didModalImageSwipe = false;
        });
    }

    function updateNavButtons() {
        if (modalPrevBtn) modalPrevBtn.disabled = currentModalIndex <= 0;
        if (modalNextBtn) modalNextBtn.disabled = currentModalIndex >= filteredAndSorted.length - 1;
    }

    function ampliarImagen(prod, triggerElement) {
        if (!imageModalEl) return;
        const productId = String(prod.id);
        const index = filteredAndSorted.findIndex(item => String(item.id) === productId);
        if (index === -1) return;
        modalTriggerElement = triggerElement;
        loadModalImage(filteredAndSorted[index], index);
        getBsImageModal().show();
    }

    // Listener único para el botón de añadir en el modal
    // Usa siempre currentModalProduct que se actualiza en loadModalImage
    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', () => {
            if (!currentModalProduct) return;
            const item = addToCart(currentModalProduct);
            if (item) actualizarContenidoBotonModal(item);
        });
    }

    // Navegación con flechas
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            if (currentModalIndex > 0) {
                loadModalImage(filteredAndSorted[currentModalIndex - 1], currentModalIndex - 1);
            }
        });
    }
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            if (currentModalIndex < filteredAndSorted.length - 1) {
                loadModalImage(filteredAndSorted[currentModalIndex + 1], currentModalIndex + 1);
            }
        });
    }

    // Navegación con teclado (←→) cuando el modal está abierto
    if (imageModalEl) {
        imageModalEl.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentModalIndex > 0) {
                loadModalImage(filteredAndSorted[currentModalIndex - 1], currentModalIndex - 1);
            } else if (e.key === 'ArrowRight' && currentModalIndex < filteredAndSorted.length - 1) {
                loadModalImage(filteredAndSorted[currentModalIndex + 1], currentModalIndex + 1);
            }
        });

        imageModalEl.addEventListener('hide.bs.modal', () => {
            resetModalImageZoom();
            const activeElement = document.activeElement;
            if (activeElement && imageModalEl.contains(activeElement)) {
                activeElement.blur();
            }
        });

        imageModalEl.addEventListener('hidden.bs.modal', () => {
            if (modalTriggerElement && document.contains(modalTriggerElement)) {
                modalTriggerElement.focus();
            }
            modalTriggerElement = null;
        });
    }

    // -------------------------------------------------------
    // RENDER DE PRODUCTOS
    // -------------------------------------------------------
    function renderizarProductos(lista) {
        const contenedor = document.getElementById('grid-productos');
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<p class="text-center w-100 py-5 text-muted">No se encontraron productos 😢<br><small>Intenta con otro término o categoría</small></p>';
            return;
        }

        const fragmento = document.createDocumentFragment();

        lista.forEach((prod, index) => {
            const { nombre, precio, imgUrl, altProducto } = getProductData(prod);

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';

            const tarjeta = document.createElement('div');
            tarjeta.className = 'card h-100';
            tarjeta.dataset.id = prod.id;

            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';
            imgContainer.title = 'Clic para ampliar';
            imgContainer.tabIndex = 0;
            imgContainer.setAttribute('role', 'button');
            imgContainer.setAttribute('aria-label', `Ampliar imagen de ${nombre}`);

            const imgEl = document.createElement('img');
            imgEl.loading = index < eagerProductImageCount ? 'eager' : 'lazy';
            imgEl.decoding = 'async';
            imgEl.className = 'card-img';
            imgEl.alt = altProducto;

            imgContainer.addEventListener('click', (e) => ampliarImagen(prod, e.currentTarget));
            imgContainer.addEventListener('keydown', (e) => {
                if (e.key !== 'Enter' && e.key !== ' ') return;
                e.preventDefault();
                ampliarImagen(prod, e.currentTarget);
            });

            imgEl.onload = () => { imgEl.classList.add('visible'); };
            imgEl.onerror = () => {
                imgEl.src = 'https://placehold.co/300x300/f8f0ed/e67e9f?text=Sin+Imagen';
                imgEl.classList.add('visible');
            };
            imgEl.src = imgUrl || 'https://placehold.co/300x300/f8f0ed/e67e9f?text=Sin+Imagen';

            imgContainer.appendChild(imgEl);

            const cuerpo = document.createElement('div');
            cuerpo.className = 'card-body';

            const h3 = document.createElement('h3');
            h3.className = 'card-title';
            h3.textContent = nombre;

            const divPrice = document.createElement('div');
            divPrice.className = 'card-price';
            divPrice.textContent = formatPriceForDisplay(precio);

            const productLink = document.createElement('a');
            productLink.className = 'card-product-link';
            productLink.textContent = 'Ver producto';
            updateProductLink(productLink, prod, nombre);

            const likeBtn = document.createElement('button');
            likeBtn.className = 'btn-like';
            likeBtn.type = 'button';
            const lr = (window.getLikes) ? window.getLikes(prod.id) : 0;
            const isLiked = Boolean(window.hasLiked && window.hasLiked(prod.id));
            likeBtn.textContent = `❤ ${lr}`;
            likeBtn.setAttribute('aria-pressed', String(isLiked));
            likeBtn.setAttribute(
                'aria-label',
                `${isLiked ? 'Quitar' : 'Agregar'} ${nombre} ${isLiked ? 'de' : 'a'} favoritos`
            );
            if (isLiked) likeBtn.classList.add('liked');
            likeBtn.addEventListener('click', (e) => { e.stopPropagation(); if (window.miToggleLike) window.miToggleLike(prod.id); });

            const btnAdd = document.createElement('button');
            btnAdd.className = 'btn-add';
            btnAdd.type = 'button';
            const inCart = carrito[String(prod.id)];
            btnAdd.textContent = inCart ? `En carrito (${inCart.qty})` : 'Agregar';
            btnAdd.addEventListener('click', (e) => { e.stopPropagation(); addToCart(prod); });

            cuerpo.appendChild(h3);
            cuerpo.appendChild(divPrice);
            cuerpo.appendChild(productLink);
            cuerpo.appendChild(likeBtn);
            cuerpo.appendChild(btnAdd);

            tarjeta.appendChild(imgContainer);
            tarjeta.appendChild(cuerpo);
            col.appendChild(tarjeta);
            fragmento.appendChild(col);
        });

        contenedor.appendChild(fragmento);
    }

    // -------------------------------------------------------
    // CARRITO
    // -------------------------------------------------------
    const cartStore = window.NantyCart.createCartStore({ storage: localStorage });
    const cartModalEl    = document.getElementById('cartModal');
    const cartItemsEl    = document.getElementById('cart-items');
    const cartTotalEl    = document.getElementById('cart-total');
    const cartFeedbackEl = document.getElementById('cart-feedback');
    const cartButtonEl   = document.getElementById('cart-button');
    const cartCountEl    = document.getElementById('cart-count');
    const clearCartBtn   = document.getElementById('clear-cart');
    const confirmCartBtn = document.getElementById('confirm-cart');
    let carrito = {};

    function showCartFeedback(message, { error = false } = {}) {
        if (!cartFeedbackEl) return;

        cartFeedbackEl.textContent = message;
        cartFeedbackEl.classList.remove('d-none', 'alert-info', 'alert-warning', 'alert-danger');
        cartFeedbackEl.classList.add(error ? 'alert-danger' : 'alert-warning');
        cartFeedbackEl.setAttribute('role', error ? 'alert' : 'status');
        cartFeedbackEl.setAttribute('aria-live', error ? 'assertive' : 'polite');
    }

    function clearCartFeedback() {
        if (!cartFeedbackEl) return;
        cartFeedbackEl.textContent = '';
        cartFeedbackEl.classList.add('d-none');
        cartFeedbackEl.setAttribute('role', 'status');
        cartFeedbackEl.setAttribute('aria-live', 'polite');
    }

    function showStorageError() {
        showCartFeedback('El carrito no pudo guardarse. Intenta nuevamente.', { error: true });
    }

    function loadCart() {
        carrito = cartStore.load();
        updateCartBadge();
        if (!cartStore.getLastOperation().ok) showStorageError();
    }

    function updateCartBadge() {
        const totalItems = Object.values(carrito).reduce((s, it) => s + (it.qty || 0), 0);
        if (cartCountEl) cartCountEl.textContent = totalItems;
        if (cartButtonEl) {
            const itemLabel = totalItems === 1 ? 'artículo' : 'artículos';
            cartButtonEl.setAttribute('aria-label', `Ver carrito, ${totalItems} ${itemLabel}`);
        }
        updateCartActions();
    }

    function updateCartActions() {
        const isEmpty = Object.keys(carrito).length === 0;
        if (clearCartBtn) clearCartBtn.disabled = isEmpty;
        if (confirmCartBtn) confirmCartBtn.disabled = isEmpty;
    }

    function addToCart(product) {
        const latestProduct = misProductos.find(
            currentProduct => String(currentProduct.id) === String(product?.id)
        );
        if (!latestProduct || !isCatalogProductAvailable(latestProduct)) {
            showCatalogActionFeedback('Este producto se actualizó y ya no puede agregarse al carrito.');
            return null;
        }

        product = latestProduct;
        const precio = window.NantyCart.getEffectivePrice(product);
        if (precio === null) return null;

        const nombre = product.data || product.nombre || product.name || 'Producto';
        const { imgUrl: img } = getProductData(product);

        const item = cartStore.add({ id: product.id, nombre, precio, img });
        if (!item) {
            if (cartStore.getLastOperation().code === 'storage-write'
                || cartStore.getLastOperation().code === 'storage-read') {
                showStorageError();
            }
            return null;
        }

        carrito = cartStore.getCart();
        clearCatalogActionFeedback();
        clearCartFeedback();
        updateCartBadge();
        renderCartItems();
        updateAddButtonForProduct(item.id);
        return item;
    }

    function changeQty(id, qty, { focusAction = 'decrease' } = {}) {
        id = String(id);
        if (!cartStore.getItem(id)) return;

        const previousEntries = Object.values(carrito);
        const previousIndex = previousEntries.findIndex(item => String(item.id) === id);
        const adjacentItem = qty <= 0
            ? previousEntries[previousIndex + 1] || previousEntries[previousIndex - 1] || null
            : null;

        cartStore.changeQty(id, qty);
        if (!cartStore.getLastOperation().ok) {
            showStorageError();
            return;
        }

        carrito = cartStore.getCart();
        clearCartFeedback();
        updateCartBadge();
        renderCartItems({
            focusTarget: qty > 0
                ? { itemId: id, action: focusAction }
                : { itemId: adjacentItem?.id || null, action: 'decrease', empty: !adjacentItem }
        });
        updateVisibleProductButtons();
    }

    function updateAddButtonForProduct(id) {
        const safeId = CSS.escape(String(id));
        const card = document.querySelector(`.card[data-id="${safeId}"]`);
        if (card) {
            const btn = card.querySelector('.btn-add');
            if (btn) {
                const item = carrito[String(id)];
                btn.textContent = item ? `En carrito (${item.qty})` : 'Agregar';
            }
        }
    }

    function updateVisibleProductButtons() {
        document.querySelectorAll('.card[data-id]').forEach(card => {
            const id = card.dataset.id;
            const button = card.querySelector('.btn-add');
            const item = carrito[String(id)];
            if (button) button.textContent = item ? `En carrito (${item.qty})` : 'Agregar';
        });

        if (currentModalProduct) {
            actualizarContenidoBotonModal(carrito[String(currentModalProduct.id)]);
        }
    }

    if (cartModalEl) cartModalEl.addEventListener('show.bs.modal', () => {
        clearCartFeedback();
        loadCart();
        updateVisibleProductButtons();
        renderCartItems();
    });
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        const clearedCart = cartStore.clear();
        if (!clearedCart) {
            showStorageError();
            return;
        }

        carrito = clearedCart;
        clearCartFeedback();
        updateCartBadge();
        renderCartItems({ focusTarget: { empty: true } });
        updateVisibleProductButtons();
    });

    window.addEventListener('storage', event => {
        if (event.key !== cartStore.key) return;

        carrito = cartStore.load();
        if (!cartStore.getLastOperation().ok) {
            showStorageError();
            return;
        }

        clearCartFeedback();
        updateCartBadge();
        updateVisibleProductButtons();
        renderCartItems();
    });

    function formatPriceForDisplay(p) {
        return Number.isFinite(p) && p >= 0 ? currencyFormatter.format(p) : '';
    }

    function restoreCartFocus(focusTarget) {
        if (!focusTarget) return;

        let target = null;
        if (focusTarget.itemId) {
            const safeId = CSS.escape(String(focusTarget.itemId));
            const safeAction = CSS.escape(focusTarget.action || 'decrease');
            target = cartItemsEl.querySelector(
                `[data-cart-item-id="${safeId}"] [data-cart-action="${safeAction}"]`
            ) || cartItemsEl.querySelector(`[data-cart-item-id="${safeId}"] button`);
        }

        if (!target && focusTarget.empty) {
            target = document.getElementById('cart-empty-title');
        }

        (target || confirmCartBtn || clearCartBtn)?.focus();
    }

    function renderCartItems({ focusTarget = null } = {}) {
        if (!cartItemsEl) return;
        cartItemsEl.replaceChildren();
        const entries = Object.values(carrito);
        let total = 0;

        if (entries.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="cart-empty">
                    <span class="cart-empty-icon" aria-hidden="true">🛍️</span>
                    <p id="cart-empty-title" class="cart-empty-title" tabindex="-1">Tu carrito está vacío</p>
                    <p class="cart-empty-copy">Agrega tus productos favoritos para comenzar.</p>
                </div>`;
            if (cartTotalEl) cartTotalEl.textContent = formatPriceForDisplay(0);
            updateCartActions();
            restoreCartFocus(focusTarget);
            return;
        }

        entries.forEach((item, index) => {
            const row = document.createElement('div');
            row.className = 'cart-item';
            row.dataset.cartItemId = String(item.id);
            row.setAttribute('role', 'group');

            const img = document.createElement('img');
            img.src = resolveProductImageUrl(item.img)
                || 'https://placehold.co/300x300/f8f0ed/e67e9f?text=Sin+Imagen';
            img.alt = '';
            img.loading = 'lazy';
            img.decoding = 'async';

            const info = document.createElement('div');
            info.className = 'cart-item-info';

            const name = document.createElement('div');
            name.className = 'cart-item-name';
            name.id = `cart-item-name-${index}`;
            name.textContent = item.nombre;
            row.setAttribute('aria-labelledby', name.id);

            const price = document.createElement('div');
            price.className = 'cart-item-price';
            price.textContent = `${formatPriceForDisplay(item.precio)} c/u`;

            const lineSubtotal = Number.isFinite(item.precio) && Number.isFinite(item.qty)
                ? item.precio * item.qty
                : 0;
            const subtotal = document.createElement('div');
            subtotal.className = 'cart-item-subtotal';
            subtotal.textContent = `Subtotal: ${formatPriceForDisplay(lineSubtotal)}`;

            info.appendChild(name);
            info.appendChild(price);
            info.appendChild(subtotal);

            const actions = document.createElement('div');
            actions.className = 'cart-item-actions';

            const qtyControls = document.createElement('div');
            qtyControls.className = 'cart-qty-controls';
            qtyControls.setAttribute('role', 'group');
            qtyControls.setAttribute('aria-label', `Cantidad de ${item.nombre}`);

            const decreaseBtn = document.createElement('button');
            decreaseBtn.type = 'button';
            decreaseBtn.className = 'btn-qty';
            decreaseBtn.dataset.cartAction = 'decrease';
            decreaseBtn.textContent = '−';
            decreaseBtn.setAttribute('aria-label', `Disminuir cantidad de ${item.nombre}`);
            decreaseBtn.addEventListener('click', () => {
                changeQty(item.id, item.qty - 1, { focusAction: 'decrease' });
            });

            const qtyNumber = document.createElement('span');
            qtyNumber.className = 'qty-number';
            const qtyLabel = document.createElement('span');
            qtyLabel.className = 'visually-hidden';
            qtyLabel.textContent = 'Cantidad: ';
            qtyNumber.appendChild(qtyLabel);
            qtyNumber.appendChild(document.createTextNode(String(item.qty)));

            const increaseBtn = document.createElement('button');
            increaseBtn.type = 'button';
            increaseBtn.className = 'btn-qty';
            increaseBtn.dataset.cartAction = 'increase';
            increaseBtn.textContent = '+';
            increaseBtn.setAttribute('aria-label', `Aumentar cantidad de ${item.nombre}`);
            increaseBtn.addEventListener('click', () => {
                changeQty(item.id, item.qty + 1, { focusAction: 'increase' });
            });

            const removeBtn = document.createElement('button');
            removeBtn.type = 'button';
            removeBtn.className = 'cart-remove';
            removeBtn.dataset.cartAction = 'remove';
            removeBtn.textContent = 'Eliminar';
            removeBtn.setAttribute('aria-label', `Eliminar ${item.nombre}`);
            removeBtn.addEventListener('click', () => {
                changeQty(item.id, 0, { focusAction: 'remove' });
            });

            qtyControls.appendChild(decreaseBtn);
            qtyControls.appendChild(qtyNumber);
            qtyControls.appendChild(increaseBtn);

            actions.appendChild(qtyControls);
            actions.appendChild(removeBtn);

            row.appendChild(img);
            row.appendChild(info);
            row.appendChild(actions);
            cartItemsEl.appendChild(row);
            total += lineSubtotal;
        });

        if (cartTotalEl) cartTotalEl.textContent = formatPriceForDisplay(total);
        updateCartActions();
        restoreCartFocus(focusTarget);
    }

    window.miChangeQty = changeQty;

    if (confirmCartBtn) confirmCartBtn.addEventListener('click', () => {
        carrito = cartStore.load();
        if (!cartStore.getLastOperation().ok) {
            showStorageError();
            return;
        }

        updateCartBadge();
        updateVisibleProductButtons();
        renderCartItems();
        if (Object.keys(carrito).length === 0) return;
        if (!Array.isArray(misProductos) || misProductos.length === 0) {
            showCartFeedback('No pudimos validar el catálogo actual. Intenta nuevamente.', { error: true });
            return;
        }

        const reconciliation = cartStore.reconcile(misProductos);
        if (!reconciliation.ok || !reconciliation.persisted) {
            showStorageError();
            return;
        }

        carrito = cartStore.getCart();
        updateCartBadge();
        updateVisibleProductButtons();
        renderCartItems();

        if (reconciliation.requiresReview) {
            const messages = [];
            if (reconciliation.removed.length > 0) {
                messages.push('Uno o más productos ya no están disponibles y fueron retirados.');
            }
            if (reconciliation.priceChanged.length > 0) {
                messages.push('Algunos productos o precios fueron actualizados. Revisa tu carrito antes de confirmar.');
            }
            showCartFeedback(messages.join(' '));
            return;
        }

        const entries = Object.values(carrito);
        if (entries.length === 0) return;

        clearCartFeedback();
        let lines = ['*Nuevo Pedido Nanty Nails 💅*'];
        let total = 0;
        entries.forEach(i => {
            lines.push(`• ${i.qty} x ${i.nombre} (${formatPriceForDisplay(i.precio)})`);
            if (Number.isFinite(i.precio) && Number.isFinite(i.qty)) {
                total += i.precio * i.qty;
            }
        });
        lines.push(`\n*Total estimado: ${formatPriceForDisplay(total)}*`);
        const shopConfig = window.NantyShopConfig;
        if (!shopConfig || typeof shopConfig.createWhatsAppUrl !== 'function') {
            showCartFeedback('No pudimos preparar el pedido. Intenta nuevamente.', { error: true });
            return;
        }

        let whatsappWindow = null;
        try {
            whatsappWindow = window.open(shopConfig.createWhatsAppUrl(lines.join('\n')), '_blank');
        } catch (error) {
            whatsappWindow = null;
        }

        if (!whatsappWindow) {
            showCartFeedback(
                'No pudimos abrir WhatsApp. Permite las ventanas emergentes e inténtalo nuevamente.',
                { error: true }
            );
            return;
        }

        // Conservamos el valor retornado para detectar bloqueos y cortamos la
        // referencia inversa inmediatamente, sin usar features que devuelven null.
        try {
            whatsappWindow.opener = null;
        } catch (error) {
            // Algunos navegadores aíslan la nueva ventana antes de esta asignación.
        }
    });

    // -------------------------------------------------------
    // BUSCADOR Y ORDENADO
    // -------------------------------------------------------
    const inputBuscador = document.getElementById('buscador');
    if (inputBuscador) {
        inputBuscador.addEventListener('input', (e) => {
            searchText = normalizeSearchText(e.target.value);
            applyFilters();
        });
        inputBuscador.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchText = normalizeSearchText(e.target.value);
                applyFilters();
                inputBuscador.blur();
            }
        });
        inputBuscador.addEventListener('blur', (e) => {
            searchText = normalizeSearchText(e.target.value);
            applyFilters();
        });
    }

    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            selectedSort = e.target.value;
            applyFilters();
        });
    }

    // -------------------------------------------------------
    // LIKES
    // -------------------------------------------------------
    const LIKES_KEY = 'miLikesNanty_v2';
    const LIKED_FLAGS_KEY = 'miLikedFlagsNanty_v2';
    let likesMap = {};
    let likedFlags = {};

    function loadLikes() {
        try { likesMap = JSON.parse(localStorage.getItem(LIKES_KEY)) || {}; } catch (e) {}
        try { likedFlags = JSON.parse(localStorage.getItem(LIKED_FLAGS_KEY)) || {}; } catch (e) {}
    }

    window.getLikes   = (id) => likesMap[String(id)] || 0;
    window.hasLiked   = (id) => !!likedFlags[String(id)];
    window.miToggleLike = (id) => {
        id = String(id);
        if (likedFlags[id]) {
            likesMap[id] = Math.max(0, (likesMap[id] || 1) - 1);
            delete likedFlags[id];
        } else {
            likesMap[id] = (likesMap[id] || 0) + 1;
            likedFlags[id] = true;
        }
        localStorage.setItem(LIKES_KEY, JSON.stringify(likesMap));
        localStorage.setItem(LIKED_FLAGS_KEY, JSON.stringify(likedFlags));
        applyFilters({ resetLimit: false, announceResults: false });
        requestAnimationFrame(() => {
            const card = Array.from(document.querySelectorAll('#grid-productos .card'))
                .find(productCard => String(productCard.dataset.id) === id);
            card?.querySelector('.btn-like')?.focus();
        });
    };

    // -------------------------------------------------------
    // SINCRONIZACIÓN CON GOOGLE SHEETS
    // -------------------------------------------------------
    // datos.js dispara este evento cada vez que trae datos nuevos
    // (ya sea del Sheet o del respaldo local si el Sheet falla).
    // Aquí "refrescamos" la tienda con los datos más recientes,
    // sin necesidad de recargar la página.
    document.addEventListener('productosActualizados', (e) => {
        misProductos = e.detail;

        // Normalizar categorías con los datos nuevos
        misProductos.forEach(p => {
            catalogSearchIndex.delete(p);
            try {
                const slug = extractCategorySlug(p);
                if (slug && slug !== 'sin-categoria') p.category = slug;
            } catch (e) {}
            Object.keys(p).forEach(k => { if (/^category-link/i.test(k)) delete p[k]; });
            if (p.image2) delete p.image2;
        });

        // Reconstruir el mapa únicamente con productos disponibles
        rebuildCategoriesMap();

        // Volver a filtrar/ordenar y repintar la tienda con los datos actualizados
        applyFilters({ resetLimit: false });

        if (imageModalEl && imageModalEl.classList.contains('show') && currentModalProduct) {
            const activeProductId = String(currentModalProduct.id);
            const updatedModalIndex = filteredAndSorted.findIndex(
                product => String(product.id) === activeProductId
            );

            if (updatedModalIndex === -1) {
                getBsImageModal().hide();
            } else {
                loadModalImage(filteredAndSorted[updatedModalIndex], updatedModalIndex);
            }
        }
    });

    // -------------------------------------------------------
    // INICIALIZACIÓN
    // -------------------------------------------------------
    loadCart();
    renderCartItems();
    loadLikes();
    applyFilters();
});
