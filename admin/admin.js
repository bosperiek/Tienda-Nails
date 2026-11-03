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
    } catch (error) {
      console.error('Error al verificar acceso administrativo.', error);
      await rejectSession('No fue posible verificar los permisos. Intenta nuevamente.');
    } finally {
      setBusy(false);
      verificationInProgress = false;
    }
  }

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

    setBusy(true);
    const { error } = await supabaseClient.auth.signInWithPassword({
      email: ADMIN_EMAIL,
      password
    });
    if (error) {
      setBusy(false);
      setStatus('No se pudo iniciar sesión. Revisa tu correo y contraseña.');
      return;
    }
    await verifyAdministrator();
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
