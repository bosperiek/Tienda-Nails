document.addEventListener("DOMContentLoaded", function () {

    // --- 1. EFECTO EN EL NAVBAR AL HACER SCROLL ---
    const navbar = document.getElementById('main-navbar');

    window.addEventListener('scroll', function () {
        if (window.scrollY > window.innerHeight - 50) { // Un pequeño ajuste para que se active un poco antes de salir del hero
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // --- 2. LÓGICA PARA CERRAR EL MENÚ MÓVIL (DESPUÉS DEL DESPLIEGUE HACIA ABAJO) ---
    const navbarCollapse = document.getElementById('navbarNav');

    // Función para cerrar el menú
    function closeMobileMenu() {
        // Comprobar si el menú está abierto antes de intentar cerrarlo
        if (navbarCollapse.classList.contains('show')) {
            const bsCollapse = new bootstrap.Collapse(navbarCollapse, { toggle: false });
            bsCollapse.hide();
        }
    }

    // Cerrar el menú al hacer clic en un enlace
    const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            // Cierra el menú después de un breve retraso para permitir la navegación
            setTimeout(closeMobileMenu, 200);
        });
    });

    // --- 3. ANIMACIONES AL HACER SCROLL (Intersection Observer) ---
    const observerOptions = {
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            } else {
                // Opcional: Remover la clase visible si el elemento sale de la vista
                // entry.target.classList.remove('visible');
            }
        });
    }, observerOptions);

    const elementsToAnimate = document.querySelectorAll('.section-title, .card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });


    // --- 4. SCROLL SUAVE PARA LOS ENLACES DE NAVEGACIÓN ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                // Ajustar la altura del navbar para el scroll suave
                const navbarHeight = document.querySelector('#main-navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;

                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // --- 5 y 6. CARRUSEL DE TESTIMONIOS ---
    // - Loop infinito (clonado del set original)
    // - Controles manuales: anterior / pausa-play / siguiente
    // - Pausa al pasar el mouse o tocar (escritorio/móvil)
    // - "Leer más" pausa por completo el carrusel mientras se lee,
    //   y se reanuda cuando el mouse sale de esa tarjeta o el usuario
    //   toca/desliza en otra parte del carrusel.
    (function initTestimonialCarousel() {
        const carousel = document.querySelector('.testimonial-carousel');
        const viewport = document.querySelector('.testimonial-viewport');
        const track = document.getElementById('testimonial-track');
        if (!carousel || !viewport || !track) return;

        // Tarjetas originales (antes de cualquier clonado)
        const originalSlides = Array.from(track.children);
        if (originalSlides.length === 0) return;
        const slideCount = originalSlides.length;

        // Clonamos el set completo y lo añadimos al final para loop infinito.
        originalSlides.forEach(slide => {
            const clone = slide.cloneNode(true);
            clone.setAttribute('aria-hidden', 'true');
            clone.querySelectorAll('[id]').forEach(el => el.removeAttribute('id'));
            track.appendChild(clone);
        });

        // --- Color distintivo por testimonio ---
        // Cada tarjeta recibe un color de un set predefinido, según su
        // posición. Como se asigna por índice (módulo del set de colores),
        // funciona automáticamente aunque agregues más testimonios.
        const accentPalette = ['#e67e9f', '#d8a47f', '#c98ea1', '#e3c08d', '#b98b73', '#caa6c9'];
        Array.from(track.querySelectorAll('.testimonial-card')).forEach((card, idx) => {
            const color = accentPalette[(idx % slideCount) % accentPalette.length];
            card.style.setProperty('--testimonial-color', color);
        });

        let slideWidth = 0;
        let offset = 0; // px desplazados hacia la izquierda
        const speed = 38;          // px por segundo (velocidad normal del giro)
        const slowFactor = 0.22;   // velocidad reducida al pasar mouse/touch encima

        let isInteracting = false; // mouse encima / dedo sobre el carrusel (ralentiza)
        let isReading = false;     // un testimonio está expandido ("leer más") — pausa total
        let isManualPause = false; // tras usar flechas anterior/siguiente — pausa total
        let isJumping = false;     // animación de salto (flechas/puntos) en curso
        let lastTime = null;

        // Calcula el ancho de cada slide en PX según el viewport actual.
        // - Móvil: ~1 tarjeta centrada + fragmentos visibles a los lados (coverflow)
        // - Tablet: 2 tarjetas completas visibles
        // - Escritorio: 3 tarjetas completas visibles
        function recalcSlideWidth() {
            const vw = viewport.getBoundingClientRect().width;
            let slidePx;

            if (vw < 768) {
                slidePx = Math.round(vw * 0.86);
            } else if (vw < 992) {
                slidePx = Math.round(vw / 2);
            } else {
                slidePx = Math.round(vw / 3);
            }

            slideWidth = slidePx;
            track.style.setProperty('--slide-width', slidePx + 'px');

            const total = slideCount * slideWidth;
            offset = total > 0 ? ((offset % total) + total) % total : 0;
            applyOffset();
        }

        function applyOffset() {
            const total = slideCount * slideWidth;
            const display = total > 0 ? ((offset % total) + total) % total : 0;
            track.style.transform = `translateX(${-display}px)`;
        }

        recalcSlideWidth();

        let resizeTimer;
        window.addEventListener('resize', () => {
            clearTimeout(resizeTimer);
            resizeTimer = setTimeout(recalcSlideWidth, 150);
        });

        // --- Puntos indicadores (se generan según el número de testimonios) ---
        const dotsContainer = document.getElementById('testimonial-dots');
        const dots = [];
        if (dotsContainer) {
            for (let i = 0; i < slideCount; i++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', 'Ir al testimonio ' + (i + 1));
                dot.addEventListener('click', () => goToSlide(i));
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }

        let activeIndex = -1;
        function updateActiveDot() {
            if (!dots.length || slideWidth === 0) return;
            const total = slideCount * slideWidth;
            const display = ((offset % total) + total) % total;
            const index = Math.round(display / slideWidth) % slideCount;
            if (index === activeIndex) return;
            if (activeIndex >= 0 && dots[activeIndex]) {
                dots[activeIndex].classList.remove('active');
            }
            activeIndex = index;
            if (dots[activeIndex]) {
                dots[activeIndex].classList.add('active');
            }
        }
        updateActiveDot();

        // --- Giro automático continuo ---
        // - Normal: avanza a velocidad constante.
        // - Hover/touch sobre el carrusel: se hace más lento (no se detiene).
        // - Leyendo un testimonio o tras usar las flechas: pausa total.
        function tick(time) {
            if (lastTime === null) lastTime = time;
            const dt = (time - lastTime) / 1000;
            lastTime = time;

            if (!isJumping && !isReading && !isManualPause) {
                const currentSpeed = isInteracting ? speed * slowFactor : speed;
                const total = slideCount * slideWidth;
                offset += currentSpeed * dt;
                if (total > 0 && offset >= total) offset -= total;
                applyOffset();
                updateActiveDot();
            }
            requestAnimationFrame(tick);
        }
        requestAnimationFrame(tick);

        // --- Salto manual (anterior / siguiente / puntos) con animación suave ---
        function jumpBy(delta, onDone) {
            if (isJumping || slideWidth === 0) return;
            isJumping = true;
            const startOffset = offset;
            const target = offset + delta;
            const duration = 350;
            const startTime = performance.now();

            function step(now) {
                const progress = Math.min((now - startTime) / duration, 1);
                const eased = 1 - Math.pow(1 - progress, 3); // ease-out
                offset = startOffset + (target - startOffset) * eased;
                applyOffset();
                updateActiveDot();
                if (progress < 1) {
                    requestAnimationFrame(step);
                } else {
                    offset = target;
                    applyOffset();
                    updateActiveDot();
                    isJumping = false;
                    lastTime = null;
                    if (onDone) onDone();
                }
            }
            requestAnimationFrame(step);
        }

        // Salta directamente al testimonio "index" (usado por los puntos),
        // recorriendo siempre el camino más corto (adelante o atrás).
        function goToSlide(index) {
            if (slideWidth === 0) return;
            const total = slideCount * slideWidth;
            const display = ((offset % total) + total) % total;
            const targetDisplay = index * slideWidth;
            let diff = targetDisplay - display;
            diff = ((diff % total) + total) % total;
            if (diff > total / 2) diff -= total;
            jumpBy(diff);
        }

        // --- Botones de control: anterior / siguiente ---
        // Centran la tarjeta vecina y pausan el giro por completo hasta
        // que el mouse salga del carrusel o se levante el dedo (móvil).
        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                jumpBy(-slideWidth, () => { isManualPause = true; });
            });
        }
        if (nextBtn) {
            nextBtn.addEventListener('click', () => {
                jumpBy(slideWidth, () => { isManualPause = true; });
            });
        }

        // --- Interacción general: ralentiza (no detiene) el giro ---
        // Al salir del carrusel (mouse o touch) también se libera la
        // pausa manual provocada por las flechas anterior/siguiente.
        carousel.addEventListener('mouseenter', () => { isInteracting = true; });
        carousel.addEventListener('mouseleave', () => {
            isInteracting = false;
            isManualPause = false;
            lastTime = null;
        });

        carousel.addEventListener('touchstart', () => { isInteracting = true; }, { passive: true });
        carousel.addEventListener('touchend', () => {
            isInteracting = false;
            isManualPause = false;
            lastTime = null;
        });
        carousel.addEventListener('touchcancel', () => {
            isInteracting = false;
            isManualPause = false;
            lastTime = null;
        });

        // --- "Leer más": pausa total mientras se lee un testimonio ---
        carousel.addEventListener('click', function (e) {
            const btn = e.target.closest('.read-more-btn');
            if (!btn) return;

            const testimonialText = btn.previousElementSibling;
            if (!testimonialText) return;

            const card = btn.closest('.testimonial-card');

            if (testimonialText.classList.contains('expanded')) {
                testimonialText.classList.remove('expanded');
                btn.textContent = 'Leer más';
                isReading = false;
                lastTime = null;
            } else {
                testimonialText.classList.add('expanded');
                btn.textContent = 'Leer menos';
                isReading = true;

                // Reanuda el giro en cuanto el mouse salga de esta tarjeta
                if (card) {
                    const resume = () => {
                        isReading = false;
                        lastTime = null;
                        card.removeEventListener('mouseleave', resume);
                    };
                    card.addEventListener('mouseleave', resume, { once: true });
                }
            }
        });

        // En táctil: si hay un testimonio expandido y el usuario toca
        // en otra parte del carrusel, reanudamos el giro normal.
        carousel.addEventListener('touchstart', function (e) {
            if (!isReading) return;
            const expandedText = carousel.querySelector('.testimonial-text.expanded');
            if (!expandedText) return;

            const expandedCard = expandedText.closest('.testimonial-card');
            const touchedCard = e.target.closest('.testimonial-card');

            if (touchedCard !== expandedCard) {
                isReading = false;
                lastTime = null;
            }
        }, { passive: true });
    })();

});