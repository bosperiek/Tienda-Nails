'use strict';

const { resolveProductImageUrl } = require('./product-image-url');

const WHATSAPP_NUMBER = '525614782629';
const SITE_NAME = 'Nanty Nails Shop';
const METADATA_DESCRIPTION_MAX_LENGTH = 160;
const PRICE_FORMATTER = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
});
const STOCK_FORMATTER = new Intl.NumberFormat('es-MX', {
    maximumFractionDigits: 2
});

function escapeHtml(value) {
    return String(value ?? '').replace(/[&<>"']/g, character => ({
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#39;'
    })[character]);
}

function serializeJsonLd(value) {
    return JSON.stringify(value).replace(/[<>&\u2028\u2029]/g, character => ({
        '<': '\\u003C',
        '>': '\\u003E',
        '&': '\\u0026',
        '\u2028': '\\u2028',
        '\u2029': '\\u2029'
    })[character]);
}

function requireNonEmptyString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`${fieldName} debe ser un string no vacío.`);
    }

    return value.trim();
}

function normalizeOptionalText(value) {
    if (typeof value !== 'string') return null;

    const normalized = value.trim();
    return normalized === '' ? null : normalized;
}

function formatCategoryLabel(value) {
    const category = normalizeOptionalText(value);
    if (!category) return null;

    const label = category
        .replace(/[-_]+/gu, ' ')
        .replace(/\s+/gu, ' ')
        .trim();

    return label
        ? `${label.charAt(0).toLocaleUpperCase('es-MX')}${label.slice(1)}`
        : null;
}

function truncateMetadataText(value, maxLength = METADATA_DESCRIPTION_MAX_LENGTH) {
    const characters = Array.from(value);
    if (characters.length <= maxLength) return value;

    const ellipsis = '…';
    const availableCharacters = maxLength - Array.from(ellipsis).length;
    let truncated = characters.slice(0, availableCharacters).join('').trimEnd();
    const lastSpaceIndex = truncated.lastIndexOf(' ');

    if (lastSpaceIndex >= Math.floor(availableCharacters * 0.65)) {
        truncated = truncated.slice(0, lastSpaceIndex);
    }

    return `${truncated.replace(/[\s,;:.!?-]+$/u, '')}${ellipsis}`;
}

function createMetadataDescription({ description, productName }) {
    const sourceText = description || `Consulta ${productName} en ${SITE_NAME}.`;
    const normalizedText = sourceText.replace(/\s+/gu, ' ').trim();
    return truncateMetadataText(normalizedText);
}

function normalizeOptionalNumber(value) {
    return Number.isFinite(value) && value >= 0 ? value : null;
}

function validateHttpUrl(value, fieldName, { required = false } = {}) {
    if (value === null || value === undefined || value === '') {
        if (required) {
            throw new TypeError(`${fieldName} es obligatorio.`);
        }

        return null;
    }

    if (typeof value !== 'string') {
        if (required) {
            throw new TypeError(`${fieldName} debe ser una URL válida.`);
        }

        return null;
    }

    try {
        const parsed = new URL(value.trim());
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            if (required) {
                throw new TypeError(`${fieldName} debe utilizar http o https.`);
            }

            return null;
        }

        return parsed.href;
    } catch (error) {
        if (required) {
            if (error instanceof TypeError && error.message.startsWith(fieldName)) {
                throw error;
            }

            throw new TypeError(`${fieldName} debe ser una URL válida.`);
        }

        return null;
    }
}

function hasSameText(firstValue, secondValue) {
    if (!firstValue || !secondValue) return false;

    return firstValue.localeCompare(secondValue, 'es', {
        sensitivity: 'base'
    }) === 0;
}

function createWhatsAppUrl({ productName, price, canonicalUrl }) {
    const message = [
        `Hola, me gustaría consultar el producto: ${productName}.`,
        price === null ? null : `Precio: ${PRICE_FORMATTER.format(price)}.`,
        `Página: ${canonicalUrl}`
    ].filter(Boolean).join('\n');
    const whatsappUrl = new URL(`https://wa.me/${WHATSAPP_NUMBER}`);
    whatsappUrl.searchParams.set('text', message);
    return whatsappUrl.href;
}

