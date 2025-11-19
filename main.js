document.addEventListener("DOMContentLoaded", function() {

    // --- 1. EFECTO EN EL NAVBAR AL HACER SCROLL ---
    const navbar = document.getElementById('main-navbar');

    window.addEventListener('scroll', function() {
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

    const elementsToAnimate = document.querySelectorAll('.section-title, .card, .testimonial-card');
    elementsToAnimate.forEach(el => {
        observer.observe(el);
    });
    
    
    // --- 4. SCROLL SUAVE PARA LOS ENLACES DE NAVEGACIÓN ---
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if(targetElement) {
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

});


    // --- 5. FUNCIONALIDAD PARA LEER MÁS EN TESTIMONIOS ---
    const readMoreBtns = document.querySelectorAll('.read-more-btn');
    
    readMoreBtns.forEach(btn => {
        btn.addEventListener('click', function(e) {
            // Prevenir propagación del evento
            e.stopPropagation();
            
            // Obtener SOLO el texto de ESTA tarjeta
            const testimonialText = this.previousElementSibling;
            
            // Toggle para ESTA tarjeta únicamente
            if (testimonialText.classList.contains('expanded')) {
                testimonialText.classList.remove('expanded');
                this.textContent = 'Leer más';
            } else {
                testimonialText.classList.add('expanded');
                this.textContent = 'Leer menos';
            }
        });
    });

