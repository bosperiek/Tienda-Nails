(function attachNantySupabase(root) {
  'use strict';
  let clientPromise;
  async function getClient() {
    if (clientPromise) return clientPromise;
    clientPromise = (async () => {
      if (!root.supabase || typeof root.supabase.createClient !== 'function') {
        throw new Error('No se cargó la biblioteca de Supabase.');
      }
      const response = await fetch('/api/supabase-config', {
        headers: { Accept: 'application/json' },
        cache: 'no-store'
      });
      if (!response.ok) throw new Error('No se pudo obtener la configuración de Supabase.');
      const config = await response.json();
      if (!config.supabaseUrl || !config.supabaseAnonKey) throw new Error('Configuración pública incompleta.');
      return root.supabase.createClient(config.supabaseUrl, config.supabaseAnonKey, {
        auth: { persistSession: false, autoRefreshToken: false, detectSessionInUrl: false }
      });
    })().catch(error => { clientPromise = null; throw error; });
    return clientPromise;
  }
  root.NantySupabase = Object.freeze({ getClient });
})(window);
