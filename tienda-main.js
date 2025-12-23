document.addEventListener('DOMContentLoaded', () => {

    // 1. Verificamos si datos.js cargó correctamente
    if (typeof misProductos === 'undefined') {
        alert("⚠️ ERROR: No encuentro la variable 'misProductos'. Revisa que hayas guardado bien el archivo datos.js");
        return;
    }

    console.log("✅ Datos cargados correctamente:", misProductos.length, "productos.");

    // Estado de filtros
    let activeCategory = '';
    let searchText = '';

    // 2. Configuración de paginación / orden
    const itemsPerPage = 24;
    let currentLimit = itemsPerPage;
    let currentPage = 1;
    let selectedSort = '';
    let filteredAndSorted = misProductos.slice();

    // 3. Generar controles de categorías
    const categoriesContainer = document.getElementById('categories');

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

    misProductos.forEach((p, i) => { if (typeof p._id === 'undefined') p._id = i; });

    misProductos.forEach(p => {
        try {
            const slug = extractCategorySlug(p);
            if (slug && slug !== 'sin-categoria') p.category = slug;
        } catch (e) { }
        Object.keys(p).forEach(k => { if (/^category-link/i.test(k)) delete p[k]; });
        if (p.image2) delete p.image2;
    });

    const categoriesMap = {};
    misProductos.forEach(p => {
        const s = extractCategorySlug(p);
        categoriesMap[s] = (categoriesMap[s] || 0) + 1;
    });

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

    function parsePrice(val) {
        if (!val) return 0;
        const s = String(val).replace(/[^0-9.,-]/g, '').replace(',', '.');
        const n = parseFloat(s);
        return isNaN(n) ? 0 : n;
    }

    function sortList(list, sortVal) {
        const copy = list.slice();
        if (!sortVal) return copy;
        if (sortVal === 'price-asc') {
            copy.sort((a, b) => parsePrice(a.data2 || a.price || '') - parsePrice(b.data2 || b.price || ''));
        } else if (sortVal === 'price-desc') {
            copy.sort((a, b) => parsePrice(b.data2 || b.price || '') - parsePrice(a.data2 || a.price || ''));
        } else if (sortVal === 'name-asc') {
            copy.sort((a, b) => {
                const nameA = (a.data || a.nombre || '').toString().toLowerCase();
                const nameB = (b.data || b.nombre || '').toString().toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (sortVal === 'name-desc') {
            copy.sort((a, b) => {
                const nameA = (a.data || a.nombre || '').toString().toLowerCase();
                const nameB = (b.data || b.nombre || '').toString().toLowerCase();
                return nameB.localeCompare(nameA);
            });
        }
        return copy;
    }

    function applyFilters() {
        const filtrados = misProductos.filter(producto => {
            const textoOK = searchText === '' || JSON.stringify(producto).toLowerCase().includes(searchText);
            if (!textoOK) return false;
            if (!activeCategory) return true;
            const slug = extractCategorySlug(producto);
            return slug === activeCategory;
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
            renderizarProductos(slice);
            renderPaginationControls(totalPages, currentPage);
            if (loadingEl) loadingEl.hidden = true;
        } else {
            const slice = filteredAndSorted.slice(0, currentLimit);
            renderizarProductos(slice);
            if (loadingEl) {
                loadingEl.hidden = (currentLimit >= total);
                loadingEl.textContent = 'Desplázate para cargar más...';
            }
            if (paginationContainer) paginationContainer.hidden = true;
        }
    }

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

        ul.appendChild(makePageItem('Anterior', Math.max(1, page - 1), page <= 1));
        const maxButtons = 5;
        let start = Math.max(1, page - 2);
        let end = Math.min(totalPages, start + maxButtons - 1);
        if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

        for (let p = start; p <= end; p++) {
            ul.appendChild(makePageItem(String(p), p, false, p === page));
        }

        ul.appendChild(makePageItem('Siguiente', Math.min(totalPages, page + 1), page >= totalPages));
        paginationContainer.appendChild(ul);
    }

    // ------------------ FUNCION PARA AMPLIAR IMAGEN ------------------
    function ampliarImagen(url, titulo) {
        const modalImg = document.getElementById('modalImage');
        const modalTitle = document.getElementById('modalTitle');
        const modalEl = document.getElementById('imageModal');

        if (modalImg && modalTitle && modalEl) {
            modalImg.src = url;
            modalTitle.textContent = titulo;
            const zoomModal = new bootstrap.Modal(modalEl);
            zoomModal.show();
        }
    }

    // ------------------ Renderizado de productos ------------------
    function renderizarProductos(lista) {
        const contenedor = document.getElementById('grid-productos');
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<p class="text-center w-100 py-5">No se encontraron productos 😢</p>';
            return;
        }

        const fragmento = document.createDocumentFragment();

        lista.forEach(prod => {
            const llaves = Object.keys(prod);
            const keyNombre = llaves.find(k => /(^data\b|nom|name|titul|title|producto|descripcion)/i.test(k)) || llaves[0];
            const keyPrecio = llaves.find(k => /(^data2\b|precio|price|cost|valor)/i.test(k)) || llaves[1];

            let keyImg = llaves.find(k => /(image|img|src|url|foto|link)/i.test(k) && typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]));
            if (!keyImg) {
                keyImg = llaves.find(k => typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]) && /\.(jpg|png|webp|jpeg)/i.test(prod[k]));
            }

            const nombre = prod[keyNombre] || 'Producto sin nombre';
            const precio = prod[keyPrecio] || '';
            const imgUrl = prod[keyImg] || prod.image || '';

            const col = document.createElement('div');
            col.className = 'col-6 col-md-4 col-lg-3';

            const tarjeta = document.createElement('div');
            tarjeta.className = 'card h-100';
            tarjeta.dataset.id = prod._id;

            const imgContainer = document.createElement('div');
            imgContainer.className = 'card-img-container';

            const imgEl = document.createElement('img');
            imgEl.className = 'card-img';
            imgEl.alt = nombre;
            imgEl.src = imgUrl;
            imgEl.loading = 'lazy';
            imgEl.style.cursor = 'zoom-in';

            // EVENTO: Clic en imagen para zoom
            imgEl.addEventListener('click', () => ampliarImagen(imgEl.src, nombre));

            imgEl.onload = () => { imgEl.classList.add('visible'); };
            imgEl.onerror = () => { imgEl.src = 'https://via.placeholder.com/300x300?text=Sin+Imagen'; imgEl.classList.add('visible'); };

            imgContainer.appendChild(imgEl);

            const cuerpo = document.createElement('div');
            cuerpo.className = 'card-body';

            const h3 = document.createElement('h3');
            h3.className = 'card-title';
            h3.textContent = nombre;

            const divPrice = document.createElement('div');
            divPrice.className = 'card-price';
            divPrice.textContent = precio;

            const likeBtn = document.createElement('button');
            likeBtn.className = 'btn-like';
            likeBtn.type = 'button';
            const lr = (window.getLikes) ? window.getLikes(prod._id) : 0;
            likeBtn.innerHTML = `❤ ${lr}`;
            if (window.hasLiked && window.hasLiked(prod._id)) likeBtn.classList.add('liked');
            likeBtn.addEventListener('click', (e) => { e.stopPropagation(); if (window.miToggleLike) window.miToggleLike(prod._id); });

            const btnAdd = document.createElement('button');
            btnAdd.className = 'btn-add';
            btnAdd.type = 'button';
            const inCart = carrito[String(prod._id)];
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

    // --- LOGICA DEL CARRITO ---
    const CART_KEY = 'miCarritoNanty_v1';
    let carrito = {};

    function loadCart() {
        try {
            const raw = localStorage.getItem(CART_KEY);
            carrito = raw ? JSON.parse(raw) : {};
        } catch (e) { carrito = {}; }
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
        const id = String(product._id);
        const keys = Object.keys(product);
        const nombre = product.data || product.nombre || product.name || 'Producto';
        const precioRaw = product.data2 || product.price || '';
        const imgKey = keys.find(k => /image|img|src/i.test(k));
        const img = product[imgKey] || '';

        if (!carrito[id]) carrito[id] = { id, nombre, precioRaw, qty: 0, img };
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

    const cartModalEl = document.getElementById('cartModal');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const confirmCartBtn = document.getElementById('confirm-cart');

    if (cartModalEl) {
        cartModalEl.addEventListener('show.bs.modal', renderCartItems);
    }

    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        carrito = {};
        saveCart();
        renderCartItems();
        applyFilters(); // Para refrescar botones de "Agregar"
    });

    function formatPriceForDisplay(p) {
        const n = parsePrice(p);
        return isNaN(n) ? p || '' : `$${n.toFixed(2)}`;
    }

    function renderCartItems() {
        if (!cartItemsEl) return;
        cartItemsEl.innerHTML = '';
        const entries = Object.values(carrito);
        let total = 0;
        if (entries.length === 0) {
            cartItemsEl.innerHTML = '<p class="text-center">Tu carrito está vacío.</p>';
            if (cartTotalEl) cartTotalEl.textContent = '$0.00';
            return;
        }
        entries.forEach(item => {
            const row = document.createElement('div');
            row.className = 'cart-item d-flex gap-2 align-items-center mb-3 border-bottom pb-2';
            row.innerHTML = `
                <img src="${item.img}" style="width:50px; height:50px; object-fit:cover; border-radius:5px;">
                <div class="flex-fill">
                    <div class="small fw-bold">${item.nombre}</div>
                    <div class="small text-primary">${formatPriceForDisplay(item.precioRaw)}</div>
                </div>
                <div class="d-flex align-items-center gap-2">
                    <button class="btn btn-sm btn-outline-secondary" onclick="window.miChangeQty('${item.id}', ${item.qty - 1})">-</button>
                    <span>${item.qty}</span>
                    <button class="btn btn-sm btn-outline-secondary" onclick="window.miChangeQty('${item.id}', ${item.qty + 1})">+</button>
                </div>
            `;
            cartItemsEl.appendChild(row);
            total += parsePrice(item.precioRaw) * item.qty;
        });
        if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
    }

    window.miChangeQty = changeQty;

    if (confirmCartBtn) confirmCartBtn.addEventListener('click', () => {
        const entries = Object.values(carrito);
        if (entries.length === 0) return;
        let lines = ['*Nuevo Pedido Nanty Nails:*'];
        let total = 0;
        entries.forEach(i => {
            lines.push(`- ${i.qty} x ${i.nombre} (${formatPriceForDisplay(i.precioRaw)})`);
            total += parsePrice(i.precioRaw) * i.qty;
        });
        lines.push(`*Total: $${total.toFixed(2)}*`);
        const wa = localStorage.getItem('waNumber') || '5614782629';
        window.open(`https://wa.me/${wa}?text=${encodeURIComponent(lines.join('\n'))}`, '_blank');
    });

    // --- BUSCADOR Y ORDEN ---
    const inputBuscador = document.getElementById('buscador');
    if (inputBuscador) {
        inputBuscador.addEventListener('input', (e) => {
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

    // --- LIKES ---
    const LIKES_KEY = 'miLikesNanty_v1';
    let likesMap = {};
    let likedFlags = {};

    function loadLikes() {
        try { likesMap = JSON.parse(localStorage.getItem(LIKES_KEY)) || {}; } catch (e) { }
        try { likedFlags = JSON.parse(localStorage.getItem('likedFlags')) || {}; } catch (e) { }
    }
    window.getLikes = (id) => likesMap[String(id)] || 0;
    window.hasLiked = (id) => !!likedFlags[String(id)];
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
        localStorage.setItem('likedFlags', JSON.stringify(likedFlags));
        applyFilters();
    };

    // Inicialización
    loadCart();
    loadLikes();
    applyFilters();
});
