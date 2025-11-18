# Blueprint: Nantynails - Academia y Tienda Online

## Descripción General

Este proyecto es un sitio web para "Nantynails", una plataforma que ofrece cursos de manicura, insumos para profesionales y servicios de asesoría personalizada. El objetivo es proporcionar una presencia online profesional, atractiva y fácil de usar para captar tanto a estudiantes como a clientes de negocio.

## Estilo, Diseño y Características Implementadas

### **Diseño y Estilo (Versión Actual)**

*   **Maquetación:** Se utiliza Bootstrap para la estructura general y CSS Grid/Flexbox para un diseño responsive y mobile-first.
*   **Iconografía:** Se utilizan Bootstrap Icons y Font Awesome para una amplia gama de iconos.
*   **Componentes:**
    *   **Navbar:** Barra de navegación fija en la parte superior, con fondo oscuro. **El enlace a "Testimonios" ha sido eliminado.**
    *   **Hero Section:** Sección principal de bienvenida con una **imagen de fondo fija (`nailshands.png`) con efecto parallax**. El texto se superpone de forma legible gracias a un *overlay* semi-transparente. El botón "Explorar opciones" ahora tiene una clase específica (`btn-hero`) para estilos personalizados.
    *   **Sección "Encuentra tu Camino":** Utiliza tarjetas con imágenes de cabecera evocadoras, con un contenedor de imagen de altura fija y un efecto de zoom suave al pasar el ratón. Las tarjetas tienen transiciones más suaves en sus efectos hover.
    *   **Secciones de Contenido:** Secciones dedicadas para Cursos, Insumos y Servicios Personalizados.
    *   **Tarjetas:** Componentes tipo "card" con un aspecto limpio y moderno, sombras suaves y bordes redondeados. Incluyen imagen, título, descripción, precio y un botón de acción. Las transiciones de hover son más suaves.
    *   **Footer:** Pie de página con un **color oscuro intenso** (`--navbar-footer-color`) y **más secciones de información**, incluyendo una descripción de la empresa, enlaces rápidos, contacto, horarios de atención. **Los enlaces a Twitter y YouTube han sido reemplazados por un enlace a TikTok. La sección de suscripción a boletines ha sido eliminada.**
    *   **Botón Flotante Personalizado:** Un botón flotante con texto "Contáctanos" y un icono (configurable) en lugar del botón de WhatsApp. Cuenta con un efecto de `glow` alrededor que es personalizable en color (`--glow-color`) y color de fondo (`--button-float-bg`), con el texto y el icono en blanco (`--button-float-text`). Es responsivo.
*   **Paleta de Colores (Temática clara, cálida y vibrante):**
    *   **Fondo principal:** `--background-color: #f8f0ed;` (blanco roto más cálido)
    *   **Texto primario:** `--primary-color: #3b2f2f;` (marrón oscuro profundo)
    *   **Texto secundario:** `--secondary-color: #6a5d5d;` (gris-marrón medio)
    *   **Acento principal (botones, detalles):** `--accent-color: #e67e9f;` (rosa salmón más vibrante)
    *   **Color de hover (interactivo):** `--hover-color: #d85c82;` (rosa más intenso)
    *   **Fondo de tarjetas:** `--card-background-color: #ffffff;` (blanco puro)
    *   **Navbar y Footer:** `--navbar-footer-color: #2c2121;` (marrón muy oscuro/negro)
    *   **Color de Glow del Botón Flotante:** `--glow-color: #e67e9f;` (el mismo rosa salmón que el acento)
    *   **Color de Fondo del Botón Flotante:** `--button-float-bg: #e67e9f;`
    *   **Color de Texto/Icono del Botón Flotante:** `--button-float-text: #ffffff;`
*   **Tipografía:**
    *   **Títulos:** "Playfair Display", serif (elegante y sofisticada).
    *   **Cuerpo del texto:** "Montserrat", sans-serif (limpia y legible).
*   **Interactividad y Animaciones:**
    *   **Animación de entrada (Fade-in on Scroll):** Títulos de sección, tarjetas y testimonios aparecen suavemente al hacerse visibles en el viewport.
    *   **Efecto `hover` en Navbar y Footer:** Los enlaces cambian de color al pasar el ratón.
    *   **Efecto `hover` en logo:** Ligera escala al pasar el ratón.
    *   **Efecto `hover` en botones:** Cambian de color, se elevan ligeramente y tienen una sombra suave.
    *   **Efecto `hover` en `service-card` (tarjetas de 'Encuentra tu Camino'):** La tarjeta se eleva sutilmente y la imagen de cabecera (`service-card-img`) realiza un zoom suave.
    *   **Efecto `hover` en `card-img-top` (imágenes de cursos/insumos):** Zoom sutil al pasar el ratón para destacar el producto/curso con transiciones suaves.
    *   **Efecto `hover` en el Botón Flotante:** Transformación de traslación y escala, con una sombra (`box-shadow`) que crea el efecto de `glow` utilizando `--glow-color`.
    *   **Scroll Suave:** Navegación suave entre secciones con un offset para el navbar fijo.

### **Funcionalidades Implementadas**

*   **Diseño Responsivo:** El sitio se adapta a diferentes tamaños de pantalla, con ajustes específicos para el efecto parallax en móviles y el botón flotante.
*   **Contenido Estático:** Toda la información se presenta de forma estática en el archivo `index.html`.

---
## Plan de Acción para la Solicitud Actual

