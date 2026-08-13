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


    // --- 4. SCROLL SUAVE Y PAUSADO PARA LOS ENLACES INTERNOS ---
    let scrollAnimationId = null;

    function scrollToSection(targetPosition) {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

        if (reduceMotion) {
            window.scrollTo(0, targetPosition);
            return;
        }

        if (scrollAnimationId) cancelAnimationFrame(scrollAnimationId);

        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1050;
        let startTime = null;

        // Curva suave: acelera al comienzo y frena antes de llegar.
        const easeInOutCubic = progress => progress < 0.5
            ? 4 * progress * progress * progress
            : 1 - Math.pow(-2 * progress + 2, 3) / 2;

        function animate(currentTime) {
            if (startTime === null) startTime = currentTime;
            const progress = Math.min((currentTime - startTime) / duration, 1);
            window.scrollTo(0, startPosition + distance * easeInOutCubic(progress));

            if (progress < 1) {
                scrollAnimationId = requestAnimationFrame(animate);
            } else {
                scrollAnimationId = null;
            }
        }

        scrollAnimationId = requestAnimationFrame(animate);
    }

    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const targetId = this.getAttribute('href');
            if (!targetId || targetId === '#') return;

            const targetElement = document.querySelector(targetId);

            if (targetElement) {
                e.preventDefault();
                const navbarHeight = document.querySelector('#main-navbar').offsetHeight;
                const targetPosition = targetElement.getBoundingClientRect().top + window.pageYOffset - navbarHeight;
                scrollToSection(targetPosition);
            }
        });
    });

    // --- 5 y 6. CARRUSEL RESPONSIVE DE TESTIMONIOS ---
    (function initTestimonialCarousel() {
        const carousel = document.querySelector('.testimonial-carousel');
        const viewport = document.querySelector('.testimonial-viewport');
        const track = document.getElementById('testimonial-track');
        if (!carousel || !viewport || !track) return;

        const slides = Array.from(track.children);
        if (slides.length === 0) return;

        const prevBtn = carousel.querySelector('.prev-btn');
        const nextBtn = carousel.querySelector('.next-btn');
        const pauseBtn = carousel.querySelector('.pause-btn');
        const dotsContainer = document.getElementById('testimonial-dots');
        const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
        const accentPalette = ['#e67e9f', '#d8a47f', '#c98ea1', '#e3c08d', '#b98b73', '#caa6c9'];

        slides.forEach((slide, index) => {
            slide.setAttribute('role', 'group');
            slide.setAttribute('aria-roledescription', 'diapositiva');
            slide.setAttribute('aria-label', `${index + 1} de ${slides.length}`);
            const card = slide.querySelector('.testimonial-card');
            const readMore = slide.querySelector('.read-more-btn');
            const color = accentPalette[index % accentPalette.length];
            if (card) card.style.setProperty('--testimonial-color', color);
            if (readMore) readMore.setAttribute('aria-expanded', 'false');
        });

        let currentIndex = 0;
        let visibleSlides = 1;
        let slideWidth = 0;
        let slideGap = 0;
        let autoTimer = null;
        let manuallyPaused = reducedMotion.matches;
        let pointerInside = false;
        let focusInside = false;
        let isReading = false;
        let dots = [];

        function getMaxIndex() {
            return Math.max(0, slides.length - visibleSlides);
        }

        function updatePauseButton() {
            if (!pauseBtn) return;
            const icon = pauseBtn.querySelector('i');
            pauseBtn.setAttribute('aria-pressed', String(manuallyPaused));
            pauseBtn.setAttribute('aria-label', manuallyPaused ? 'Reanudar testimonios' : 'Pausar testimonios');
            if (icon) icon.className = manuallyPaused ? 'bi bi-play-fill' : 'bi bi-pause-fill';
        }

        function shouldAutoPlay() {
            const focusBlocksPlayback = focusInside && document.activeElement !== pauseBtn;
            return !manuallyPaused && !pointerInside && !focusBlocksPlayback && !isReading &&
                !document.hidden && getMaxIndex() > 0;
        }

        function scheduleAutoPlay() {
            window.clearTimeout(autoTimer);
            if (!shouldAutoPlay()) return;
            autoTimer = window.setTimeout(() => {
                goTo(currentIndex + 1);
                scheduleAutoPlay();
            }, 6500);
        }

        function renderDots() {
            if (!dotsContainer) return;
            dotsContainer.innerHTML = '';
            dots = [];
            for (let index = 0; index <= getMaxIndex(); index++) {
                const dot = document.createElement('button');
                dot.type = 'button';
                dot.className = 'carousel-dot';
                dot.setAttribute('aria-label', `Mostrar grupo de testimonios ${index + 1}`);
                dot.addEventListener('click', () => {
                    goTo(index);
                    scheduleAutoPlay();
                });
                dotsContainer.appendChild(dot);
                dots.push(dot);
            }
        }

        function updateSlideAccessibility() {
            slides.forEach((slide, index) => {
                const isVisible = index >= currentIndex && index < currentIndex + visibleSlides;
                slide.setAttribute('aria-hidden', String(!isVisible));
                slide.querySelectorAll('button, a').forEach(control => {
                    control.tabIndex = isVisible ? 0 : -1;
                });
            });

            dots.forEach((dot, index) => {
                const isActive = index === currentIndex;
                dot.classList.toggle('active', isActive);
                if (isActive) dot.setAttribute('aria-current', 'true');
                else dot.removeAttribute('aria-current');
            });
        }

        function applyPosition(animate = true) {
            track.classList.toggle('no-transition', !animate);
            track.style.transform = `translate3d(${-currentIndex * (slideWidth + slideGap)}px, 0, 0)`;
            if (!animate) {
                requestAnimationFrame(() => track.classList.remove('no-transition'));
            }
            updateSlideAccessibility();
        }

        function goTo(index, animate = true) {
            const maxIndex = getMaxIndex();
            if (index < 0) currentIndex = maxIndex;
            else if (index > maxIndex) currentIndex = 0;
            else currentIndex = index;
            applyPosition(animate);
        }

        function updateReadMoreVisibility() {
            slides.forEach(slide => {
                const text = slide.querySelector('.testimonial-text');
                const button = slide.querySelector('.read-more-btn');
                if (!text || !button || text.classList.contains('expanded')) return;
                button.hidden = text.scrollHeight <= text.clientHeight + 1;
            });
        }

        function recalculateLayout() {
            const viewportWidth = viewport.getBoundingClientRect().width;
            visibleSlides = viewportWidth < 768 ? 1 : viewportWidth < 992 ? 2 : 3;
            slideGap = parseFloat(getComputedStyle(track).columnGap) || 0;
            slideWidth = (viewportWidth - slideGap * (visibleSlides - 1)) / visibleSlides;
            track.style.setProperty('--slide-width', `${slideWidth}px`);
            currentIndex = Math.min(currentIndex, getMaxIndex());
            renderDots();
            applyPosition(false);
            requestAnimationFrame(updateReadMoreVisibility);
            scheduleAutoPlay();
        }

        prevBtn?.addEventListener('click', () => {
            goTo(currentIndex - 1);
            scheduleAutoPlay();
        });

        nextBtn?.addEventListener('click', () => {
            goTo(currentIndex + 1);
            scheduleAutoPlay();
        });

        pauseBtn?.addEventListener('click', () => {
            manuallyPaused = !manuallyPaused;
            updatePauseButton();
            scheduleAutoPlay();
        });

        carousel.addEventListener('mouseenter', () => {
            pointerInside = true;
            scheduleAutoPlay();
        });

        carousel.addEventListener('mouseleave', () => {
            pointerInside = false;
            scheduleAutoPlay();
        });

        carousel.addEventListener('focusin', () => {
            focusInside = true;
            scheduleAutoPlay();
        });

        carousel.addEventListener('focusout', event => {
            if (!carousel.contains(event.relatedTarget)) {
                focusInside = false;
                scheduleAutoPlay();
            }
        });

        viewport.addEventListener('keydown', event => {
            if (event.key === 'ArrowLeft') {
                event.preventDefault();
                goTo(currentIndex - 1);
                scheduleAutoPlay();
            } else if (event.key === 'ArrowRight') {
                event.preventDefault();
                goTo(currentIndex + 1);
                scheduleAutoPlay();
            }
        });

        let dragStartX = 0;
        let dragDistance = 0;
        let isDragging = false;

        viewport.addEventListener('pointerdown', event => {
            if (event.pointerType === 'mouse') return;
            isDragging = true;
            dragStartX = event.clientX;
            dragDistance = 0;
            track.classList.add('dragging');
            viewport.setPointerCapture?.(event.pointerId);
            window.clearTimeout(autoTimer);
        });

        viewport.addEventListener('pointermove', event => {
            if (!isDragging) return;
            dragDistance = event.clientX - dragStartX;
            const basePosition = -currentIndex * (slideWidth + slideGap);
            track.style.transform = `translate3d(${basePosition + dragDistance}px, 0, 0)`;
        });

        function finishDrag() {
            if (!isDragging) return;
            isDragging = false;
            track.classList.remove('dragging');
            if (dragDistance < -50) goTo(currentIndex + 1);
            else if (dragDistance > 50) goTo(currentIndex - 1);
            else applyPosition();
            scheduleAutoPlay();
        }

        viewport.addEventListener('pointerup', finishDrag);
        viewport.addEventListener('pointercancel', finishDrag);

        carousel.addEventListener('click', function (e) {
            const btn = e.target.closest('.read-more-btn');
            if (!btn) return;

            const testimonialText = btn.previousElementSibling;
            if (!testimonialText) return;

            const willExpand = !testimonialText.classList.contains('expanded');
            slides.forEach(slide => {
                const text = slide.querySelector('.testimonial-text');
                const button = slide.querySelector('.read-more-btn');
                if (text !== testimonialText) text?.classList.remove('expanded');
                if (button !== btn && button) {
                    button.textContent = 'Leer más';
                    button.setAttribute('aria-expanded', 'false');
                }
            });

            testimonialText.classList.toggle('expanded', willExpand);
            btn.textContent = willExpand ? 'Leer menos' : 'Leer más';
            btn.setAttribute('aria-expanded', String(willExpand));
            isReading = willExpand;
            scheduleAutoPlay();
        });

        document.addEventListener('visibilitychange', scheduleAutoPlay);

        reducedMotion.addEventListener?.('change', event => {
            if (event.matches) manuallyPaused = true;
            updatePauseButton();
            scheduleAutoPlay();
        });

        let resizeTimer;
        window.addEventListener('resize', () => {
            window.clearTimeout(resizeTimer);
            resizeTimer = window.setTimeout(recalculateLayout, 150);
        });

        updatePauseButton();
        recalculateLayout();
        document.fonts?.ready.then(updateReadMoreVisibility);
    })();

});
