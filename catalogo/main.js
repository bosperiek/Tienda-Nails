document.addEventListener('DOMContentLoaded', () => {

    // 1. Verificamos si datos.js cargó correctamente
    if (typeof misProductos === 'undefined') {
        alert("⚠️ ERROR: No encuentro la variable 'misProductos'. Revisa que hayas guardado bien el archivo datos.js");
        return;
    }

    console.log("✅ Datos cargados correctamente:", misProductos.length, "productos.");

    // Estado de filtros
    let activeCategory = ''; // slug de la categoría seleccionada; '' = Todas
    let searchText = '';

    // 2. Configuración de paginación / orden
    const itemsPerPage = 24;
    let currentLimit = itemsPerPage;
    let currentPage = 1;
    let selectedSort = '';
    let filteredAndSorted = misProductos.slice();

    // 3. Generar controles de categorías a partir de los datos
    const categoriesContainer = document.getElementById('categories');

    // Extrae slug de categoría desde una URL tipo '/c/<slug>/...'
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
        } catch (e) { /* ignore */ }
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
                if (expanded) {
                    const first = hiddenContainer.querySelector('.category-btn');
                    if (first) first.focus();
                }
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
            copy.sort((a, b) => parsePrice(a.data2 || a.price || a['data2'] || '') - parsePrice(b.data2 || b.price || b['data2'] || ''));
        } else if (sortVal === 'price-desc') {
            copy.sort((a, b) => parsePrice(b.data2 || b.price || b['data2'] || '') - parsePrice(a.data2 || a.price || a['data2'] || ''));
        } else if (sortVal === 'name-asc') {
            copy.sort((a, b) => {
                const nameA = (a.data || a.data || Object.values(a).join(' ')).toString().toLowerCase();
                const nameB = (b.data || b.data || Object.values(b).join(' ')).toString().toLowerCase();
                return nameA.localeCompare(nameB);
            });
        } else if (sortVal === 'name-desc') {
            copy.sort((a, b) => {
                const nameA = (a.data || a.data || Object.values(a).join(' ')).toString().toLowerCase();
                const nameB = (b.data || b.data || Object.values(b).join(' ')).toString().toLowerCase();
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
                if (currentLimit < total) {
                    loadingEl.hidden = false;
                    loadingEl.textContent = 'Desplázate para cargar más...';
                } else {
                    loadingEl.hidden = true;
                }
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
        const maxButtons = 7;
        let start = Math.max(1, page - Math.floor(maxButtons / 2));
        let end = Math.min(totalPages, start + maxButtons - 1);
        if (end - start < maxButtons - 1) start = Math.max(1, end - maxButtons + 1);

        if (start > 1) {
            ul.appendChild(makePageItem('1', 1, false, page === 1));
            if (start > 2) {
                const ell = document.createElement('li'); ell.className = 'page-item disabled'; ell.innerHTML = '<span class="page-link">…</span>'; ul.appendChild(ell);
            }
        }

        for (let p = start; p <= end; p++) {
            ul.appendChild(makePageItem(String(p), p, false, p === page));
        }

        if (end < totalPages) {
            if (end < totalPages - 1) {
                const ell = document.createElement('li'); ell.className = 'page-item disabled'; ell.innerHTML = '<span class="page-link">…</span>'; ul.appendChild(ell);
            }
            ul.appendChild(makePageItem(String(totalPages), totalPages, false, page === totalPages));
        }

        ul.appendChild(makePageItem('Siguiente', Math.min(totalPages, page + 1), page >= totalPages));
        paginationContainer.appendChild(ul);
    }

    // ------------------ Renderizado de productos (ACTUALIZADO PARA WEBP) ------------------
    function renderizarProductos(lista) {
        const contenedor = document.getElementById('grid-productos');
        if (!contenedor) return;
        contenedor.innerHTML = '';

        if (lista.length === 0) {
            contenedor.innerHTML = '<p style="grid-column: 1/-1; text-align:center;">No se encontraron productos 😢</p>';
            return;
        }

        const fragmento = document.createDocumentFragment();

        lista.forEach(prod => {
            const llaves = Object.keys(prod);
            const keyNombre = llaves.find(k => /(^data\b|nom|name|titul|title|producto|descripcion)/i.test(k)) || llaves[0];
            const keyPrecio = llaves.find(k => /(^data2\b|precio|price|cost|valor)/i.test(k)) || llaves.find(k => typeof prod[k] === 'string' && /\$|\d/.test(prod[k])) || llaves[1];

            // Buscar Imagen:
            let keyImg = llaves.find(k => /(image|img|src|url|foto|link)/i.test(k) && typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]));
            if (!keyImg) {
                keyImg = llaves.find(k => typeof prod[k] === 'string' && /^https?:\/\//i.test(prod[k]) && /\.jpg|\.png|\.jpeg|\.gif|data:image/i.test(prod[k]));
            }

            const nombre = prod[keyNombre] || 'Producto sin nombre';
            const precio = prod[keyPrecio] || '';

            const placeholderSvg = encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='600' height='400'><rect width='100%' height='100%' fill='#eee'/><text x='50%' y='50%' dominant-baseline='middle' text-anchor='middle' fill='#999' font-family='Segoe UI, Tahoma, sans-serif' font-size='24'>Sin imagen</text></svg>`);
            const placeholderDataUrl = `data:image/svg+xml;utf8,${placeholderSvg}`;

            // -------------------------------------------------------
            // LÓGICA NUEVA SIMPLIFICADA: Confiar en datos.js (WebP)
            // -------------------------------------------------------
            const candidateUrls = [];

            // Obtenemos la ruta que viene en el JSON
            const imgField = (keyImg && prod[keyImg]) ? prod[keyImg] : (prod.image || '');

            if (imgField) {
                // Añadimos la ruta TAL CUAL viene (que ya debe ser .webp)
                candidateUrls.push(imgField);

                // Pequeño fallback de seguridad por si tu carpeta se llama 'images' pero el json dice 'imagenes'
                if (imgField.includes('imagenes/')) {
                    candidateUrls.push(imgField.replace('imagenes/', 'images/'));
                } else if (imgField.includes('images/')) {
                    candidateUrls.push(imgField.replace('images/', 'imagenes/'));
                }
            }

            // Añadir URLs externas como respaldo
            llaves.forEach(k => {
                const v = prod[k];
                if (typeof v === 'string' && /^https?:\/\//i.test(v) && !candidateUrls.includes(v)) {
                    candidateUrls.push(v);
                }
            });
            // -------------------------------------------------------

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
            imgEl.src = candidateUrls[0] || placeholderDataUrl;
            imgEl.loading = 'lazy';

            imgEl.onload = () => { imgEl.classList.add('visible'); };

            let attemptIndex = 0;
            imgEl.onerror = () => {
                attemptIndex += 1;
                if (candidateUrls[attemptIndex]) {
                    imgEl.src = candidateUrls[attemptIndex];
                } else {
                    imgEl.src = placeholderDataUrl;
                    imgEl.classList.add('visible');
                }
            };

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
            const lr = (window.getLikes && typeof window.getLikes === 'function') ? window.getLikes(prod._id) : 0;
            likeBtn.innerHTML = `❤ ${lr}`;
            if (window.hasLiked && typeof window.hasLiked === 'function' && window.hasLiked(prod._id)) likeBtn.classList.add('liked');
            likeBtn.addEventListener('click', () => { if (window.miToggleLike) window.miToggleLike(prod._id); });

            const btnAdd = document.createElement('button');
            btnAdd.className = 'btn-add';
            btnAdd.type = 'button';
            const currentCart = (window.miGetCart && typeof window.miGetCart === 'function') ? window.miGetCart() : {};
            const inCart = currentCart && currentCart[String(prod._id)];
            btnAdd.textContent = inCart ? `En carrito (${inCart.qty})` : 'Agregar';
            btnAdd.addEventListener('click', () => { if (window.miAddToCart) window.miAddToCart(prod); });

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

    renderCategoryButtons();

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
        const nombre = product.data || product.data || product.name || JSON.stringify(product).slice(0, 30);
        const precioRaw = product.data2 || product.price || '';
        const imgKey = Object.keys(product).find(k => /image|img|src|url|foto|link/i.test(k) && typeof product[k] === 'string');
        const img = imgKey ? product[imgKey] : '';

        if (!carrito[id]) carrito[id] = { id, nombre, precioRaw, qty: 0, img };
        carrito[id].qty += 1;
        saveCart();
        updateCartBadge();
        updateAddButtonForProduct(id);
    }

    function changeQty(id, qty) {
        id = String(id);
        if (!carrito[id]) return;
        carrito[id].qty = Math.max(0, qty);
        if (carrito[id].qty === 0) delete carrito[id];
        saveCart();
        renderCartItems();
        updateCartBadge();
        updateAddButtonForProduct(id);
    }

    function updateAddButtonForProduct(id) {
        try {
            const card = document.querySelector(`.card[data-id="${id}"]`);
            if (!card) return;
            const btn = card.querySelector('.btn-add');
            if (!btn) return;
            const item = carrito[String(id)];
            btn.textContent = item ? `En carrito (${item.qty})` : 'Agregar';
        } catch (e) { }
    }

    const cartButton = document.getElementById('cart-button');
    const cartModalEl = document.getElementById('cartModal');
    const cartItemsEl = document.getElementById('cart-items');
    const cartTotalEl = document.getElementById('cart-total');
    const clearCartBtn = document.getElementById('clear-cart');
    const confirmCartBtn = document.getElementById('confirm-cart');

    let cartModal = null;
    try {
        if (cartModalEl && window.bootstrap && typeof window.bootstrap.Modal === 'function') {
            cartModal = bootstrap.Modal.getOrCreateInstance(cartModalEl);
            cartModalEl.addEventListener('show.bs.modal', () => {
                renderCartItems();
                updateCartBadge();
            });
        }
    } catch (e) { }

    if (clearCartBtn) clearCartBtn.addEventListener('click', () => {
        carrito = {};
        saveCart();
        renderCartItems();
        if (cartModal) cartModal.hide();
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
            row.className = 'cart-item d-flex gap-2 align-items-center mb-2';

            const img = document.createElement('img');
            img.src = item.img || 'data:image/svg+xml;utf8,' + encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' width='200' height='200'><rect width='100%' height='100%' fill='#eee'/></svg>`);
            img.style.width = '64px'; img.style.height = '64px'; img.style.objectFit = 'cover'; img.style.borderRadius = '8px';

            const meta = document.createElement('div'); meta.className = 'meta flex-fill';
            const title = document.createElement('div'); title.textContent = item.nombre; title.style.fontWeight = '600';
            const price = document.createElement('div'); price.textContent = formatPriceForDisplay(item.precioRaw); price.style.color = 'var(--primary)';

            const qtyWrap = document.createElement('div'); qtyWrap.className = 'qty d-flex gap-1 align-items-center';
            const btnMinus = document.createElement('button'); btnMinus.className = 'btn btn-sm btn-outline-secondary'; btnMinus.textContent = '-';
            const spanQty = document.createElement('span'); spanQty.textContent = item.qty; spanQty.className = 'px-2';
            const btnPlus = document.createElement('button'); btnPlus.className = 'btn btn-sm btn-outline-secondary'; btnPlus.textContent = '+';

            btnMinus.addEventListener('click', () => changeQty(item.id, (item.qty || 0) - 1));
            btnPlus.addEventListener('click', () => changeQty(item.id, (item.qty || 0) + 1));

            qtyWrap.appendChild(btnMinus); qtyWrap.appendChild(spanQty); qtyWrap.appendChild(btnPlus);
            meta.appendChild(title); meta.appendChild(price);

            row.appendChild(img); row.appendChild(meta); row.appendChild(qtyWrap);
            cartItemsEl.appendChild(row);

            total += parsePrice(item.precioRaw) * (item.qty || 0);
        });
        if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
    }

    function getWaNumber() {
        try {
            const n = localStorage.getItem('waNumber');
            if (n && n.trim()) return n.trim();
        } catch (e) { }
        return '5614782629';
    }

    if (confirmCartBtn) confirmCartBtn.addEventListener('click', () => {
        const entries = Object.values(carrito);
        if (entries.length === 0) return alert('El carrito está vacío.');
        let total = 0;
        let lines = ['Hola, estoy interesada en estos productos:'];
        entries.forEach(i => {
            const subtotal = parsePrice(i.precioRaw) * i.qty;
            lines.push(`- ${i.qty} x ${i.nombre} (${formatPriceForDisplay(i.precioRaw)})`);
            total += subtotal;
        });
        lines.push(`Total aproximado: $${total.toFixed(2)}`);
        const text = encodeURIComponent(lines.join('\n'));
        const waNumber = getWaNumber();
        const url = `https://wa.me/${waNumber}?text=${text}`;
        window.open(url, '_blank');
    });

    loadCart();

    const LIKES_KEY = 'miLikesNanty_v1';
    const LIKES_FLAGS = 'miLikedFlagsNanty_v1';
    let likesMap = {};
    let likedFlags = {};

    function loadLikes() {
        try { likesMap = JSON.parse(localStorage.getItem(LIKES_KEY)) || {}; } catch (e) { likesMap = {}; }
        try { likedFlags = JSON.parse(localStorage.getItem(LIKES_FLAGS)) || {}; } catch (e) { likedFlags = {}; }
    }
    function saveLikes() {
        localStorage.setItem(LIKES_KEY, JSON.stringify(likesMap));
        localStorage.setItem(LIKES_FLAGS, JSON.stringify(likedFlags));
    }
    function getLikes(id) { return likesMap[String(id)] || 0; }
    function hasLiked(id) { return !!likedFlags[String(id)]; }

    function toggleLike(id) {
        id = String(id);
        if (hasLiked(id)) {
            likesMap[id] = Math.max(0, (likesMap[id] || 1) - 1);
            delete likedFlags[id];
        } else {
            likesMap[id] = (likesMap[id] || 0) + 1;
            likedFlags[id] = true;
        }
        saveLikes();

        const card = document.querySelector(`.card[data-id="${id}"]`);
        if (card) {
            const btn = card.querySelector('.btn-like');
            if (btn) {
                const newCount = likesMap[id];
                btn.innerHTML = `❤ ${newCount}`;
                if (likedFlags[id]) btn.classList.add('liked'); else btn.classList.remove('liked');
            }
        }
    }
    loadLikes();

    const settingsButton = document.getElementById('settings-button');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettings = document.getElementById('close-settings');
    const saveWaBtn = document.getElementById('save-wa-number');
    const waInput = document.getElementById('wa-number-input');

    try {
        const host = window.location.hostname;
        if (settingsButton && host !== 'localhost' && host !== '127.0.0.1') {
            settingsButton.style.display = 'none';
        }
    } catch (e) { }

    function openSettings() {
        if (settingsModal) { settingsModal.setAttribute('aria-hidden', 'false'); }
        if (waInput) { waInput.value = localStorage.getItem('waNumber') || getWaNumber(); }
    }
    function closeSettingsFn() { if (settingsModal) { settingsModal.setAttribute('aria-hidden', 'true'); } }
    if (settingsButton) settingsButton.addEventListener('click', openSettings);
    if (closeSettings) closeSettings.addEventListener('click', closeSettingsFn);
    if (saveWaBtn) saveWaBtn.addEventListener('click', () => {
        const v = waInput.value.trim();
        if (v) localStorage.setItem('waNumber', v);
        closeSettingsFn();
    });

    window.miGetCart = () => carrito;
    window.miAddToCart = (p) => addToCart(p);
    window.miToggleLike = (id) => toggleLike(id);
    window.getLikes = getLikes;
    window.hasLiked = hasLiked;

    const inputBuscador = document.getElementById('buscador');
    if (inputBuscador) {
        inputBuscador.addEventListener('input', debounce((e) => {
            searchText = e.target.value.toLowerCase();
            applyFilters();
        }, 300));
    }
    if (sortSelect) {
        sortSelect.addEventListener('change', (e) => {
            selectedSort = e.target.value;
            applyFilters();
        });
    }

    function debounce(fn, wait = 150) {
        let t;
        return function (...args) {
            clearTimeout(t);
            t = setTimeout(() => fn.apply(this, args), wait);
        };
    }

    window.addEventListener('scroll', debounce(() => {
        const nearBottom = (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 300);
        if (!nearBottom) return;
        const isAllCategory = activeCategory === '';
        if (isAllCategory) return;
        if (currentLimit < filteredAndSorted.length) {
            currentLimit += itemsPerPage;
            renderPaginated();
        }
    }, 100));

    applyFilters();
});