document.addEventListener('DOMContentLoaded', () => {

    if (typeof misProductos === 'undefined') {
        alert("⚠️ ERROR: No encuentro 'misProductos'. Revisa que hayas guardado bien datos.js");
        return;
    }

    console.log("✅ Datos cargados:", misProductos.length, "productos.");

    let activeCategory = '';
    let searchText = '';
    const itemsPerPage = 24;
    let currentLimit = itemsPerPage;
    let currentPage = 1;
    let selectedSort = '';
    let filteredAndSorted = misProductos.slice();

    // Lista actual visible para la navegación del modal
    let currentVisibleList = [];
    let currentModalIndex = -1;
    let currentModalProduct = null;

    const categoriesContainer = document.getElementById('categories');

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
    misProductos.forEach(p => {
        const s = extractCategorySlug(p);
        categoriesMap[s] = (categoriesMap[s] || 0) + 1;
    });

    // -------------------------------------------------------
    // RENDER CATEGORÍAS
    // -------------------------------------------------------
    function renderCategoryButtons() {
        if (!categoriesContainer) return;
        categoriesContainer.innerHTML = '';

        const allBtn = document.createElement('button');
        allBtn.className = 'category-btn' + (activeCategory === '' ? ' active' : '');
        allBtn.textContent = `Todas (${misProductos.length})`;
        allBtn.addEventListener('click', () => { activeCategory = ''; applyFilters(); });
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
            btn.className = 'category-btn' + (activeCategory === slug ? ' active' : '');
            btn.textContent = `${prettyNameFromSlug(slug)} (${categoriesMap[slug]})`;
            btn.dataset.slug = slug;
            btn.addEventListener('click', () => { activeCategory = slug; applyFilters(); });
            categoriesContainer.appendChild(btn);
        });

        const hiddenContainer = document.createElement('div');
        hiddenContainer.className = 'more-categories d-none';

        otherSlugs.sort((a, b) => prettyNameFromSlug(a).localeCompare(prettyNameFromSlug(b))).forEach(slug => {
            const btn = document.createElement('button');
            btn.className = 'category-btn' + (activeCategory === slug ? ' active' : '');
            btn.textContent = `${prettyNameFromSlug(slug)} (${categoriesMap[slug]})`;
            btn.dataset.slug = slug;
            btn.addEventListener('click', () => { activeCategory = slug; applyFilters(); });
            hiddenContainer.appendChild(btn);
        });

        categoriesContainer.appendChild(hiddenContainer);

        if (otherSlugs.length > 0) {
            const toggleBtn = document.createElement('button');
            toggleBtn.className = 'category-btn more-toggle';
            toggleBtn.textContent = 'Más categorías';
            let expanded = false;
            toggleBtn.addEventListener('click', () => {
                expanded = !expanded;
                hiddenContainer.classList.toggle('d-none', !expanded);
                toggleBtn.textContent = expanded ? 'Ocultar' : 'Más categorías';
            });
            categoriesContainer.appendChild(toggleBtn);
        }
    }

    const sortSelect = document.getElementById('sort');
    const loadingEl = document.getElementById('loading');
    const paginationContainer = document.getElementById('pagination');

    // -------------------------------------------------------
    // ORDENADO Y FILTRADO
    // -------------------------------------------------------
    function parsePrice(val) {
        if (typeof val === 'number') {
            return Number.isFinite(val) && val >= 0 ? val : null;
        }

        if (typeof val !== 'string') return null;

        const text = val.trim();
        if (!text) return null;

        const validFormat = /^\$?(?:\d+|\d{1,3}(?:,\d{3})+)(?:\.\d+)?$/;
        if (!validFormat.test(text)) return null;

        const number = Number(text.replace(/^\$/, '').replace(/,/g, ''));
        return Number.isFinite(number) && number >= 0 ? number : null;
    }

    const currencyFormatter = new Intl.NumberFormat("es-MX", {
        style: "currency",
        currency: "MXN"
    });

    function sortList(list, sortVal) {
        const copy = list.slice();
        if (!sortVal) return copy;
        if (sortVal === 'price-asc' || sortVal === 'price-desc') {
            copy.sort((a, b) => {
                const priceA = a.data2;
                const priceB = b.data2;

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

    function applyFilters() {
        const filtrados = misProductos.filter(producto => {
            const textoOK = searchText === '' || JSON.stringify(producto).toLowerCase().includes(searchText);
            if (!textoOK) return false;
            if (!activeCategory) return true;
            return extractCategorySlug(producto) === activeCategory;
        });

        filteredAndSorted = sortList(filtrados, selectedSort);
        currentPage = 1;
        currentLimit = itemsPerPage;
        renderPaginated();
        renderCategoryButtons();
    }

    function renderPaginated() {
        const total = filteredAndSorted.length;
        const isAllCategory = activeCategory === '';
        if (isAllCategory) {
            const totalPages = Math.max(1, Math.ceil(total / itemsPerPage));
            const start = (currentPage - 1) * itemsPerPage;
            const slice = filteredAndSorted.slice(start, start + itemsPerPage);
            currentVisibleList = slice;
            renderizarProductos(slice);
            renderPaginationControls(totalPages, currentPage);
            if (loadingEl) loadingEl.hidden = true;
        } else {
            const slice = filteredAndSorted.slice(0, currentLimit);
            currentVisibleList = slice;
            renderizarProductos(slice);
            if (loadingEl) {
                loadingEl.hidden = (currentLimit >= total);
                loadingEl.textContent = 'Desplázate para cargar más...';
            }
            if (paginationContainer) paginationContainer.hidden = true;
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
    const modalTitle    = document.getElementById('modalTitle');
    const modalPrice    = document.getElementById('modalPrice');
    const modalLoader   = document.getElementById('modal-loader');
    const modalAddBtn   = document.getElementById('modal-add-to-cart');
    const modalPrevBtn  = document.getElementById('modal-prev');
    const modalNextBtn  = document.getElementById('modal-next');

    // Inicializar el modal de Bootstrap de forma diferida para asegurar
    // que Bootstrap ya esté cargado cuando se use por primera vez.
    function getBsImageModal() {
        if (!imageModalEl) return null;
        return bootstrap.Modal.getOrCreateInstance(imageModalEl);
    }

    function getProductData(prod) {
        const llaves = Object.keys(prod);
        const keyNombre = llaves.find(k => /(^data\b|nom|name|titul|title|producto|descripcion)/i.test(k)) || llaves[0];
        let keyImg = llaves.find(k => /(image|img|src|url|foto|link)/i.test(k) && typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]));
        if (!keyImg) keyImg = llaves.find(k => typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]) && /\.(jpg|png|webp|jpeg)/i.test(prod[k]));
        const altProducto =
            String(prod.altTexto || '').trim()
            || String(prod.data || '').trim()
            || 'Producto';
        return {
            nombre: prod[keyNombre] || 'Producto',
            precio: prod.data2,
            imgUrl: prod[keyImg] || prod.image || '',
            altProducto
        };
    }

    function loadModalImage(prod, index) {
        if (!modalImg || !modalTitle) return;

        currentModalIndex = index;

        const { nombre, precio, imgUrl, altProducto } = getProductData(prod);

        // Mostrar loader + animar salida de imagen
        if (modalLoader) modalLoader.classList.add('visible');
        modalImg.classList.add('changing');

        // Pequeño delay para la transición
        setTimeout(() => {
            modalTitle.textContent = nombre;
            if (modalPrice) {
                modalPrice.textContent = formatPriceForDisplay(precio);
            }

            modalImg.src = imgUrl;
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
        }, 120);

        // Botón añadir al carrito desde el modal
        // Guardamos el producto activo en una variable que el listener siempre lee al momento del click
        currentModalProduct = prod;
        if (modalAddBtn) {
            const inCart = carrito[String(prod.id)];
            modalAddBtn.innerHTML = inCart
                ? `<i class="bi bi-check-lg me-1"></i> En carrito (${inCart.qty})`
                : `<i class="bi bi-bag-plus me-1"></i> Añadir al carrito`;
        }

        // Actualizar botones de navegación
        updateNavButtons();
    }

    function updateNavButtons() {
        if (modalPrevBtn) modalPrevBtn.disabled = currentModalIndex <= 0;
        if (modalNextBtn) modalNextBtn.disabled = currentModalIndex >= currentVisibleList.length - 1;
    }

    function ampliarImagen(prod, index) {
        if (!imageModalEl) return;
        loadModalImage(prod, index);
        getBsImageModal().show();
    }

    // Listener único para el botón de añadir en el modal
    // Usa siempre currentModalProduct que se actualiza en loadModalImage
    if (modalAddBtn) {
        modalAddBtn.addEventListener('click', () => {
            if (!currentModalProduct) return;
            addToCart(currentModalProduct);
            const item = carrito[String(currentModalProduct.id)];
            modalAddBtn.innerHTML = item
                ? `<i class="bi bi-check-lg me-1"></i> En carrito (${item.qty})`
                : `<i class="bi bi-bag-plus me-1"></i> Añadir al carrito`;
        });
    }

    // Navegación con flechas
    if (modalPrevBtn) {
        modalPrevBtn.addEventListener('click', () => {
            if (currentModalIndex > 0) {
                loadModalImage(currentVisibleList[currentModalIndex - 1], currentModalIndex - 1);
            }
        });
    }
    if (modalNextBtn) {
        modalNextBtn.addEventListener('click', () => {
            if (currentModalIndex < currentVisibleList.length - 1) {
                loadModalImage(currentVisibleList[currentModalIndex + 1], currentModalIndex + 1);
            }
        });
    }

    // Navegación con teclado (←→) cuando el modal está abierto
    if (imageModalEl) {
        imageModalEl.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowLeft' && currentModalIndex > 0) {
                loadModalImage(currentVisibleList[currentModalIndex - 1], currentModalIndex - 1);
            } else if (e.key === 'ArrowRight' && currentModalIndex < currentVisibleList.length - 1) {
                loadModalImage(currentVisibleList[currentModalIndex + 1], currentModalIndex + 1);
            }
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

        lista.forEach((prod, listIndex) => {
            const { nombre, precio, imgUrl, altProducto } = getProductData(prod);

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';

            const tarjeta = document.createElement('div');
            tarjeta.className = 'card h-100';
            tarjeta.dataset.id = prod.id;

            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';
            imgContainer.title = 'Clic para ampliar';

            const imgEl = document.createElement('img');
            imgEl.className = 'card-img';
            imgEl.alt = altProducto;
            imgEl.src = imgUrl;
            imgEl.loading = 'lazy';

            imgEl.addEventListener('click', () => ampliarImagen(prod, listIndex));
            imgContainer.addEventListener('click', () => ampliarImagen(prod, listIndex));

            imgEl.onload = () => { imgEl.classList.add('visible'); };
            imgEl.onerror = () => {
                imgEl.src = 'https://placehold.co/300x300/f8f0ed/e67e9f?text=Sin+Imagen';
                imgEl.classList.add('visible');
            };

            imgContainer.appendChild(imgEl);

            const cuerpo = document.createElement('div');
            cuerpo.className = 'card-body';

            const h3 = document.createElement('h3');
            h3.className = 'card-title';
            h3.textContent = nombre;

            const divPrice = document.createElement('div');
            divPrice.className = 'card-price';
            divPrice.textContent = formatPriceForDisplay(precio);

            const likeBtn = document.createElement('button');
            likeBtn.className = 'btn-like';
            likeBtn.type = 'button';
            const lr = (window.getLikes) ? window.getLikes(prod.id) : 0;
            likeBtn.innerHTML = `❤ ${lr}`;
            if (window.hasLiked && window.hasLiked(prod.id)) likeBtn.classList.add('liked');
            likeBtn.addEventListener('click', (e) => { e.stopPropagation(); if (window.miToggleLike) window.miToggleLike(prod.id); });

            const btnAdd = document.createElement('button');
            btnAdd.className = 'btn-add';
            btnAdd.type = 'button';
            const inCart = carrito[String(prod.id)];
            btnAdd.textContent = inCart ? `En carrito (${inCart.qty})` : 'Agregar';
            btnAdd.addEventListener('click', (e) => { e.stopPropagation(); addToCart(prod); });

            cuerpo.appendChild(h3);
            cuerpo.appendChild(divPrice);
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
    const CART_KEY = 'miCarritoNanty_v2';
    let carrito = {};

    function loadCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            carrito = raw ? JSON.parse(raw) : {};
        } catch (e) { carrito = {}; }

        let cartUpdated = false;
        Object.values(carrito).forEach(item => {
            if (!item || typeof item !== 'object') return;

            const currentPrice = parsePrice(item.precio);
            const legacyPrice = currentPrice !== null ? currentPrice : parsePrice(item.precioRaw);

            if (item.precio !== legacyPrice || Object.prototype.hasOwnProperty.call(item, 'precioRaw')) {
                item.precio = legacyPrice;
                delete item.precioRaw;
                cartUpdated = true;
            }
        });

        if (cartUpdated) {
            try { localStorage.setItem(CART_KEY, JSON.stringify(carrito)); } catch (e) {}
        }

        updateCartBadge();
    }

    function saveCart() {
        localStorage.setItem(CART_KEY, JSON.stringify(carrito));
        updateCartBadge();
    }

    function updateCartBadge() {
        const countEl = document.getElementById('cart-count');
        const totalItems = Object.values(carrito).reduce((s, it) => s + (it.qty || 0), 0);
        if (countEl) countEl.textContent = totalItems;
    }

    function addToCart(product) {
        const id = String(product.id);
        const precio = product.data2;
        if (!Number.isFinite(precio) || precio < 0) return;

        const llaves = Object.keys(product);
        const nombre = product.data || product.nombre || product.name || 'Producto';
        const imgKey = llaves.find(k => /image|img|src/i.test(k));
        const img = product[imgKey] || '';

        if (!carrito[id]) carrito[id] = { id, nombre, precio, qty: 0, img };
        carrito[id].qty += 1;
        saveCart();
        updateAddButtonForProduct(id);
    }

    function changeQty(id, qty) {
        id = String(id);
        if (!carrito[id]) return;
        carrito[id].qty = Math.max(0, qty);
        if (carrito[id].qty === 0) delete carrito[id];
        saveCart();
        renderCartItems();
        updateAddButtonForProduct(id);
    }

    function updateAddButtonForProduct(id) {
        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) {
            const btn = card.querySelector('.btn-add');
            if (btn) {
                const item = carrito[String(id)];
                btn.textContent = item ? `En carrito (${item.qty})` : 'Agregar';
            }
        }
    }

    const cartModalEl    = document.getElementById('cartModal');
    const cartItemsEl    = document.getElementById('cart-items');
    const cartTotalEl    = document.getElementById('cart-total');
    const clearCartBtn   = document.getElementById('clear-cart');
    const confirmCartBtn = document.getElementById('confirm-cart');

    if (cartModalEl) cartModalEl.addEventListener('show.bs.modal', renderCartItems);
    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        carrito = {};
        saveCart();
        renderCartItems();
        applyFilters();
    });

    function formatPriceForDisplay(p) {
        return Number.isFinite(p) && p >= 0 ? currencyFormatter.format(p) : '';
    }

    function renderCartItems() {
        if (!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        const entries = Object.values(carrito);
        let total = 0;

        if (entries.length === 0) {
            cartItemsEl.innerHTML = `
                <div class="cart-empty">
                    <span class="cart-empty-icon">🛍️</span>
                    <p>¡Tu carrito está vacío!<br><small>Agrega tus productos favoritos</small></p>
                </div>`;
            if (cartTotalEl) cartTotalEl.textContent = formatPriceForDisplay(0);
            return;
        }

        entries.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item d-flex gap-2 align-items-center mb-3 border-bottom pb-2';
            row.innerHTML = `
                <img src="${item.img}" alt="">
                <div class="flex-fill">
                    <div class="cart-item-name">${item.nombre}</div>
                    <div class="cart-item-price">${formatPriceForDisplay(item.precio)}</div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn-qty" onclick="window.miChangeQty('${item.id}', ${item.qty - 1})">−</button>
                    <span class="qty-number">${item.qty}</span>
                    <button class="btn-qty" onclick="window.miChangeQty('${item.id}', ${item.qty + 1})">+</button>
                </div>`;
            cartItemsEl.appendChild(row);
            if (Number.isFinite(item.precio) && Number.isFinite(item.qty)) {
                total += item.precio * item.qty;
            }
        });

        if (cartTotalEl) cartTotalEl.textContent = formatPriceForDisplay(total);
    }

    window.miChangeQty = changeQty;

    if (confirmCartBtn) confirmCartBtn.addEventListener('click', () => {
        const entries = Object.values(carrito);
        if (entries.length === 0) return;
        let lines = ['*Nuevo Pedido Nanty Nails 💅*'];
        let total = 0;
        entries.forEach(i => {
            lines.push(`• ${i.qty} x ${i.nombre} (${formatPriceForDisplay(i.precio)})`);
            if (Number.isFinite(i.precio) && Number.isFinite(i.qty)) {
                total += i.precio * i.qty;
            }
        });
        lines.push(`\n*Total estimado: ${formatPriceForDisplay(total)}*`);
        const wa = localStorage.getItem('waNumber') || '5614782629';
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    });

    // -------------------------------------------------------
    // BUSCADOR Y ORDENADO
    // -------------------------------------------------------
    const inputBuscador = document.getElementById('buscador');
    if (inputBuscador) {
        inputBuscador.addEventListener('input', (e) => {
            searchText = e.target.value.toLowerCase();
            applyFilters();
        });
        inputBuscador.addEventListener('keydown', (e) => {
            if (e.key === 'Enter') {
                searchText = e.target.value.toLowerCase();
                applyFilters();
                inputBuscador.blur();
            }
        });
        inputBuscador.addEventListener('blur', (e) => {
            searchText = e.target.value.toLowerCase();
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
        applyFilters();
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
            try {
                const slug = extractCategorySlug(p);
                if (slug && slug !== 'sin-categoria') p.category = slug;
            } catch (e) {}
            Object.keys(p).forEach(k => { if (/^category-link/i.test(k)) delete p[k]; });
            if (p.image2) delete p.image2;
        });

        // Reconstruir el mapa de categorías desde cero
        Object.keys(categoriesMap).forEach(k => delete categoriesMap[k]);
        misProductos.forEach(p => {
            const s = extractCategorySlug(p);
            categoriesMap[s] = (categoriesMap[s] || 0) + 1;
        });

        // Volver a filtrar/ordenar y repintar la tienda con los datos actualizados
        applyFilters();
    });

    // -------------------------------------------------------
    // INICIALIZACIÓN
    // -------------------------------------------------------
    loadCart();
    loadLikes();
    applyFilters();
});
