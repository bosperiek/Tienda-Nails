'use strict';

const BOOTSTRAP_CSS_URL = 'https://cdn.jsdelivr.net/npm/bootstrap@5.3.2/dist/css/bootstrap.min.css';
const PRICE_FORMATTER = new Intl.NumberFormat('es-MX', {
    style: 'currency',
    currency: 'MXN'
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

function requireNonEmptyString(value, fieldName) {
    if (typeof value !== 'string' || value.trim() === '') {
        throw new TypeError(`${fieldName} debe ser un string no vacío.`);
    }

    return value.trim();
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

    const normalized = value.trim();

    try {
        const parsed = new URL(normalized);
        if (parsed.protocol !== 'http:' && parsed.protocol !== 'https:') {
            if (required) {
                throw new TypeError(`${fieldName} debe utilizar http o https.`);
            }

            return null;
        }

        return normalized;
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

function renderProductPage({ product, canonicalUrl, siteUrl, imageUrl = null } = {}) {
    if (!product || typeof product !== 'object' || Array.isArray(product)) {
        throw new TypeError('product debe ser un producto normalizado.');
    }

    const productId = requireNonEmptyString(product.id, 'product.id');
    const productName = requireNonEmptyString(product.name, 'product.name');
    const safeCanonicalUrl = validateHttpUrl(canonicalUrl, 'canonicalUrl', {
        required: true
    });
    const safeSiteUrl = validateHttpUrl(siteUrl, 'siteUrl', { required: true });
    const safeImageUrl = validateHttpUrl(imageUrl, 'imageUrl');

    const homeUrl = new URL('/', safeSiteUrl).href;
    const catalogUrl = new URL('/tienda.html', safeSiteUrl).href;
    const logoUrl = new URL('/imagenesPrincipal/logo4.svg', safeSiteUrl).href;

    const escapedId = escapeHtml(productId);
    const escapedName = escapeHtml(productName);
    const escapedCategory = escapeHtml(product.category);
    const escapedDescription = escapeHtml(product.description);
    const escapedBrand = escapeHtml(product.brand);
    const escapedAltText = escapeHtml(
        typeof product.altText === 'string' && product.altText.trim() !== ''
            ? product.altText.trim()
            : productName
    );

    const categoryBreadcrumb = product.category
        ? `<li class="breadcrumb-item">${escapedCategory}</li>`
        : '';
    const categoryContent = product.category
        ? `<p class="text-uppercase text-secondary fw-semibold mb-2">${escapedCategory}</p>`
        : '';
    const descriptionContent = product.description
        ? `<section class="mt-4" aria-labelledby="product-description-heading">
              <h2 id="product-description-heading" class="h5">Descripción</h2>
              <p class="mb-0">${escapedDescription}</p>
            </section>`
        : '';
    const brandContent = product.brand
        ? `<dl class="row mt-4 mb-0">
              <dt class="col-auto">Marca</dt>
              <dd class="col mb-0">${escapedBrand}</dd>
            </dl>`
        : '';
    const priceContent = Number.isFinite(product.price) && product.price >= 0
        ? escapeHtml(PRICE_FORMATTER.format(product.price))
        : 'Precio no disponible';
    const imageContent = safeImageUrl
        ? `<figure class="col-12 col-lg-6 mb-4 mb-lg-0">
            <img
              src="${escapeHtml(safeImageUrl)}"
              class="img-fluid rounded shadow-sm product-image"
              alt="${escapedAltText}"
              loading="eager"
              decoding="async"
            >
          </figure>`
        : `<div class="col-12 col-lg-6 mb-4 mb-lg-0">
            <div class="border rounded bg-light p-5 text-center text-secondary">
              Imagen no disponible
            </div>
          </div>`;

    return `<!DOCTYPE html>
<html lang="es">
  <head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${escapedName} | Nanty Nails Shop</title>
    <link rel="canonical" href="${escapeHtml(safeCanonicalUrl)}">
    <link rel="stylesheet" href="${BOOTSTRAP_CSS_URL}">
  </head>
  <body>
    <header class="border-bottom bg-light">
      <div class="container py-3 d-flex flex-wrap align-items-center justify-content-between gap-3">
        <a href="${escapeHtml(homeUrl)}" aria-label="Ir al inicio de Nanty Nails Shop">
          <img
            src="${escapeHtml(logoUrl)}"
            alt="Nanty Nails Shop"
            width="204"
            height="60"
          >
        </a>
        <nav aria-label="Navegación principal">
          <a class="me-3" href="${escapeHtml(homeUrl)}">Inicio</a>
          <a href="${escapeHtml(catalogUrl)}">Catálogo</a>
        </nav>
      </div>
    </header>

    <nav class="container pt-4" aria-label="Migas de pan">
      <ol class="breadcrumb mb-0">
        <li class="breadcrumb-item"><a href="${escapeHtml(homeUrl)}">Inicio</a></li>
        <li class="breadcrumb-item"><a href="${escapeHtml(catalogUrl)}">Catálogo</a></li>
        ${categoryBreadcrumb}
        <li class="breadcrumb-item active" aria-current="page">${escapedName}</li>
      </ol>
    </nav>

    <main class="container py-5">
      <article class="row align-items-start g-5">
        ${imageContent}
        <div class="col-12 col-lg-6">
          ${categoryContent}
          <h1 class="display-6">${escapedName}</h1>
          <p class="fs-3 fw-semibold mt-3 mb-0">${priceContent}</p>
          ${descriptionContent}
          ${brandContent}
          <p class="small text-secondary mt-4 mb-0">Referencia: ${escapedId}</p>
          <p class="mt-4 mb-0">
            <a class="btn btn-outline-dark" href="${escapeHtml(catalogUrl)}">Volver al catálogo</a>
          </p>
        </div>
      </article>
    </main>

    <footer class="border-top py-4">
      <div class="container text-center">
        <a href="${escapeHtml(catalogUrl)}">Explorar el catálogo de Nanty Nails Shop</a>
      </div>
    </footer>
  </body>
</html>`;
}

module.exports = {
    renderProductPage
};
