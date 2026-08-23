'use strict';

const ABSOLUTE_SCHEME_PATTERN = /^[a-z][a-z0-9+.-]*:/i;
const UNSAFE_WHITESPACE_PATTERN = /[\u0000-\u0020\u007f]/u;

function decodePathSegment(value) {
    let decoded = value;

    for (let attempt = 0; attempt < 3; attempt += 1) {
        const nextValue = decodeURIComponent(decoded);
        if (nextValue === decoded) break;
        decoded = nextValue;
    }

    return decoded;
}

function isSafeLocalPath(value) {
    if (value.startsWith('//')
        || value.includes('\\')
        || UNSAFE_WHITESPACE_PATTERN.test(value)) {
        return false;
    }

    const path = value.split(/[?#]/u, 1)[0];
    if (!path || path.includes('//')) return false;

    try {
        return path.split('/').every(segment => {
            if (segment === '') return true;

            const decodedSegment = decodePathSegment(segment);
            return decodedSegment !== '.'
                && decodedSegment !== '..'
                && !decodedSegment.includes('/')
                && !decodedSegment.includes('\\')
                && !UNSAFE_WHITESPACE_PATTERN.test(decodedSegment);
        });
    } catch (error) {
        return false;
    }
}

function parseHttpsUrl(value) {
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

function resolveProductImageUrl(value, siteUrl) {
    if (typeof value !== 'string') return null;

    const normalized = value.trim();
    if (!normalized
        || normalized.startsWith('//')
        || UNSAFE_WHITESPACE_PATTERN.test(normalized)) {
        return null;
    }

    const safeSiteUrl = parseHttpsUrl(siteUrl);
    if (!safeSiteUrl) return null;

    if (ABSOLUTE_SCHEME_PATTERN.test(normalized)) {
        const absoluteImageUrl = parseHttpsUrl(normalized);
        return absoluteImageUrl ? absoluteImageUrl.href : null;
    }

    if (!isSafeLocalPath(normalized)) return null;

    try {
        const localPath = normalized.startsWith('/')
            ? normalized
            : `/${normalized}`;
        const resolved = new URL(localPath, safeSiteUrl.origin);
        resolved.hash = '';
        return resolved.origin === safeSiteUrl.origin ? resolved.href : null;
    } catch (error) {
        return null;
    }
}

module.exports = {
    resolveProductImageUrl
};
