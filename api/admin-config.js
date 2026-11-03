'use strict';

const ALLOWED_METHODS = 'GET, HEAD';

module.exports = function adminConfigHandler(request, response) {
    const method = request.method || '';

    response.setHeader('Cache-Control', 'no-store');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Allow', ALLOWED_METHODS);

    if (method !== 'GET' && method !== 'HEAD') {
        response.statusCode = 405;
        response.end(method === 'HEAD' ? undefined : JSON.stringify({
            error: 'METHOD_NOT_ALLOWED'
        }));
        return;
    }

    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseAnonKey) {
        response.statusCode = 503;
        response.end(method === 'HEAD' ? undefined : JSON.stringify({
            error: 'SUPABASE_PUBLIC_CONFIG_UNAVAILABLE'
        }));
        return;
    }

    // La anon/publishable key está diseñada para usarse en el navegador.
    // Nunca devolver SUPABASE_SERVICE_ROLE_KEY ni secretos del servidor.
    response.statusCode = 200;
    response.end(method === 'HEAD' ? undefined : JSON.stringify({
        supabaseUrl: supabaseUrl.replace(/\/+$/, ''),
        supabaseAnonKey
    }));
};