*   **Modificaciones en `index.html`:**
    *   **Navegación:** Eliminación del `nav-item` y `nav-link` correspondiente a "Testimonios".
    *   **Footer:** Sustitución de los enlaces a Facebook y YouTube por un enlace a TikTok en la sección de redes sociales. Eliminación completa de la sección "Suscríbete" (título, párrafo y formulario).
    *   **Botón Flotante:** Reemplazo del botón flotante de WhatsApp por un nuevo botón `<a>` con la clase `floating-button`, que incluye un icono (`<i class="bi bi-chat-dots-fill"></i>`) y el texto "Contáctanos". Este botón ahora enlaza directamente al footer (`#footer`).
*   **Modificaciones en `css/style.css`:**
    *   **Variables de Color:** Se han añadido nuevas variables CSS (`--glow-color`, `--button-float-bg`, `--button-float-text`) para facilitar la personalización del botón flotante.
    *   **Botón del Hero Section:** Se ha creado la clase `.btn-hero` para aplicar estilos específicos al botón de la sección principal, diferenciándolo de otros botones `btn-primary`.
    *   **Botón Flotante:** Se han definido los estilos para `.floating-button`, incluyendo su posición fija, tamaño, colores de fondo y texto, y el efecto de `glow` al pasar el ratón, controlando el color del `glow` con `--glow-color`. Se han añadido media queries para asegurar su responsividad en dispositivos móviles.

## Historial de Cambios Recientes
*   **Ajuste de Colores de la Página y Mejora del Footer:**
    *   **CSS:** Se ha actualizado la paleta de colores en `:root` para utilizar tonos más llamativos y con mejor contraste, incluyendo un rosa salmón vibrante como color de acento y un marrón oscuro profundo para el texto principal. Se ajustaron los colores del texto y enlaces para asegurar la legibilidad.
    *   **CSS:** Se ha establecido un color oscuro intenso (`--navbar-footer-color`) para el fondo del footer y se ha asegurado que el texto tenga un color claro (`#f8f0ed`) para un buen contraste.
    *   **HTML:** Se ha expandido la información en el footer, añadiendo una breve descripción de la empresa, una sección de "Contacto y Horarios" con dirección, teléfono, email y horarios de atención, y un simple formulario de suscripción a un boletín informativo.
*   **Ajuste del Hero Section y Navegación:**
    *   **CSS:** Se ha añadido un overlay semitransparente al `hero-section` para oscurecer la imagen de fondo y garantizar la legibilidad del texto.
    *   **CSS:** Se ha modificado el menú de navegación en dispositivos móviles para que tenga un fondo oscuro semitransparente, asegurando que los enlaces sean legibles independientemente del contenido de la página.
    *   **HTML:** Se ha añadido un `div` contenedor para el contenido del `hero-section` para separarlo del fondo y aplicar el overlay correctamente.
*   **Refinamiento de Sección "Encuentra tu Camino" (Imágenes y Animaciones)**: Se eliminaron los iconos de la sección "Encuentra tu Camino" en `index.html`, sustituyéndolos por imágenes de cabecera en cada tarjeta. Se ajustaron los estilos en `css/style.css` para controlar el tamaño de las imágenes, suavizar las transiciones de los efectos `hover` en las tarjetas y en las imágenes de cabecera, y se eliminaron las clases y animaciones de los iconos no utilizados.
*   **Implementación de Nuevas Animaciones**: Se añadieron efectos de `hover` para los iconos de la sección "Encuentra tu Camino" (escala y pulso) y para las imágenes de las tarjetas de cursos e insumos (zoom sutil), mejorando la interactividad y atractivo visual. (Parcialmente obsoleto por el cambio anterior).
*   **Corrección de Scroll Suave**: Se ajustó el script de scroll suave en `main.js` para incluir un offset que compensa la altura del navbar fijo, asegurando que las secciones se visualicen completamente al navegar.
*   **Inclusión de Animaciones y Enlace JS**: Se añadió el script `main.js` al `index.html` para habilitar las animaciones de "fade-in" al hacer scroll. También se incorporaron las nuevas fuentes de Google Fonts directamente en el HTML y se eliminó el script de scroll suave antiguo.
*   **Reestructuración de Estilos (Colores, Fuentes, Animaciones)**: Se implementó una paleta de colores claros y una tipografía más elegante (`Playfair Display` para títulos, `Montserrat` para texto) en `css/style.css`, buscando un diseño femenino y atractivo. Se añadieron animaciones sutiles (`fade-in` y efectos de `hover`) a varios elementos para mejorar la interactividad, manteniendo el navbar y el footer en colores oscuros para contraste.
*   **Transformación de Hero Section (Video a Imagen Parallax)**: Se eliminó el video de fondo de la sección "Hero" en `index.html`. Se configuró la imagen `nailshands.png` como fondo estático con un efecto parallax (`background-attachment: fixed;`) en `css/style.css`, incluyendo adaptaciones para su visualización en dispositivos móviles.
*   **Optimización de Video de Fondo en Hero Section**: Se añadió el formato `.mp4` como fuente alternativa y una imagen `poster` (`nantynails-hero.png`) para mejorar la compatibilidad y la experiencia de carga del video de fondo. (Obsoleto por el cambio a imagen parallax).
*   **Video de Fondo en Hero Section**: Se integró `videotiendanails.webm` como video de fondo en la sección "Hero". Se añadieron estilos en `css/style.css` para posicionar el video, crear un *overlay* para legibilidad del texto y asegurar la responsividad. (Obsoleto por el cambio a imagen parallax).
*   **Integración de Font Awesome**: Se añadió la librería de Font Awesome para tener acceso a una gama más amplia de iconos. Se reemplazó el icono de la sección "Para tu Negocio" por `<i class="fa-solid fa-store"></i>`.
*   **Mejora del Botón de WhatsApp**: Se aplicaron estilos dedicados al botón flotante de WhatsApp. Ahora tiene un color de fondo verde distintivo, una sombra para dar profundidad y un efecto de escala al pasar el ratón por encima para mejorar la interactividad.