function renderPrice({ price, salePrice }) {
    if (salePrice !== null) {
        const regularPrice = price === null
            ? ''
            : `<span class="product-price__regular">
                <span class="visually-hidden">Precio regular: </span>
                ${escapeHtml(PRICE_FORMATTER.format(price))}
              </span>`;

        return `<div class="product-price" aria-label="Precio del producto">
          <span class="product-price__sale">
            <span class="visually-hidden">Precio de oferta: </span>
            ${escapeHtml(PRICE_FORMATTER.format(salePrice))}
          </span>
          ${regularPrice}
        </div>`;
    }

    if (price !== null) {
        return `<p class="product-price product-price--single">
          ${escapeHtml(PRICE_FORMATTER.format(price))}
        </p>`;
    }

    return '<p class="product-price product-price--unavailable">Precio no disponible</p>';
}

function renderProductPage({
    product,
    canonicalUrl,
    siteUrl,
    imageUrl = null,
    indexable = true
} = {}) {
    if (!product || typeof product !== 'object' || Array.isArray(product)) {
        throw new TypeError('product debe ser un producto normalizado.');
    }

    if (typeof indexable !== 'boolean') {
        throw new TypeError('indexable debe ser un booleano.');
    }

    const productId = requireNonEmptyString(product.id, 'product.id');
    const productName = requireNonEmptyString(product.name, 'product.name');
    const safeCanonicalUrl = validateHttpUrl(canonicalUrl, 'canonicalUrl', {
        required: true
    });
    const safeSiteUrl = validateHttpUrl(siteUrl, 'siteUrl', { required: true });
    const safeImageUrl = resolveProductImageUrl(imageUrl, safeSiteUrl);

    const homeUrl = new URL('/', safeSiteUrl).href;
    const catalogUrl = new URL('/tienda.html', safeSiteUrl).href;
    const logoUrl = new URL('/imagenesPrincipal/logo4.svg', safeSiteUrl).href;
    const stylesheetUrl = new URL('/css/producto.css', safeSiteUrl).href;
    const socialFallbackImageUrl = new URL(
        '/imagenesPrincipal/og-nanty-nails-shop.jpg',
        safeSiteUrl
    ).href;

    const category = normalizeOptionalText(product.category);
    const visibleCategory = category && !hasSameText(category, productName)
        ? category
        : null;
    const visibleCategoryLabel = formatCategoryLabel(visibleCategory);
    const description = normalizeOptionalText(product.description);
    const brand = normalizeOptionalText(product.brand);
    const subcategory = normalizeOptionalText(product.subcategory);
    const price = normalizeOptionalNumber(product.price);
    const salePrice = normalizeOptionalNumber(product.salePrice);
    const stock = normalizeOptionalNumber(product.stock);
    const altText = normalizeOptionalText(product.altText) || productName;
    const displayedPrice = salePrice ?? price;
    const pageTitle = `${productName} | ${SITE_NAME}`;
    const metadataDescription = createMetadataDescription({
        description,
        productName
    });

    const escapedId = escapeHtml(productId);
    const escapedName = escapeHtml(productName);
    const escapedCategory = escapeHtml(visibleCategoryLabel);
    const escapedDescription = escapeHtml(description);
    const escapedBrand = escapeHtml(brand);
    const escapedSubcategory = escapeHtml(subcategory);
    const escapedAltText = escapeHtml(altText);
    const escapedPageTitle = escapeHtml(pageTitle);
    const escapedMetadataDescription = escapeHtml(metadataDescription);

    const productOpenGraphImage = safeImageUrl
        ? `<meta property="og:image" content="${escapeHtml(safeImageUrl)}">
    <meta property="og:image:alt" content="${escapedAltText}">
    `
        : '';
    const openGraphImages = `${productOpenGraphImage}<meta property="og:image" content="${escapeHtml(socialFallbackImageUrl)}">
    <meta property="og:image:type" content="image/jpeg">
    <meta property="og:image:width" content="1200">
    <meta property="og:image:height" content="630">
    <meta property="og:image:alt" content="${SITE_NAME}">`;

    const productStructuredData = {
        '@type': 'Product',
        '@id': `${safeCanonicalUrl}#product`,
        name: productName,
        url: safeCanonicalUrl
    };

    if (safeImageUrl) productStructuredData.image = safeImageUrl;
    if (description) productStructuredData.description = description;
    if (category) productStructuredData.category = category;
    if (brand) {
        productStructuredData.brand = {
            '@type': 'Brand',
            name: brand
        };
    }
    if (displayedPrice !== null) {
        productStructuredData.offers = {
            '@type': 'Offer',
            url: safeCanonicalUrl,
            priceCurrency: 'MXN',
            price: displayedPrice.toFixed(2)
        };

        if (stock !== null) {
            productStructuredData.offers.availability = stock > 0
                ? 'https://schema.org/InStock'
                : 'https://schema.org/OutOfStock';
        }
    }

    const breadcrumbStructuredData = {
        '@type': 'BreadcrumbList',
        itemListElement: [
            {
                '@type': 'ListItem',
                position: 1,
                name: 'Inicio',
                item: homeUrl
            },
            {
                '@type': 'ListItem',
                position: 2,
                name: 'Catálogo',
                item: catalogUrl
            },
            {
                '@type': 'ListItem',
                position: 3,
                name: productName
            }
        ]
    };
    const structuredData = serializeJsonLd({
        '@context': 'https://schema.org',
        '@graph': [productStructuredData, breadcrumbStructuredData]
    });
    const robotsMetadata = indexable
        ? ''
        : '<meta name="robots" content="noindex, follow">';
    const structuredDataContent = indexable
        ? `<script type="application/ld+json">${structuredData}</script>`
        : '';

    const categoryBreadcrumb = visibleCategory
        ? `<li><span>${escapedCategory}</span></li>`
        : '';
    const categoryContent = visibleCategory
        ? `<p class="product-category">${escapedCategory}</p>`
        : '';
    const descriptionContent = description
        ? `<section class="product-description" aria-labelledby="product-description-heading">
            <h2 id="product-description-heading">Descripción</h2>
            <p>${escapedDescription}</p>
          </section>`
        : '';

    const additionalImageUrls = Array.isArray(product.additionalImages)
        ? [...new Set(product.additionalImages
            .map(value => resolveProductImageUrl(value, safeSiteUrl))
            .filter(url => url && url !== safeImageUrl))]
        : [];
    const additionalImagesContent = additionalImageUrls.length > 0
        ? `<div class="product-gallery__additional" aria-label="Imágenes adicionales del producto">
            ${additionalImageUrls.map((url, index) => `<figure>
              <img
                src="${escapeHtml(url)}"
                alt="${escapeHtml(`${productName}, vista adicional ${index + 1}`)}"
                loading="lazy"
                decoding="async"
              >
            </figure>`).join('')}
          </div>`
        : '';
    const imageContent = safeImageUrl
        ? `<figure class="product-gallery__primary">
            <img
              src="${escapeHtml(safeImageUrl)}"
              alt="${escapedAltText}"
              loading="eager"
              decoding="async"
            >
          </figure>`
        : `<div class="product-gallery__primary product-gallery__fallback" role="img" aria-label="Imagen no disponible para ${escapedName}">
            <span>Imagen no disponible</span>
          </div>`;

    const detailRows = [
        visibleCategory
            ? `<div><dt>Categoría</dt><dd>${escapedCategory}</dd></div>`
            : '',
        subcategory
            ? `<div><dt>Subcategoría</dt><dd>${escapedSubcategory}</dd></div>`
            : '',
        brand
            ? `<div><dt>Marca</dt><dd>${escapedBrand}</dd></div>`
            : '',
        stock !== null
            ? `<div><dt>Existencias</dt><dd>${escapeHtml(STOCK_FORMATTER.format(stock))}</dd></div>`
            : '',
        `<div><dt>Referencia</dt><dd>${escapedId}</dd></div>`
    ].filter(Boolean).join('');

    const whatsappUrl = createWhatsAppUrl({
        productName,
        price: displayedPrice,
        canonicalUrl: safeCanonicalUrl
    });

    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <meta name="theme-color" content="#f8f0ed">
    <title>${escapedPageTitle}</title>
    <meta name="description" content="${escapedMetadataDescription}">
    ${robotsMetadata}
    <link rel="canonical" href="${escapeHtml(safeCanonicalUrl)}">
    <meta property="og:title" content="${escapedPageTitle}">
    <meta property="og:type" content="website">
    <meta property="og:url" content="${escapeHtml(safeCanonicalUrl)}">
    <meta property="og:description" content="${escapedMetadataDescription}">
    <meta property="og:site_name" content="${SITE_NAME}">
    <meta property="og:locale" content="es_MX">
    ${openGraphImages}
    ${structuredDataContent}
    <link rel="stylesheet" href="${escapeHtml(stylesheetUrl)}">
  </head>
  <body>
    <a class="skip-link" href="#contenido-principal">Saltar al contenido principal</a>

    <header class="site-header">
      <div class="site-header__inner">
        <a class="site-brand" href="${escapeHtml(homeUrl)}" aria-label="Ir al inicio de Nanty Nails Shop">
          <img
            src="${escapeHtml(logoUrl)}"
            alt="Nanty Nails Shop"
            width="204"
            height="60"
          >
        </a>
        <nav class="site-navigation" aria-label="Navegación principal">
          <a href="${escapeHtml(homeUrl)}">Inicio</a>
          <a href="${escapeHtml(catalogUrl)}" aria-current="page">Catálogo</a>
        </nav>
      </div>
    </header>

    <div class="breadcrumb-shell">
      <nav class="breadcrumb" aria-label="Migas de pan">
        <ol>
          <li><a href="${escapeHtml(homeUrl)}">Inicio</a></li>
          <li><a href="${escapeHtml(catalogUrl)}">Catálogo</a></li>
          ${categoryBreadcrumb}
          <li aria-current="page"><span>${escapedName}</span></li>
        </ol>
      </nav>
    </div>

    <main id="contenido-principal" class="product-page">
      <article class="product-layout">
        <section class="product-gallery" aria-label="Imágenes de ${escapedName}">
          ${imageContent}
          ${additionalImagesContent}
        </section>

        <div class="product-summary">
          ${categoryContent}
          <h1>${escapedName}</h1>
          ${renderPrice({ price, salePrice })}
          ${descriptionContent}

          <div class="product-actions" aria-label="Acciones del producto">
            <a class="product-button product-button--primary" href="${escapeHtml(whatsappUrl)}" target="_blank" rel="noopener noreferrer">
              Consultar por WhatsApp
            </a>
            <a class="product-button product-button--secondary" href="${escapeHtml(catalogUrl)}">
              Volver al catálogo
            </a>
          </div>
        </div>
      </article>

      <section class="product-details" aria-labelledby="product-details-heading">
        <div class="product-details__heading">
          <p>Información</p>
          <h2 id="product-details-heading">Detalles del producto</h2>
        </div>
        <dl>${detailRows}</dl>
      </section>
    </main>

    <footer class="site-footer">
      <div class="site-footer__inner">
        <div>
          <p class="site-footer__brand">Nanty Nails Shop</p>
          <p class="site-footer__copy">Tu aliado para transformar tu pasión por la belleza en una profesión rentable.</p>
        </div>
        <nav aria-label="Navegación del pie de página">
          <a href="${escapeHtml(homeUrl)}">Inicio</a>
          <a href="${escapeHtml(catalogUrl)}">Catálogo</a>
        </nav>
      </div>
    </footer>
  </body>
</html>`;
}

module.exports = {
    renderProductPage
};
