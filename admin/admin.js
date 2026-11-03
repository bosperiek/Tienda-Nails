(function () {
  'use strict';

  const ADMIN_EMAIL = 'bosperiek2@gmail.com';
  const loginView = document.getElementById('login-view');
  const dashboardView = document.getElementById('dashboard-view');
  const loginForm = document.getElementById('login-form');
  const emailInput = document.getElementById('email');
  const passwordInput = document.getElementById('password');
  const passwordSubmit = document.getElementById('password-submit');
  const googleButton = document.getElementById('google-signin');
  const signoutButton = document.getElementById('signout-button');
  const statusMessage = document.getElementById('status-message');
  const signedInEmail = document.getElementById('signed-in-email');
  const productsTableBody = document.getElementById('products-table-body');
  const inventoryStatus = document.getElementById('inventory-status');
  const productSearch = document.getElementById('product-search');
  const refreshProductsButton = document.getElementById('refresh-products');
  const previousPageButton = document.getElementById('previous-page');
  const nextPageButton = document.getElementById('next-page');
  const pageIndicator = document.getElementById('page-indicator');
  const pageSize = 25;
  let allProducts = [];
  let currentPage = 1;
  let editingProductId = null;

  let supabaseClient = null;
  let verificationInProgress = false;

  function setStatus(message) {
    statusMessage.textContent = message || '';
  }

  function setBusy(isBusy) {
    passwordSubmit.disabled = isBusy;
    googleButton.disabled = isBusy;
    passwordSubmit.textContent = isBusy ? 'Verificando…' : 'Iniciar sesión';
  }

  function showLogin() {
    loginView.hidden = false;
    dashboardView.hidden = true;
  }

  function showDashboard(email) {
    loginView.hidden = true;
    dashboardView.hidden = false;
    signedInEmail.textContent = email;
    passwordInput.value = '';
  }

  async function rejectSession(message) {
    if (supabaseClient) {
      await supabaseClient.auth.signOut();
    }
    showLogin();
    setStatus(message);
  }

  async function verifyAdministrator() {
    if (verificationInProgress) return;
    verificationInProgress = true;
    setBusy(true);

    try {
      const { data: userData, error: userError } = await supabaseClient.auth.getUser();
      if (userError || !userData.user) {
        await rejectSession('No se pudo verificar la sesión. Inicia sesión nuevamente.');
        return;
      }

      const user = userData.user;
      const email = (user.email || '').trim().toLowerCase();

      if (email !== ADMIN_EMAIL) {
        await rejectSession('Esta cuenta no está autorizada para administrar la tienda.');
        return;
      }

      const { data: adminRecord, error: adminError } = await supabaseClient
        .from('app_admins')
        .select('user_id')
        .eq('user_id', user.id)
        .maybeSingle();

      if (adminError || !adminRecord) {
        await rejectSession('La cuenta inició sesión, pero no tiene autorización administrativa.');
        return;
      }

      showDashboard(email);
      setStatus('');
      await loadProducts();
    } catch (error) {
      console.error('Error al verificar acceso administrativo.', error);
      await rejectSession('No fue posible verificar los permisos. Intenta nuevamente.');
    } finally {
      setBusy(false);
      verificationInProgress = false;
    }
  }

  function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
      '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
    })[character]);
  }

  function formatPrice(value) {
    if (value === null || value === undefined || value === '') return '—';
    return new Intl.NumberFormat('es-MX', {
      style: 'currency', currency: 'MXN', maximumFractionDigits: 2
    }).format(Number(value));
  }

  function renderProducts() {
    const term = (productSearch.value || '').trim().toLocaleLowerCase('es-MX');
    const filtered = allProducts.filter(product =>
      String(product.name || '').toLocaleLowerCase('es-MX').includes(term) ||
      String(product.id || '').toLocaleLowerCase('es-MX').includes(term)
    );
    const totalPages = Math.max(1, Math.ceil(filtered.length / pageSize));
    currentPage = Math.min(currentPage, totalPages);
    const start = (currentPage - 1) * pageSize;
    const pageProducts = filtered.slice(start, start + pageSize);

    document.getElementById('products-total').textContent = String(filtered.length);
    document.getElementById('products-active').textContent = String(pageProducts.filter(p => p.active === true).length);
    document.getElementById('products-inactive').textContent = String(pageProducts.filter(p => p.active === false).length);
    pageIndicator.textContent = `Página ${currentPage} de ${totalPages}`;
    previousPageButton.disabled = currentPage <= 1;
    nextPageButton.disabled = currentPage >= totalPages;

    if (!pageProducts.length) {
      productsTableBody.innerHTML = '<tr><td colspan="8">No se encontraron productos.</td></tr>';
      return;
    }

    productsTableBody.innerHTML = pageProducts.map(product => {
      const active = product.active === true;
      const featured = product.featured === true ? 'Sí' : 'No';
      return `<tr>
        <td class="product-name-cell">${escapeHtml(product.name || 'Sin nombre')}</td>
        <td>${escapeHtml(product.id || '—')}</td>
        <td>${escapeHtml(product.category || '—')}</td>
        <td>${formatPrice(product.sale_price ?? product.price)}</td>
        <td>${escapeHtml(product.stock ?? 0)}</td>
        <td><span class="status-pill ${active ? '' : 'inactive'}">${active ? 'Activo' : 'Inactivo'}</span></td>
        <td>${featured}</td>
        <td><button class="secondary-button edit-product-button" type="button" data-edit-product="${escapeHtml(product.id)}">Editar</button></td>
      </tr>`;
    }).join('');
  }

  async function loadProducts() {
    if (!supabaseClient) return;
    inventoryStatus.textContent = 'Consultando productos en Supabase…';
    productsTableBody.innerHTML = '<tr><td colspan="8">Cargando productos…</td></tr>';
    refreshProductsButton.disabled = true;
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .select('id,name,category,price,sale_price,stock,active,featured,description')
        .order('id', { ascending: true });
      if (error) throw error;
      allProducts = Array.isArray(data) ? data : [];
      currentPage = 1;
      renderProducts();
      inventoryStatus.textContent = `Se cargaron ${allProducts.length} productos desde Supabase.`;
    } catch (error) {
      console.error('No se pudo consultar el inventario:', error);
      productsTableBody.innerHTML = '<tr><td colspan="8">No fue posible cargar los productos.</td></tr>';
      inventoryStatus.textContent = `Error al consultar inventario: ${error.message || 'Error desconocido'}`;
    } finally {
      refreshProductsButton.disabled = false;
    }
  }

  function closeEditor() {
    document.getElementById('product-editor').hidden = true;
    document.getElementById('product-edit-form').reset();
    document.getElementById('editor-status').textContent = '';
    editingProductId = null;
  }

  function openEditor(product) {
    editingProductId = product.id;
    document.getElementById('editor-product-id').textContent = `ID: ${product.id}`;
    document.getElementById('edit-name').value = product.name || '';
    document.getElementById('edit-category').value = product.category || '';
    document.getElementById('edit-price').value = product.price ?? '';
    document.getElementById('edit-sale-price').value = product.sale_price ?? '';
    document.getElementById('edit-stock').value = product.stock ?? 0;
    document.getElementById('edit-description').value = product.description || '';
    document.getElementById('edit-active').checked = product.active === true;
    document.getElementById('edit-featured').checked = product.featured === true;
    document.getElementById('editor-status').textContent = '';
    document.getElementById('product-editor').hidden = false;
    document.getElementById('product-editor').scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  productsTableBody.addEventListener('click', event => {
    const button = event.target.closest('[data-edit-product]');
    if (!button) return;
    const product = allProducts.find(item => item.id === button.dataset.editProduct);
    if (product) openEditor(product);
  });

  document.getElementById('cancel-edit').addEventListener('click', closeEditor);
  document.getElementById('cancel-edit-bottom').addEventListener('click', closeEditor);

  document.getElementById('product-edit-form').addEventListener('submit', async event => {
    event.preventDefault();
    if (!editingProductId || !supabaseClient) return;

    const saveButton = document.getElementById('save-product');
    const editorStatus = document.getElementById('editor-status');
    const name = document.getElementById('edit-name').value.trim();
    const category = document.getElementById('edit-category').value.trim();
    const price = Number(document.getElementById('edit-price').value);
    const saleValue = document.getElementById('edit-sale-price').value;
    const stock = Number(document.getElementById('edit-stock').value);
    const sale_price = saleValue === '' ? null : Number(saleValue);

    if (!name || !category || !Number.isFinite(price) || price < 0 ||
        !Number.isInteger(stock) || stock < 0 ||
        (sale_price !== null && (!Number.isFinite(sale_price) || sale_price < 0))) {
      editorStatus.textContent = 'Revisa nombre, categoría, precios y existencias. El stock debe ser un entero igual o mayor que cero.';
      return;
    }
    if (sale_price !== null && sale_price >= price) {
      editorStatus.textContent = 'El precio de oferta debe ser menor que el precio normal.';
      return;
    }

    const payload = {
      name,
      category,
      price,
      sale_price,
      stock,
      description: document.getElementById('edit-description').value.trim() || null,
      active: document.getElementById('edit-active').checked,
      featured: document.getElementById('edit-featured').checked
    };

    saveButton.disabled = true;
    editorStatus.textContent = 'Guardando cambios…';
    try {
      const { data, error } = await supabaseClient
        .from('products')
        .update(payload)
        .eq('id', editingProductId)
        .select('id')
        .maybeSingle();
      if (error) throw error;
      if (!data) throw new Error('Supabase no confirmó la actualización. Comprueba los permisos de administrador.');
      editorStatus.textContent = 'Cambios guardados correctamente.';
      await loadProducts();
      const { data: refreshed, error: readError } = await supabaseClient
        .from('products')
        .select('id,name,category,price,sale_price,stock,active,featured,description')
        .eq('id', editingProductId)
        .maybeSingle();
      if (readError) throw readError;
      if (refreshed) {
        allProducts = allProducts.filter(item => item.id !== refreshed.id).concat(refreshed);
        closeEditor();
        inventoryStatus.textContent = 'Producto actualizado y datos verificados en Supabase.';
        renderProducts();
      }
    } catch (error) {
      console.error('No se pudo actualizar el producto:', error);
      editorStatus.textContent = `No se pudieron guardar los cambios: ${error.message || 'Error desconocido'}`;
    } finally {
      saveButton.disabled = false;
    }
  });

  productSearch.addEventListener('input', () => {
    currentPage = 1;
    renderProducts();
  });
  refreshProductsButton.addEventListener('click', loadProducts);
  previousPageButton.addEventListener('click', () => {
    currentPage = Math.max(1, currentPage - 1);
    renderProducts();
  });
  nextPageButton.addEventListener('click', () => {
    currentPage += 1;
    renderProducts();
  });

  async function initialize() {
    try {
      if (!window.supabase || typeof window.supabase.createClient !== 'function') {
        throw new Error('No se pudo cargar la biblioteca de autenticación.');
      }

      const response = await fetch('/api/admin-config', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) {
        throw new Error('No se pudo obtener la configuración pública de Supabase.');
      }

      const config = await response.json();
      if (!config.supabaseUrl || !config.supabaseAnonKey) {
        throw new Error('La configuración de Supabase está incompleta.');
      }

      supabaseClient = window.supabase.createClient(
        config.supabaseUrl,
        config.supabaseAnonKey,
        {
          auth: {
            persistSession: true,
            autoRefreshToken: true,
            detectSessionInUrl: true
          }
        }
      );

      supabaseClient.auth.onAuthStateChange((event, session) => {
        if (session && (event === 'SIGNED_IN' || event === 'INITIAL_SESSION' || event === 'TOKEN_REFRESHED')) {
          window.setTimeout(() => verifyAdministrator(), 0);
        } else if (event === 'SIGNED_OUT') {
          showLogin();
        }
      });

      const { data, error } = await supabaseClient.auth.getSession();
      if (error) throw error;
      if (data.session) {
        await verifyAdministrator();
      }
    } catch (error) {
      console.error('No se pudo iniciar el acceso administrativo.', error);
      setStatus('No se pudo conectar con el servicio de acceso. Intenta recargar la página.');
      setBusy(false);
    }
  }

  loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    setStatus('');

    const email = emailInput.value.trim().toLowerCase();
    const password = passwordInput.value;

    if (email !== ADMIN_EMAIL) {
      setStatus('Solo la cuenta administradora autorizada puede iniciar sesión aquí.');
      return;
    }
    if (!password) {
      setStatus('Escribe tu contraseña.');
      passwordInput.focus();
      return;
    }

    if (!supabaseClient) {
      setStatus('El servicio de acceso todavía no está listo. Recarga la página e intenta nuevamente.');
      return;
    }

    setBusy(true);
    try {
      const { error } = await supabaseClient.auth.signInWithPassword({
        email: ADMIN_EMAIL,
        password
      });
      if (error) {
        console.error('Error de inicio de sesión de Supabase:', error);
        setBusy(false);
        setStatus(`Supabase: ${error.message || 'No se pudo validar el acceso.'} (código: ${error.code || error.status || 'no disponible'})`);
        return;
      }
      await verifyAdministrator();
    } catch (error) {
      console.error('Fallo inesperado al iniciar sesión:', error);
      setBusy(false);
      setStatus('Ocurrió un error al comunicarse con Supabase. Revisa la conexión e intenta nuevamente.');
    }
  });

  googleButton.addEventListener('click', async () => {
    setStatus('');
    setBusy(true);

    const { error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + '/admin/',
        queryParams: { prompt: 'select_account' }
      }
    });

    if (error) {
      setBusy(false);
      setStatus('No se pudo iniciar sesión con Google. Intenta nuevamente.');
    }
  });

  signoutButton.addEventListener('click', async () => {
    setBusy(true);
    const { error } = await supabaseClient.auth.signOut();
    setBusy(false);
    if (error) {
      setStatus('No se pudo cerrar la sesión. Intenta nuevamente.');
      return;
    }
    passwordInput.value = '';
    showLogin();
    setStatus('Sesión cerrada correctamente.');
  });

  initialize();
})();
