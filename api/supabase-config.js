'use strict';

module.exports = function supabaseConfigHandler(request, response) {
    response.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate');
    response.setHeader('X-Content-Type-Options', 'nosniff');
    response.setHeader('Content-Type', 'application/json; charset=utf-8');
    response.setHeader('Access-Control-Allow-Origin', '*');
    if (request.method !== 'GET' && request.method !== 'HEAD') {
        response.setHeader('Allow', 'GET, HEAD');
        response.statusCode = 405;
        response.end(request.method === 'HEAD' ? undefined : JSON.stringify({ error: 'METHOD_NOT_ALLOWED' }));
        return;
    }
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    if (!supabaseUrl || !supabaseAnonKey) {
        response.statusCode = 503;
        response.end(request.method === 'HEAD' ? undefined : JSON.stringify({ error: 'SUPABASE_PUBLIC_CONFIG_UNAVAILABLE' }));
        return;
    }
    response.statusCode = 200;
    response.end(request.method === 'HEAD' ? undefined : JSON.stringify({
        supabaseUrl: supabaseUrl.replace(/\\/+$/, '').replace(/\\/rest\\/v1$/i, ''),
        supabaseAnonKey
    }));
};
