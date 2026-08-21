'use strict';

const OPENSHEET_URL = 'https://opensheet.elk.sh/1pwoKKCUUlxmqUQGEMCEemXHngq-4wWUMPfMReI2vQdA/productos';
const DEFAULT_TIMEOUT_MS = 10_000;

class OpenSheetProviderError extends Error {
    constructor(code, message) {
        super(message);
        this.name = 'OpenSheetProviderError';
        this.code = code;
    }
}

async function fetchRows({
    fetchImpl = globalThis.fetch,
    timeoutMs = DEFAULT_TIMEOUT_MS
} = {}) {
    if (typeof fetchImpl !== 'function') {
        throw new TypeError('Se requiere una implementación válida de fetch.');
    }

    if (!Number.isFinite(timeoutMs) || timeoutMs <= 0) {
        throw new TypeError('El timeout debe ser un número positivo.');
    }

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
        const response = await fetchImpl(OPENSHEET_URL, {
            method: 'GET',
            headers: {
                Accept: 'application/json'
            },
            signal: controller.signal
        });

        if (!response || response.ok !== true) {
            const status = Number.isInteger(response?.status)
                ? ` ${response.status}`
                : '';

            throw new OpenSheetProviderError(
                'OPENSHEET_HTTP_ERROR',
                `OpenSheet respondió con un estado HTTP no exitoso${status}.`
            );
        }

        let rows;
        try {
            rows = await response.json();
        } catch (error) {
            throw new OpenSheetProviderError(
                'OPENSHEET_INVALID_JSON',
                'OpenSheet devolvió una respuesta JSON inválida.'
            );
        }

        if (!Array.isArray(rows)) {
            throw new OpenSheetProviderError(
                'OPENSHEET_INVALID_RESPONSE',
                'OpenSheet devolvió una respuesta con formato inesperado.'
            );
        }

        if (rows.length === 0) {
            throw new OpenSheetProviderError(
                'OPENSHEET_EMPTY_RESPONSE',
                'OpenSheet devolvió un catálogo vacío inesperado.'
            );
        }

        return rows;
    } catch (error) {
        if (error instanceof OpenSheetProviderError) throw error;

        if (controller.signal.aborted || error?.name === 'AbortError') {
            throw new OpenSheetProviderError(
                'OPENSHEET_TIMEOUT',
                'La consulta a OpenSheet excedió el tiempo límite.'
            );
        }

        throw new OpenSheetProviderError(
            'OPENSHEET_FETCH_ERROR',
            'No se pudo consultar OpenSheet.'
        );
    } finally {
        clearTimeout(timeoutId);
    }
}

module.exports = {
    fetchRows,
    OpenSheetProviderError
};
