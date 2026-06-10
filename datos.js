const misProductos = [
    {
        "category": "Fantasy Nails",
        "data": "Diluyente Restaurador de Esmalte Activgel Fantasy Nails 118 ml",
        "data2": "$50.00",
        "altTexto": "Diluyente Activgel Fantasy Nails para restaurar la densidad de esmaltes y geles, botella blanca de 118ml con tapa rosa y fórmula profesional.",
        "image": "imagenes/diluyente-activgel-fantasy-nails-restaurador-esmalte-118ml.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Polvo Acrílico Colección Acuaria Tono Baby Aqua Mint Fantasy Nails 1oz",
        "data2": "$80.00",
        "altTexto": "Acrílico Colección Acuaria Fantasy Nails tono Baby Aqua Mint, mostrando un bote de 1oz de polvo acrílico de color verde menta suave pastel ideal para técnicas de baby boomer o diseños marinos.",
        "image": "imagenes/acrilico-coleccion-acuaria-fantasy-nails-baby-aqua-mint-1oz.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Polvo Acrílico Make-Cover Tono Almond Mix Fantasy Nails 1oz",
        "data2": "$80.00",
        "altTexto": "Acrílico Make-Cover Fantasy Nails tono Almond Mix, bote de 1oz de polvo acrílico color nude almendra diseñado para maquillaje de uñas y técnica de reversa.",
        "image": "imagenes/polvo-acrilico-make-cover-almond-mix-fantasy-nails-1oz-nude.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Gel Base Coat Paso 1 Fantasy Nails Adherencia Pro UV 15 ml",
        "data2": "$70.00",
        "altTexto": "Base Coat Fantasy Nails Paso 1, presentación en caja de 15ml de gel base transparente Pro UV diseñado para adherir los colores de gel a la uña natural.",
        "image": "imagenes/gel-base-coat-fantasy-nails-adherencia-uv-15ml.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Gel Base Traslúcida Colección Candy Fantasy Nails 15ml",
        "data2": "$70.00",
        "altTexto": "Gel Base Traslúcida Candy Fantasy Nails en presentación de 15ml, mostrando el empaque de este gel de adherencia con color translúcido suave tipo jelly ideal para manicuras naturales.",
        "image": "imagenes/gel-base-traslucida-candy-fantasy-nails-efecto-jelly-color-suave.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 10",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-10.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Sticker navidad 7",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/sticker-navidad-7.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 3",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-3.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 4",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-4.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 5",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-5.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 6",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-6.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 8",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-8.webp"
    },
    {
        "category": "temporada-navidad",
        "data": "Stiker navidad 9",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-navidad-9.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Aceite de cutícula Fantasy Nails",
        "data2": "$30.00",
        "altTexto": "Aceite hidratante para cutícula Fantasy Nails color rosa, tratamiento reparador para finalizar la manicura y cuidar la piel",
        "image": "imagenes/aceite-para-cuticula-rosa-fantasy-nails.webp"
    },
    {
        "category": "organic",
        "data": "Brillo de uñas sin lámpara Orgánic",
        "data2": "$35.00",
        "altTexto": "Brillo finalizador Ultra Bright de Organic Nails, top coat de secado rápido sin lámpara para dar acabado cristalino a uñas naturales y acrílicas.",
        "image": "imagenes/brillo-ultra-bright-organic-nails-secado-al-aire.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker anime",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-anime.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker destello",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-destello.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker dorado",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-dorado.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker flor y trazos",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-flor-y-trazos.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker flores",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-flores.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker letra gótica camaleón",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-letra-g-tica-camale-n.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker letras",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-letras.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker marcas camaleón",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/stiker-marcas-camale-n.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker marcas modelo 1",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/stiker-marcas-modelo-1.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker mariposa",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-mariposa.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker mariposa grande tornasol",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/stiker-mariposa-grande-tornasol.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker mariposa negro",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-mariposa-negro.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker para 3D",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-para-3d.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker personajes de caricatura",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/stiker-personajes-de-caricatura.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker princesas",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/stiker-princesas.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker serpiente 1",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-serpiente-1.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker serpiente 2",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-serpiente-2.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker serpiente 3",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-serpiente-3.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker serpiente y corazón",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-serpiente-y-coraz-n.webp"
    },
    {
        "category": "stiker",
        "data": "Stiker variado",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/stiker-variado.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Removedor de gel Xioya",
        "data2": "$45.00",
        "image": "imagenes/removedor-de-gel-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Base coat miss cherry",
        "data2": "$30.00",
        "altTexto": "Base Coat Miss Cherry formulada con 2% de calcio extra, curado en lámpara UV/LED, presentación de 10 ml para proteger la uña natural.",
        "image": "imagenes/base-coat-miss-cherry-con-calcio-uv-led-10ml.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Base rubber cristal",
        "data2": "$35.00",
        "altTexto": "Base Rubber Gel marca RJ tono Cristal (transparente), base niveladora de alta viscosidad y flexible curada en lámpara UV/LED, presentación de 15 ml.",
        "image": "imagenes/base-rubber-gel-rj-cristal-transparente-15ml.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Base rubber lechoso kalanzi",
        "data2": "$35.00",
        "altTexto": "Base Rubber marca Kalanzi tono Lechoso (blanco milky), gel nivelador soak-off para lámpara UV/LED en presentación de 10 ml.",
        "image": "imagenes/base-rubber-lechoso-kalanzi-uv-led-10ml.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Blanco lechoso miss cherry",
        "data2": "$40.00",
        "altTexto": "Gel semipermanente Miss Cherry tono Blanco Lechoso (Milky White), esmalte de 10 ml ideal para diseños efecto baño de leche.",
        "image": "imagenes/gel-blanco-lechoso-miss-cherry-10ml.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Decoración metálica navideña",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/decoracion-metalica-navidena-dorada-mix-arboles-copos.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Foil para Uñas Navidad",
        "data2": "$10.00",
        "altTexto": "Papel foil para uñas con fondo negro y diseños navideños holográficos plateados, incluyendo Santa Claus, galletas de jengibre, pinos y copos de nieve.",
        "image": "imagenes/foil-transfer-unas-navidad-negro-holografico.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Foil para Uñas Navidad Transparente",
        "data2": "$10.00",
        "altTexto": "Papel foil para uñas con fondo transparente y diseños navideños holográficos plateados, incluyendo copos de nieve, muñecos de jengibre, ángeles y árboles.",
        "image": "imagenes/foil-transfer-unas-navidad-transparente-plata-holografico.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Foil Navideño copos de nieve",
        "data2": "$10.00",
        "altTexto": "Rollo de papel foil para transferencia en uñas con diseño de copos de nieve blancos sobre fondo transparente, ideal para decoración navideña y efectos invernales.",
        "image": "imagenes/papel-foil-navideno-copos-de-nieve-blancos-transparentes.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel Blanco miss cherry",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/gel-blanco-miss-cherry.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel de construcción blanco xioya",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/gel-de-construcci-n-blanco-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel de construcción Xioya",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/gel-de-construcci-n-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel Dorado Xioya",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-dorado-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel negro JR",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-negro-jr.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel negro miss cherry",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/gel-negro-miss-cherry.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel ojo de gato laser kalanzi",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/gel-ojo-de-gato-laser-kalanzi.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel ojo de gato plata JR",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/gel-ojo-de-gato-plata-jr.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel plata Xioya",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-plata-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Gel spider Reflectivo dorado o plata",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/gel-spider-reflectivo-dorado-o-plata.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Painting gel blanco o negro kalanzi",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/painting-gel-blanco-o-negro-kalanzi.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Pegamento para cristales kalanzi",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/pegamento-para-cristales-kalanzi.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Pegamento para foil sin lámpara",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/pegamento-para-foil-sin-l-mpara.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Poligel sólido Xioya",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/poligel-s-lido-xioya.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Primer adherente sin ácido",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/primer-adherente-sin-cido.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Primer Ultra bond miss cherry",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/primer-ultra-bond-miss-cherry.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Rubber 2 en 1  base y top Le mussa",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/rubber-2-en-1-base-y-top-le-mussa.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Top coat miss cherry / brillo finalizador",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/top-coat-miss-cherry-brillo-finalizador.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Top coat Xioya sin capa de inhibición",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/top-coat-xioya-sin-capa-de-inhibici-n.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Top Diamante Le mussa / reflectivo",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/top-diamante-le-mussa-reflectivo.webp"
    },
    {
        "category": "basicos-economicos",
        "data": "Top laser plata JR",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/top-laser-plata-jr.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Burbujas de cristal para encapsulado",
        "data2": "$20.00",
        "altTexto": "Decoración para uñas tipo burbujas de cristal transparentes (balines de vidrio) en varios tamaños, ideales para diseños de encapsulado y efecto gotas de agua.",
        "image": "imagenes/burbujas-de-cristal-transparente-para-encapsulado-decoracion-unas.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cajita cristal variado",
        "data2": "$40.00",
        "altTexto": "Set de cajas con cristales para uñas marca Miss Cherry, mix de formas y tamaños variados en tonos clásicos para decoración y pedrería.",
        "image": "imagenes/caja-cristales-mix-formas-y-tamanos-miss-cherry.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cartera cristal negro",
        "data2": "$60.00",
        "altTexto": "Cartera de cristales para uñas marca JR color negro, paquete con mix de tamaños variados para decoración y pedrería nail art.",
        "image": "imagenes/cartera-cristales-negros-jr-nail-art-mix-tamanos.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cartera cristal rojo",
        "data2": "$60.00",
        "altTexto": "Cartera de cristales para uñas marca JR Nail Art color rojo, paquete de 1440 piezas con mix de tamaños para decoración y pedrería.",
        "image": "imagenes/cartera-cristales-rojos-jr-nail-art-mix-tamanos.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cerezas rojas y rosas",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos con forma de cerezas y cristales incrustados en colores rojo, rosa y plata, decoración 3D brillante para diseño de uñas.",
        "image": "imagenes/dijes-cerezas-cristal-rojas-rosas-decoracion-unas.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Copos navideños",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos 3D con forma de copos de nieve navideños en colores dorado y plateado con cristales, decoración elegante para temporada invernal.",
        "image": "imagenes/dijes-copos-de-nieve-metalicos-navidenos-dorado-y-plata.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Corazón rosa blanco y negro",
        "data2": "$20.00",
        "altTexto": "Decoración para uñas tipo confetti en forma de corazones, mezcla de colores rosa, blanco y negro mate ideal para encapsulado y diseños románticos.",
        "image": "imagenes/decoracion-unas-confetti-corazones-rosa-blanco-negro.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cristal #20",
        "data2": "$120.00",
        "altTexto": "Bolsas de cristales para uñas tamaño SS20 en colores surtidos (azul, rojo, dorado y negro), pedrería de fondo plano ideal para decoración y nail art.",
        "image": "imagenes/paquete-cristales-ss20-colores-variados-decoracion-unas.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cristal figura rojo",
        "data2": "$88.00",
        "altTexto": "Cartera de cristales para uñas marca Moongirl en color rojo, surtido de figuras variadas (mix de formas) para decoración y nail art.",
        "image": "imagenes/cartera-cristales-figuras-rojas-mix-moongirl.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cartera de Cristales Tornasol SS12 (1440 piezas)",
        "data2": "$42.00",
        "altTexto": "Paquete de cristales para uñas color tornasol (AB) tamaño SS12, cartera con 1440 piezas de corte brillante para decoración y pedrería.",
        "image": "imagenes/cartera-cristales-tornasol-ss12-1440-piezas-decoracion.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cartera de Cristales Tornasol SS20 Jr",
        "data2": "$80.00",
        "altTexto": "Cartera de cristales para uñas marca Jr en color tornasol (efecto AB) tamaño SS20, pedrería brillante para decoración y nail art.",
        "image": "imagenes/cartera-cristales-tornasol-ss20-jr-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Cristal tornasol #30",
        "data2": "$60.00",
        "altTexto": "Paquete de cristales para uñas color tornasol (AB) tamaño grande SS30, cartera con 288 piezas brillantes para decoración y pedrería.",
        "image": "imagenes/cartera-cristales-tornasol-ss30-288-piezas-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes de Cruz Plata con Cristales 3D para Uñas",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos 3D en forma de cruz color plata con cristales incrustados, decoración brillante estilo gótico o elegante para diseño de uñas.",
        "image": "imagenes/dijes-cruz-plata-con-cristales-3d-nail-art-plata.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes de Cruz Dorada con Cristales 3D para Uñas",
        "data2": "$20.00",
        "altTexto": "Mix de dijes metálicos en forma de cruz color dorado con incrustaciones de cristal, decoración 3D con diseños variados para uñas elegantes.",
        "image": "imagenes/dijes-cruz-dorada-metalica-con-cristales-3d-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Corazón 3D Texturizados - Dorado y Plata",
        "data2": "$20.00",
        "altTexto": "Set de dijes metálicos para uñas con forma de corazón y textura brillante en colores dorado y plateado sobre fondo rosa.",
        "image": "imagenes/dijes-corazon-3d-metal-dorado-plata-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes de flor cristal zirconia oro 3D",
        "data2": "$20.00",
        "altTexto": "Dijes de joyería para uñas con diseño de flor brillante hechos de metal dorado y cristales tipo zirconia corte marquise para decoración elegante.",
        "image": "imagenes/dijes-joyeria-flor-cristal-zirconia-oro-3d.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Resina Kawaii Kitty y Kuromi 3D",
        "data2": "$20.00",
        "altTexto": "Mix de dijes de resina para uñas con figuras de personajes kawaii como Hello Kitty y Kuromi en colores rosa y negro para decoración 3D.",
        "image": "imagenes/dijes-resina-kawaii-kitty-kuromi-anime-3d.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Mariposa Metal y Perlas 3D",
        "data2": "$20.00",
        "altTexto": "Set de dijes metálicos 3D en forma de mariposa con incrustaciones de perlas en colores dorado y plateado para decoración de uñas elegante.",
        "image": "imagenes/dijes-mariposa-con-perlas-metal-oro-plata-3d.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Gato Metal con Cristales y Moño",
        "data2": "$20.00",
        "altTexto": "Set de dijes metálicos para uñas con figura de gato sentado y moño decorados con cristales strass en colores plata dorado rojo y rosa.",
        "image": "imagenes/dijes-gato-metal-cristales-mono-strass-kawaii.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Hoja Cannabis Verde 3D",
        "data2": "$20.00",
        "altTexto": "Set de dijes metálicos para uñas con diseño de hoja de marihuana cannabis en color verde brillante con borde dorado para decoración nail art.",
        "image": "imagenes/dijes-hoja-marihuana-cannabis-verde-metal-dorado-3d.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes de Ojo Turco (Mal de Ojo) con Cristales para Uñas",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos en forma de Ojo Turco con incrustaciones de cristales brillantes y centro azul, decoración protectora y mística para diseño de uñas.",
        "image": "imagenes/set-dijes-ojo-turco-con-cristales-rhinestone-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes San Judas Tadeo 3D Metal y Zirconia",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos para uñas con la figura de San Judas Tadeo en acabados dorado y verde esmaltado con incrustaciones de cristales tipo zirconia.",
        "image": "imagenes/dijes-san-judas-tadeo-metal-verde-oro-3d-nail-art.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Metálicos Signos del Zodiaco (Dorados y Blancos) para Uñas",
        "data2": "$20.00",
        "altTexto": "Estuche con dijes metálicos en forma de los nombres de los 12 signos del zodiaco, disponibles en colores dorado y blanco para personalizar diseños de uñas astrológicos.",
        "image": "imagenes/set-dijes-signos-zodiaco-metalicos-dorado-blanco-unas.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dije Nail Art 3D Escuadra Pistola Metal Dorado",
        "data2": "$20.00",
        "altTexto": "Dijes metálicos dorados para decoración de uñas con diseño 3D de pistola tipo escuadra.",
        "image": "imagenes/dije-nail-art-3d-pistola-escuadra-dorado.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Manita de Fátima",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/manita-de-f-tima.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Mariposa con cristales",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/mariposa-con-cristales.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Mariposa Grande rosa blanco y negro",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/mariposa-grande-rosa-blanco-y-negro.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Mariposas rosa blanco y negro",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/mariposas-rosa-blanco-y-negro.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Metralleta dorada",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/metralleta-dorada.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Par de herraduras",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/par-de-herraduras.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Caja grande de moñitos coquett",
        "data2": "$90.00",
        "altTexto": "Caja organizadora con decoración para uñas de moños (lazos) estilo Coquette en 3D, surtido de colores traslúcidos y sólidos para diseños kawaii y nail art.",
        "image": "imagenes/caja-decoracion-unas-monos-coquette-3d-colores-variados.webp"
    },
    {
        "category": "dijes-y-cristales",
        "data": "Dijes Metálicos de Moño (Lazos) 3D para Uñas",
        "data2": "$50.00",
        "altTexto": "Estuche con dijes metálicos en forma de moños (lazos) en colores dorado y plateado, decoración 3D con textura y relieve para diseños de uñas estilo coquette o elegante.",
        "image": "imagenes/set-dijes-monos-metalicos-3d-dorado-y-plateado-unas.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Long coffin miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/long-coffin-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Medium COFFIN miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/medium-coffin-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Pegamento para Tips press on",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/pegamento-para-tips-press-on.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip cuadrado cristal fantasy",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/tip-cuadrado-cristal-fantasy.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "TIP cuadrado sin curva C (bambú)",
        "data2": "$140.00",
        "altTexto": "",
        "image": "imagenes/tip-cuadrado-sin-curva-c-bamb.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip dual coffin",
        "data2": "$65.00",
        "altTexto": "",
        "image": "imagenes/tip-dual-coffin.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip dual grande",
        "data2": "$52.00",
        "altTexto": "",
        "image": "imagenes/tip-dual-grande.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip dual xxl c",
        "data2": "$75.00",
        "altTexto": "",
        "image": "imagenes/tip-dual-xxl-c.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip Long coffin recto",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/tip-long-coffin-recto.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tip punta de arco blanco MC",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tip-punta-de-arco-blanco-mc.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "TIP SHORT FRENCH miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tip-short-french-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips 3xl para press on",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/tips-3xl-para-press-on.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips Almendra",
        "data2": "$60.00",
        "altTexto": "",
        "image": "imagenes/tips-almendra.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips balerina 100 pzas Fantasy",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/tips-balerina-100-pzas-fantasy.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips bamboo (square sin curva C)",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/tips-bamboo-square-sin-curva-c.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips coffin 100 pzas",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/tips-coffin-100-pzas.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips coffin 3xl",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/tips-coffin-3xl.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips coffin extra short",
        "data2": "$60.00",
        "altTexto": "",
        "image": "imagenes/tips-coffin-extra-short.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips completo long stiletto miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-completo-long-stiletto-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips coreano",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/tips-coreano.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips cowboy (coffin) natural MC",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/tips-cowboy-coffin-natural-mc.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips cuadrado con pestaña sivivi",
        "data2": "-23%",
        "altTexto": "",
        "image": "imagenes/tips-cuadrado-con-pesta-a-sivivi.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips cuadrado cortorecto  scuare miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-cuadrado-cortorecto-scuare-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips cuadrado recto sin curva Bamboo miss cherry",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-cuadrado-recto-sin-curva-bamboo-miss-cherry.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips curva c",
        "data2": "$26.00",
        "altTexto": "",
        "image": "imagenes/tips-curva-c.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips ling Sharp (stiletto) MC cristal",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/tips-ling-sharp-stiletto-mc-cristal.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips long bamboo miss cherry #13",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/tips-long-bamboo-miss-cherry-13.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips long coffin (3xl) miss cherry #12",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/tips-long-coffin-3xl-miss-cherry-12.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips prees on color",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/tips-prees-on-color.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips press on almendra cristal",
        "data2": "-19%",
        "altTexto": "",
        "image": "imagenes/tips-press-on-almendra-cristal.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips press on coffin cristal",
        "data2": "-19%",
        "altTexto": "",
        "image": "imagenes/tips-press-on-coffin-cristal.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips punta de arco blanco MC",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/tips-punta-de-arco-blanco-mc.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips punta de arco cristal MC",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-punta-de-arco-cristal-mc.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips punta de arco natural",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-punta-de-arco-natural.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips Soft gel (prees ón)",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/tips-soft-gel-prees-n.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips Soft gel (prees ón) stiletto",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/tips-soft-gel-prees-n-stiletto.webp"
    },
    {
        "category": "tips-y-press-on",
        "data": "Tips stiletto extra largo kalanzi nat",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/tips-stiletto-extra-largo-kalanzi-nat.webp"
    },
    {
        "category": "extractores-de-polvo",
        "data": "Extractor de Polvo para Uñas 3 Ventiladores Blancos",
        "data2": "$549.00",
        "altTexto": "Máquina recolectora de polvo para manicura color blanco con diseño ergonómico de arco acolchado y rejilla de succión con tres ventiladores.",
        "image": "imagenes/extractor-polvo-unas-3-ventiladores-blanco.webp"
    },
    {
        "category": "extractores-de-polvo",
        "data": "Extractor de Polvo para Uñas 1 Ventilador Blanco",
        "data2": "$300.00",
        "altTexto": "Extractor de polvo para manicura compacto color blanco con diseño curvo y un solo ventilador con rejilla circular negra.",
        "image": "imagenes/extractor-polvo-unas-1-ventilador-blanco.webp"
    },
    {
        "category": "extractores-de-polvo",
        "data": "Extractor de Polvo para Uñas Mediano Diseño Arco Blanco",
        "data2": "$380.00",
        "altTexto": "Extractor de polvo para mesa de manicura tamaño mediano modelo 868-1, color blanco con bordes cromados, rejilla rectangular y cargador incluido.",
        "image": "imagenes/extractor-polvo-unas-mediano-arco-blanco.webp"
    },
    {
        "category": "extractores-de-polvo",
        "data": "Extractor de Polvo para Uñas Rosa con Rejilla Love Crazy",
        "data2": "$499.00",
        "altTexto": "Extractor de polvo para manicura color rosa pastel con rejilla de ventilación geométrica superior, cojín reposamanos gris y bolsa recolectora incluida.",
        "image": "imagenes/extractor-polvo-unas-rosa-rejilla-love-crazy.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill para Uñas 35000 RPM Color Tornasol",
        "data2": "$600.00",
        "altTexto": "Máquina pulidora (Drill) para uñas profesional de 35000 RPM con acabado tornasol (camaleón), herramienta eléctrica para manicura y pedicura.",
        "image": "imagenes/drill-unas-profesional-35000-rpm-color-tornasol.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill Pulidor de Uñas Tipo Pluma Portátil Rosa Estudiante",
        "data2": "$110.00",
        "altTexto": "Pulidor eléctrico tipo pluma para uñas color rosa fucsia sobre caja con especificaciones de velocidad variable de 3000 a 20000 rpm.",
        "image": "imagenes/pulidor-unas-pluma-rosa-portatil-estudiante-drill.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill Pluma portatil",
        "data2": "$346.00",
        "altTexto": "Pieza de mano tipo pluma para máquina pulidora de uñas en color negro mate con una línea roja decorativa cerca de la punta metálica.",
        "image": "imagenes/pluma-pulidor-unas-negro-anillo-rojo-repuesto.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill Pulidor de Uñas Profesional 25000 RPM Blanco",
        "data2": "$533.00",
        "altTexto": "Kit de drill pulidor eléctrico profesional para uñas de 25000 RPM, motor color blanco con panel frontal morado, incluye pedal negro y pluma con agarre azul.",
        "image": "imagenes/drill-pulidor-unas-profesional-25000rpm-blanco.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill Pulidor Profesional para Uñas Rosa con Pedal",
        "data2": "$490.00",
        "altTexto": "Kit de drill eléctrico pulidor de uñas color rosa, incluye pluma de mano plateada con rosa, pedal negro, soporte y set de puntas limadoras.",
        "image": "imagenes/drill-pulidor-profesional-unas-rosa.webp"
    },
    {
        "category": "drill-pulidores",
        "data": "Drill Pulidor Semiprofesional para Uñas 20000 RPM Rosa",
        "data2": "$299.00",
        "altTexto": "Kit de drill pulidor de uñas eléctrico semiprofesional modelo cuadrado color rosa fucsia, incluye pluma de mano, soporte y estuche de puntas.",
        "image": "imagenes/drill-pulidor-semiprofesional-unas-20000rpm-rosa.webp"
    },
    {
        "category": "lamparas-escritorio",
        "data": "Lámpara de escritorio chica",
        "data2": "$140.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-de-escritorio-chica.webp"
    },
    {
        "category": "lamparas-escritorio",
        "data": "Lámpara de escritorio con 2 bases",
        "data2": "$300.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-de-escritorio-con-2-bases.webp"
    },
    {
        "category": "lamparas-escritorio",
        "data": "Lámpara de escritorio mediana",
        "data2": "$350.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-de-escritorio-mediana.webp"
    },
    {
        "category": "lamparas-escritorio",
        "data": "Lámpara para selfie",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-para-selfie.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara 2 en 1",
        "data2": "$300.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-2-en-1.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara Ab tornasol",
        "data2": "$300.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-ab-tornasol.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara linterna press on",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-linterna-press-on.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara secado 288 wats",
        "data2": "$380.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-secado-288-wats.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara secado con brillantes 54 wats",
        "data2": "$899.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-secado-con-brillantes-54-wats.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara secado para press on",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-secado-para-press-on.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara secado sunx5 tornasol 80 wats",
        "data2": "$280.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-secado-sunx5-tornasol-80-wats.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "Lámpara sun 14",
        "data2": "$140.00",
        "altTexto": "",
        "image": "imagenes/l-mpara-sun-14.webp"
    },
    {
        "category": "lamparas-uv-led",
        "data": "SUN 5  blanca",
        "data2": "$180.00",
        "altTexto": "",
        "image": "imagenes/sun-5-blanca.webp"
    },
    {
        "category": "mc",
        "data": "Aceite de cutícula MC",
        "data2": "$20.00",
        "altTexto": "Aceite hidratante para cutícula marca MC Nails aroma Sweet Velvet en botella de vidrio para finalizar la manicura",
        "image": "imagenes/aceite-para-cuticula-sweet-velvet-mc-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acetona pura Organic 4oz/120 ml",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/acetona-pura-organic-nails-removedor-120ml-4oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Acuaria - Green 1 oz (Fantasy Nails)",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico con decoración Fantasy Nails colección Acuaria tono Green verde con glitter y destellos holográficos 1 oz.",
        "image": "imagenes/acrilico-coleccion-acuaria-green-fantasy-nails-1oz.webp"

    },
    {
        "category": "mc",
        "data": "Acrílico Acuaria - Rose 1 oz (Fantasy Nails)",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico con decoración Fantasy Nails colección Acuaria tono Rose Gold con glitter y destellos rosas, frasco de 1 oz.",
        "image": "imagenes/acrilico-coleccion-acuaria-rose-gold-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Almond Fantasy Nails 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Cover Almond para base de uñas en presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-almond-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Almond Fantasy Nails 2 oz",
        "data2": "$130.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Cover Almond en presentación de 2 oz para extensiones de uña natural.",
        "image": "imagenes/acrilico-makeover-cover-almond-fantasy-nails-2oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Almond Fantasy Nails 4 oz",
        "data2": "$200.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Cover Almond en tamaño profesional de 4 oz para alto rendimiento en salones.",
        "image": "imagenes/acrilico-makeover-cover-almond-fantasy-nails-4oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico blanco 1/2 oz mc",
        "data2": "$35.00",
        "altTexto": "Polvo acrílico blanco MC Nails línea Flex de secado medio y flexible, presentación de 1/2 oz (media onza) edición Venado Oax.",
        "image": "imagenes/acrilico-flex-blanco-mc-nails-media-onza.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico clear 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico transparente Fantasy Nails tono Clear en frasco de 1 oz, ideal para encapsulado y estructura de uñas.",
        "image": "imagenes/acrilico-clear-transparente-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Clear mix 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico Fantasy Nails mezcla Clear Mix con decoración y glitter para encapsular, frasco de 1 oz.",
        "image": "imagenes/acrilico-clear-mix-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Cover Pink 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Cover Pink colección Makeover para base natural rosa, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-pink-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Creamy white Organic 7 g",
        "data2": "$45.00",
        "altTexto": "Polvo acrílico Organic Nails tono Creamy White (blanco suave) en presentación pequeña de 7 g.",
        "image": "imagenes/acrilico-creamy-white-organic-nails-7g.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico cristal MC 1 oz",
        "data2": "$55.00",
        "altTexto": "Polvo acrílico transparente MC Nails línea Flex en presentación de 1 oz, ideal para encapsulado, envase edición Venado Oax.",
        "image": "imagenes/acrilico-flex-transparente-cristal-mc-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Kitty shine 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Kitty Shine colección Makeover con destellos brillantes, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-kitty-shine-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico negro para 3D",
        "data2": "$35.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color negro tono 02, formulado especialmente para realizar figuras de alto relieve y diseño.",
        "image": "imagenes/acrilico-artistic-3d-negro-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #11 amarillo moztaza",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Amarillo Mostaza tono 11, ideal para diseños y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-amarillo-mostaza-11-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #12 amarillo Piolin",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Amarillo Piolín tono 12, amarillo brillante especial para figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-amarillo-piolin-12-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #13 amarillo claro",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Amarillo Claro tono 13, tono pastel ideal para diseño y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-amarillo-claro-13-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #34 Bugambilia",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Bugambilia tono 34, tono magenta vibrante ideal para crear flores y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-bugambilia-34-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #43 Chocolate claro",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Chocolate Claro tono 43, tono tierra suave ideal para diseños y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-chocolate-claro-43-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #59 azul navy",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Azul Navy tono 59, azul oscuro profundo ideal para diseños y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-azul-navy-59-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #6 color verde bandera",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Verde Bandera tono 06, ideal para crear hojas y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-verde-bandera-06-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #7 verde militar",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Verde Militar tono 07, especial para diseño y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-verde-militar-07-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3d #8 verde hoja",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Verde Hoja tono 08, ideal para realizar follaje y diseños de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-verde-hoja-08-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D #9 verde limón",
        "data2": "$30.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Verde Limón tono 09, color vibrante para diseños y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-verde-limon-09-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico para 3D rojo tinto",
        "data2": "$35.00",
        "altTexto": "Polvo acrílico Fantasy Nails colección Artistic 3D color Rojo Tinto tono 25, ideal para diseños elegantes y figuras de alto relieve.",
        "image": "imagenes/acrilico-artistic-3d-rojo-tinto-25-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico petal rose 2 oz",
        "data2": "$130.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Petal Rose, presentación de 2 oz para base de color natural y almendra.",
        "image": "imagenes/acrilico-makeover-cover-petal-rose-fantasy-nails-2oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Petal shine 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Petal Shine colección Makeover con delicados destellos, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-petal-shine-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico piel canela 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Piel Canela colección Makeover, ideal para bases de tonos bronceados, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-piel-canela-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Pink 50 g (Organic Nails)",
        "data2": "$250.00",
        "altTexto": "Polvo acrílico Organic Nails tono Pink (rosa translúcido) en presentación de 50 g para terminado natural y brilloso.",
        "image": "imagenes/acrilico-pink-translucido-organic-nails-50g.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico shine up 1oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Shine-Up colección Makeover con acabado brillante y glitter, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-shine-up-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico silver 1 oz Fantasy Nails",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico con decoración Fantasy Nails colección Acuaria tono Silver con mezcla de glitter plateado y holográfico, frasco de 1 oz.",
        "image": "imagenes/acrilico-coleccion-acuaria-silver-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico Skin nude 1 oz",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Skin Nude colección Makeover para base natural color piel, presentación de 1 oz.",
        "image": "imagenes/acrilico-makeover-cover-skin-nude-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico strong Pink 1oz Fantasy",
        "data2": "$80.00",
        "altTexto": "Polvo acrílico maquillaje Fantasy Nails tono Strong Pink (rosa intenso) para base y estructura de uñas, presentación de 1 oz.",
        "image": "imagenes/acrilico-cover-strong-pink-fantasy-nails-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Acrílico transparente (FLEX) 2 oz",
        "data2": "$95.00",
        "altTexto": "Polvo acrílico transparente MC Nails línea Flex para encapsulado y estructura, presentación de 2 oz.",
        "image": "imagenes/acrilico-flex-transparente-mc-nails-2oz.webp"
    },
    {
        "category": "mc",
        "data": "Anti hongos y deshidratador MC",
        "data2": "$25.00",
        "altTexto": "Tratamiento anti hongos MC Bliss de MC Nails, solución preparadora para desinfectar la uña natural antes de la aplicación.",
        "image": "imagenes/anti-hongos-mc-bliss-mc-nails-preparador.webp"
    },
    {
        "category": "mc",
        "data": "Antihongos producto natural 12 ml",
        "data2": "$65.00",
        "altTexto": "Tratamiento natural para uñas Hongu-Syn de A Lom'e, solución antihongos de 12 ml para cuidado y reparación de la uña.",
        "image": "imagenes/tratamiento-antihongos-hongu-syn-natural-12ml.webp"
    },
    {
        "category": "mc",
        "data": "Base coat Organic",
        "data2": "$235.00",
        "altTexto": "Base Coat Gel marca Organic Nails en presentación de 15 ml (0.50 fl oz), capa base profesional para sistema de esmaltado semipermanente.",
        "image": "imagenes/base-coat-gel-organic-nails-15ml.webp"
    },
    {
        "category": "mc",
        "data": "Base Traslúcida Fantasy Canela",
        "data2": "$70.00",
        "altTexto": "Base traslúcida Fantasy Nails tono Piel Canela, esmalte base con color para manicura francesa o acabado natural, botella de 15 ml.",
        "image": "imagenes/base-traslucida-piel-canela-fantasy-nails-15ml.webp"
    },
    {
        "category": "mc",
        "data": "Base Traslúcida Fantasy Pink",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/base-trasl-cida-fantasy-pink.webp"
    },
    {
        "category": "mc",
        "data": "Bloom Organic / brillo finalizador Max brillo",
        "data2": "$265.00",
        "altTexto": "Gel finalizador Bloom marca Organic Nails, capa superior de brillo extremo y protección para uñas acrílicas y gel, botella de 15 ml.",
        "image": "imagenes/bloom-gel-finalizador-brillante-organic-nails-15ml.webp"
    },
    {
        "category": "mc",
        "data": "Borrador de líneas MC",
        "data2": "$25.00",
        "altTexto": "Borrador de líneas MC Nails Line Eraser, líquido auxiliar para desvanecer la unión del tip y retoques en uñas acrílicas, botella de 15 ml.",
        "image": "imagenes/borrador-de-lineas-line-eraser-mc-nails-15ml.webp"
    },
    {
        "category": "mc",
        "data": "Brush cleaner 4 oz",
        "data2": "$116.00",
        "altTexto": "Limpiador para pinceles Brush Cleaner marca Organic Nails, solución líquida profesional de 120 ml (4 oz) para limpieza y mantenimiento de cerdas naturales.",
        "image": "imagenes/limpiador-de-pinceles-brush-cleaner-organic-nails-120ml.webp"
    },
    {
        "category": "mc",
        "data": "Classic Form Orgánic",
        "data2": "$280.00",
        "altTexto": "Rollo de formas para escultura Classic Form de Organic Nails, moldes adhesivos con guías de corte precisas para estructuras de acrílico y gel.",
        "image": "imagenes/formas-para-escultural-classic-form-organic-nails.webp"
    },
    {
        "category": "mc",
        "data": "Gama Acrílicos Colección Hindú Fantasy Nails",
        "data2": "$150.00",
        "altTexto": "Gama Hindú Fantasy Nails con 6 polvos acrílicos, presentando tonos metálicos vibrantes y brillantes.",
        "image": "imagenes/gama-acrilicos-coleccion-hindu-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Flake pastel 1oz",
        "data2": "$80.00",
        "altTexto": "Tarro de polvo acrílico Make-Cover de 1 onza colección Flake Pastel color rosa suave con textura de hojuelas brillantes para construcción de uñas.",
        "image": "imagenes/polvo-acrilico-cover-flake-pastel-rosa-1oz.webp"
    },
    {
        "category": "Fantasy Nails",
        "data": "Foil Glue Fantasy / pegamento para foil",
        "data2": "$80.00",
        "altTexto": "Frasco de pegamento especial para transferir foil de la marca Fantasy Nails, presentación de 15ml con tapa plateada.",
        "image": "imagenes/pegamento-para-foil-fantasy-nails-transfer.webp"
    },
    {
        "category": "mc",
        "data": "Formas Organic Nails 500 Piezas",
        "data2": "$287.00",
        "altTexto": "Rollo con 500 moldes o formas para escultura de uñas de la marca Organic Nails, diseño clásico con logotipo en colores magenta y negro.",
        "image": "imagenes/formas-esculturales-organic-nails-500-piezas-rollo.webp"
    },
    {
        "category": "mc",
        "data": "Gel blanco ultra white Fantasy",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/gel-blanco-ultra-white-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Gel Finalizador máximo brillo Glare",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/gel-finalizador-m-ximo-brillo-glare.webp"
    },
    {
        "category": "mc",
        "data": "Gel Foto Sensible rose gold Fantasy Nails",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/gel-foto-sensible-rose-gold-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Gel Negro Ultra black Fantasy",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/gel-negro-ultra-black-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Gel Painting blanco o negro Organic",
        "data2": "$155.00",
        "altTexto": "",
        "image": "imagenes/gel-painting-blanco-o-negro-organic.webp"
    },
    {
        "category": "mc",
        "data": "Gel painting fantasy Nails",
        "data2": "$60.00",
        "altTexto": "",
        "image": "imagenes/gel-painting-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Glam shimmer",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/glam-shimmer.webp"
    },
    {
        "category": "mc",
        "data": "Kawai princesas Fantasy",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/kawai-princesas-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Lima 80/80 mc",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/lima-80-80-mc.webp"
    },
    {
        "category": "mc",
        "data": "Lima profesional 240/240 organic",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/lima-profesional-240-240-organic.webp"
    },
    {
        "category": "mc",
        "data": "Lima sponge orgánic",
        "data2": "$54.00",
        "altTexto": "",
        "image": "imagenes/lima-sponge-org-nic.webp"
    },
    {
        "category": "mc",
        "data": "Lima zebra profesional 100/100 Organic",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/lima-zebra-profesional-100-100-organic.webp"
    },
    {
        "category": "mc",
        "data": "Lima zebra profesional 150/150 Organic",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/lima-zebra-profesional-150-150-organic.webp"
    },
    {
        "category": "mc",
        "data": "Limpia pincel 4oz fantasy",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/limpia-pincel-4oz-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Limpia pincel MC 15 ml",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/limpia-pincel-mc-15-ml.webp"
    },
    {
        "category": "mc",
        "data": "Monomero 1oz",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/monomero-1oz.webp"
    },
    {
        "category": "mc",
        "data": "Monomero 4oz Deluxury fantasy",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/monomero-4oz-deluxury-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Monomero Deluxury 8oz",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/monomero-deluxury-8oz.webp"
    },
    {
        "category": "mc",
        "data": "Monomero mc 2 oz",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/monomero-mc-2-oz.webp"
    },
    {
        "category": "mc",
        "data": "Monomero mc 4 oz",
        "data2": "$78.00",
        "altTexto": "",
        "image": "imagenes/monomero-mc-4-oz.webp"
    },
    {
        "category": "mc",
        "data": "Monomero mc 8 oz",
        "data2": "$130.00",
        "altTexto": "",
        "image": "imagenes/monomero-mc-8-oz.webp"
    },
    {
        "category": "mc",
        "data": "Monomero Sandia 8oz Fantasy Nails",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/monomero-sandia-8oz-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Monomero Uvá fantasy Nails",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/monomero-uv-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Nivelador de Ph Fantasy",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/nivelador-de-ph-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Pegamento de gota",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/pegamento-de-gota.webp"
    },
    {
        "category": "mc",
        "data": "Petal Rose 4oz",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/petal-rose-4oz.webp"
    },
    {
        "category": "mc",
        "data": "Poligel Cristal MC",
        "data2": "$189.00",
        "altTexto": "",
        "image": "imagenes/poligel-cristal-mc.webp"
    },
    {
        "category": "mc",
        "data": "Primer adherente sin ácido Mc",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/primer-adherente-sin-cido-mc.webp"
    },
    {
        "category": "mc",
        "data": "Primer con ácido Mc",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/primer-con-cido-mc.webp"
    },
    {
        "category": "mc",
        "data": "Protein BOND",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/protein-bond.webp"
    },
    {
        "category": "mc",
        "data": "Regenerador de uña",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/regenerador-de-u-a.webp"
    },
    {
        "category": "mc",
        "data": "Removedor de cutícula",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/removedor-de-cut-cula.webp"
    },
    {
        "category": "mc",
        "data": "Rubber MC nude",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/rubber-mc-nude.webp"
    },
    {
        "category": "mc",
        "data": "Sani spray 4 oz",
        "data2": "$104.00",
        "altTexto": "",
        "image": "imagenes/sani-spray-4-oz.webp"
    },
    {
        "category": "mc",
        "data": "Shaper máx 2 oz",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/shaper-m-x-2-oz.webp"
    },
    {
        "category": "mc",
        "data": "Synergy wipe 8 oz",
        "data2": "$160.00",
        "altTexto": "",
        "image": "imagenes/synergy-wipe-8-oz.webp"
    },
    {
        "category": "mc",
        "data": "Tips #7!natural fantasy",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/tips-7-natural-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Top coat Organic / brillo finalizador",
        "data2": "$235.00",
        "altTexto": "",
        "image": "imagenes/top-coat-organic-brillo-finalizador.webp"
    },
    {
        "category": "mc",
        "data": "Top Matte Wapisima",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/top-matte-wapisima.webp"
    },
    {
        "category": "mc",
        "data": "True bond Fantasy",
        "data2": "$45.00",
        "altTexto": "",
        "image": "imagenes/true-bond-fantasy.webp"
    },
    {
        "category": "mc",
        "data": "Velvet MATTE fantasy Nails",
        "data2": "$60.00",
        "altTexto": "",
        "image": "imagenes/velvet-matte-fantasy-nails.webp"
    },
    {
        "category": "mc",
        "data": "Vita Care gel Organic / gel Vitaminado",
        "data2": "$320.00",
        "altTexto": "",
        "image": "imagenes/vita-care-gel-organic-gel-vitaminado.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Balin dorado varios tamaños",
        "data2": "$34.00",
        "altTexto": "Ruleta de balines metálicos color dorado en distintos tamaños, decoración caviare para diseño de uñas y nail art.",
        "image": "imagenes/ruleta-balines-dorados-metalicos-varios-tamanos-decoracion.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Balin y decoración miss cherry",
        "data2": "$80.00",
        "altTexto": "Set de decoración para uñas Miss Cherry con 6 frascos que contienen mezcla de balines dorados y flores de colores pastel para encapsulado.",
        "image": "imagenes/set-decoracion-miss-cherry-balines-y-flores-pastel.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Caja dije letra dorado, plata y cobre",
        "data2": "$35.00",
        "altTexto": "Caja organizadora con dijes metálicos en forma de letras del abecedario en colores dorado, plateado y cobre para decoración de uñas personalizada.",
        "image": "imagenes/caja-dijes-letras-metalicas-dorado-plata-cobre-decoracion.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cajita destello tornasol",
        "data2": "$25.00",
        "altTexto": "Set de decoración para uñas Miss Chula con estrellas holográficas efecto tornasol en 12 colores diferentes, ideal para diseños de encapsulado brillante.",
        "image": "imagenes/set-decoracion-estrellas-holograficas-tornasol-miss-chula.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cajita kawaii Helados",
        "data2": "$58.00",
        "altTexto": "Caja de decoración Kawaii para uñas con charms 3D de resina, incluye figuras de helados, conos de nieve y cactus en colores pastel.",
        "image": "imagenes/caja-decoracion-kawaii-3d-helados-y-cactus.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cartera dijes kawaii",
        "data2": "$35.00",
        "altTexto": "Paquete tipo cartera con surtido de dijes Kawaii en 3D de resina, mezcla de figuras tiernas y coloridas (animalitos, flores) para decoración de uñas.",
        "image": "imagenes/cartera-dijes-kawaii-3d-resina-figuras-variadas-nail-art.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cartera osito metálico",
        "data2": "$37.00",
        "altTexto": "Cartera con dijes metálicos en forma de ositos para uñas, mezcla de colores dorado y plateado para decoración nail art 3D.",
        "image": "imagenes/cartera-dijes-ositos-metalicos-dorado-y-plateado-nail-ar.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cola de sirena miss cherry",
        "data2": "$75.00",
        "altTexto": "Set de decoración cola de sirena marca Miss Cherry, estuche con 6 frascos de glitter hexagonal en colores variados para diseño de uñas y encapsulado.",
        "image": "imagenes/set-decoracion-cola-de-sirena-miss-cherry-6-colores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Concha nácar con hoja de oro",
        "data2": "$80.00",
        "altTexto": "Set de decoración para uñas con 6 frascos que combinan concha nácar triturada y pedazos de hoja de oro (gold foil), ideal para diseños elegantes y encapsulado.",
        "image": "imagenes/set-decoracion-concha-nacar-y-hoja-de-oro-gold-foil.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Cristales Variados JR Nail Art - Mix de Tamaños y Colores",
        "data2": "$35.00",
        "altTexto": "Estuches de cristales para uñas marca JR Nail Art, set con mix de tamaños y colores variados en organizador de 12 cavidades para decoración y pedrería.",
        "image": "imagenes/set-cristales-variados-jr-nail-art-mix-colores-y-tamanos-jr.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Set de Decoración JR - Naturaleza Muerta y Cristales Mix",
        "data2": "$35.00",
        "altTexto": "Set de decoración para uñas marca JR Nail Art, estuche con mix de naturaleza muerta (flores secas) de colores y cristales transparentes para encapsulado.",
        "image": "imagenes/set-decoracion-naturaleza-muerta-con-cristales-jr-nail-art.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Caviar 12 Colores (Micro Balines) para Uñas",
        "data2": "$83.00",
        "altTexto": "Estuche de decoración para uñas efecto caviar con 12 frascos de micro balines en colores surtidos (metálicos y sólidos) para crear texturas y diseños 3D.",
        "image": "imagenes/set-decoracion-caviar-micro-balines-12-colores-surtidos.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Corazones Metálicos 12 Colores para Uñas",
        "data2": "$55.00",
        "altTexto": "Estuche con 12 frascos de decoración para uñas en forma de corazones metálicos (glitter), variedad de colores brillantes y holográficos para encapsulado.",
        "image": "imagenes/set-decoracion-corazones-metalicos-glitter-12-colores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Corazones Metálicos 12 Colores para Uñas WG",
        "data2": "$65.00",
        "altTexto": "Estuche con 12 frascos de decoración para uñas en forma de corazones metálicos (glitter), variedad de colores brillantes y holográficos para encapsulado.",
        "image": "imagenes/set-decoracion-corazones-metalicos-glitter-12-colores-wg.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Corazones Neón Mate 12 Colores",
        "data2": "$89.00",
        "altTexto": "Estuche con 12 frascos de confeti para uñas en forma de corazones, acabado mate en colores neón vibrantes (amarillo, rosa, verde, naranja) para diseños llamativos.",
        "image": "imagenes/set-decoracion-corazones-neon-mate-12-colores-unas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Confeti de Letras Holográficas (6 Colores)",
        "data2": "$65.00",
        "altTexto": "Estuche de 6 frascos con decoración para uñas de confeti en forma de letras del abecedario, acabado holográfico brillante en colores surtidos para encapsulado.",
        "image": "imagenes/set-decoracion-unas-letras-abecedario-confeti-holografico-6pcs.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Mix: Flores Neón con Caviar Dorado (6 Piezas)",
        "data2": "$75.00",
        "altTexto": "Estuche con 6 frascos de decoración combinada para uñas: cada envase contiene una mezcla lista de flores mate en colores neón y micro balines dorados (caviar).",
        "image": "imagenes/set-decoracion-mix-flores-neon-y-balines-dorados-unas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Navideña",
        "data2": "$59.00",
        "altTexto": "Kit de 6 frascos de decoración navideña para uñas marca Nanty Nails figuras de fimo y confeti con diseños de Santa Claus bastones y coronas en colores rojo y verde para encapsulado.",
        "image": "imagenes/set-decoracion-navidad-fimo-6-piezas-encapsulado.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Naturaleza Muerta y Mariposas Flores Secas para Encapsula",
        "data2": "$45.00",
        "altTexto": "Kit de decoración para uñas con naturaleza muerta flores secas y mariposas en variedad de colores en estuches organizadores marca Nanty Nails ideal para técnica de encapsulado y diseños 3D.",
        "image": "imagenes/set-naturaleza-muerta-flores-secas-mariposas-encapsulado.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración variada Cristales, Perlas y Dijes 3D (Dorados y Plateados)",
        "data2": "$22.00",
        "altTexto": "Cuatro estuches de accesorios para decoración de uñas conteniendo variedad de cristales brillantes perlas y dijes metálicos con formas de corazones y lazos para diseños 3D.",
        "image": "imagenes/set-4-cajas-decoracion-nail-art-mix-cristales-perlas-dijes-3d.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración con Cristales y Pedrería Surtida para Encapsular",
        "data2": "$85.00",
        "altTexto": "Estuche organizador con 6 botes de decoración variada para uñas que incluye mezcla de cristales pedrería y formas brillantes en colores surtidos para diseños de nail art y encapsulado.",
        "image": "imagenes/set-6-frascos-decoracion-mix-cristales-pedreria-surtida-encapsulado.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración para Uñas Estilo Coquette - Moños 3D de Tela y Mix de Perlas Surtidas",
        "data2": "$110.00",
        "altTexto": "Estuche organizador con decoración para uñas que incluye moñitos de tela 3D en colores surtidos y perlas blancas ideal para diseños estilo coquette y kawaii.",
        "image": "imagenes/set-decoracion-unas-monos-tela-3d-estilo-coquette-lazos-perlas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoraciones mixtas Neon",
        "data2": "$73.00",
        "altTexto": "",
        "image": "imagenes/decoraciones-mixtas-neon.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Dije Colgante de Zirconia y Metal Dorado",
        "data2": "$30.00",
        "altTexto": "Dije colgante de joyería para uñas con acabado dorado e incrustaciones de cristales brillantes tipo zirconia.",
        "image": "imagenes/dije-colgante-lujo-unas-zirconia-dorado-3d.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Mariposas de Tela Organza 3D Multicolor con Cristales",
        "data2": "$40.00",
        "altTexto": "Set de decoración para uñas con mariposas de tela tipo organza en colores degradados y centro de pedrería brillante para diseños 3D con volumen.",
        "image": "imagenes/mariposas-tela-organza-3d-colores-degradados-cristales.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto 3 en 1 Polvo y Glitter color Negro",
        "data2": "$60.00",
        "altTexto": "Kit de 6 frascos con decoración para uñas tipo efecto 3 en 1 gama negra que incluye glitter, hojuelas y texturas brillantes en empaque holográfico",
        "image": "imagenes/set-efecto-3-en-1-polvo-glitter-unas-negro.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto 3 en 1 Polvo y Glitter color Plata",
        "data2": "$60.00",
        "altTexto": "Kit de 6 frascos con decoración para uñas tipo efecto 3 en 1 gama plateada, incluye glitter, hojuelas metálicas y polvos brillantes en empaque holográfico.",
        "image": "imagenes/set-efecto-3-en-1-polvo-glitter-unas-plata.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto 3 en 1 Polvo y Glitter color Rojo",
        "data2": "$60.00",
        "altTexto": "Kit de 6 frascos con decoración para uñas tipo efecto 3 en 1 gama de tonos rojos y rosas, incluye glitter, hojuelas y polvos brillantes en empaque holográfico.",
        "image": "imagenes/set-efecto-3-en-1-polvo-glitter-unas-rojo.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Acuarela",
        "data2": "$68.00",
        "altTexto": "Set de tres paletas de acuarela sólida con efecto shimmer para uñas, modelos Candy, Autumn Whispers y Grass Green en empaques holográficos.",
        "image": "imagenes/acuarela-solida-shimmer-para-unas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Aurora Blanco Iridiscente",
        "data2": "$30.00",
        "altTexto": "Frasco de polvo fino para decoración de uñas efecto aurora tono blanco iridiscente, incluye aplicador de esponja y empaque de bolsa rosa holográfica.",
        "image": "imagenes/polvo-efecto-aurora-blanco-iridiscente-unas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto aurora destellos diferentes",
        "data2": "$25.00",
        "altTexto": "Paquete con 4 frascos de polvo para uñas efecto aurora en tonos pastel variados, incluye aplicador de esponja rosa.",
        "image": "imagenes/set-polvo-efecto-aurora-4-colores-aplicador.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Azúcar para Uñas Colores Variados",
        "data2": "$80.00",
        "altTexto": "Estuche con 12 frascos de decoración para uñas textura efecto azúcar, incluye gama de colores brillantes como rosa neón, azul, verde, morado y negro.",
        "image": "imagenes/set-12-polvos-efecto-azucar-unas-colores-variados.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Azúcar Glow",
        "data2": "$46.00",
        "altTexto": "Kit de 6 frascos de polvo para decoración de uñas textura azúcar con efecto glow (brilla en la oscuridad), marca Mussa en caja plateada holográfica.",
        "image": "imagenes/set-polvo-efecto-azucar-glow-oscuridad-mussa.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Espejo Mágico 3 Colores para Uñas",
        "data2": "$39.00",
        "altTexto": "Dúo de paletas de polvo sólido compacto Solid Magic Mirror Powder con tres tonos metálicos cada una para efecto espejo en uñas, empaque morado",
        "image": "imagenes/polvo-solido-efecto-espejo-magico-3-colores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Espejo 6 Tonos Otoñales con Aplicadores",
        "data2": "$69.00",
        "altTexto": "Paleta de 6 frascos de polvo metálico efecto espejo en gama de colores otoñales como dorado, verde y cobre, incluye aplicadores de esponja.",
        "image": "imagenes/set-polvo-efecto-espejo-tonos-otono-aplicadores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Espejo para Uñas Tonos Azul y Verde",
        "data2": "$35.00",
        "altTexto": "Frasco de polvo sólido compacto efecto espejo para uñas en tonos azul y verde, empaque individual en bolsa transparente con aplicador de esponja.",
        "image": "imagenes/polvo-solido-efecto-espejo-unas-azul-verde.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Flake Vidrio Roto 6 Colores",
        "data2": "$49.00",
        "altTexto": "Estuche con 6 frascos de decoración para uñas con hojuelas irregulares brillantes tipo efecto vidrio roto (flake) en tonos morado, azul, rosa y dorado.",
        "image": "imagenes/set-decoracion-unas-efecto-flake-vidrio-roto-6-colores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Luminaria",
        "data2": "$75.00",
        "altTexto": "Colección de 4 sets de polvos pigmentos efecto luminaria marca Miss Cherry, cada caja contiene 6 frascos con gamas de colores neón, pasteles, azules y cálidos para decoración de uñas.",
        "image": "imagenes/set-polvos-pigmento-neon-efecto-luminaria-miss-cherry.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Polvo Efecto Ojo de Gato Xiaoya Magnético con Aplicador",
        "data2": "$25.00",
        "altTexto": "Sobres de polvo magnético para decoración de uñas efecto ojo de gato marca Xiaoya, tonos azul y rosa iridiscente con aplicador incluido.",
        "image": "imagenes/polvo-efecto-ojo-de-gato-xiaoya-magnetico.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto 3 en 1 Polvo y Glitter Plata",
        "data2": "$69.00",
        "altTexto": "Kit de 6 frascos con decoración para uñas tipo efecto 3 en 1 en gama plateada, incluye glitter, hojuelas metálicas y polvos brillantes en empaque holográfico.",
        "image": "imagenes/set-efecto-3-en-1-polvo-glitter-plata.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Reflejante Flash 6 Tonos Miss Cherry",
        "data2": "$73.00",
        "altTexto": "Estuche con 6 frascos de polvo glitter con efecto reflejante flash para uñas, marca Miss Cherry, incluye tonos metálicos oscuros como plata, dorado, negro, morado y verde.",
        "image": "imagenes/set-polvo-efecto-reflejante-flash-miss-cherry.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Polvo Efecto Espejo Rose Gold para Uñas con Aplicador",
        "data2": "$25.00",
        "altTexto": "Bolsa holográfica rosa que contiene un frasco de polvo fino cromado efecto espejo en tono Rose Gold (oro rosa) para decoración de uñas y un aplicador de esponja.",
        "image": "imagenes/polvo-efecto-espejo-rose-gold-unas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Terciopelo Kalanzi Colores Pastel",
        "data2": "$26.00",
        "altTexto": "Bolsa holográfica marca Kalanzi conteniendo un set de 6 tarros de polvo fino efecto terciopelo en tonos pastel para decoración de uñas.",
        "image": "imagenes/set-polvos-efecto-terciopelo-kalanzi-colores-pastel.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Térmico Mussa Glitter Cambia de Color",
        "data2": "$46.00",
        "altTexto": "Caja holográfica marca Mussa con 6 tarros de polvo glitter con efecto térmico para decoración de uñas en tonos variados.",
        "image": "imagenes/set-polvos-efecto-termico-mussa-glitter-cambia-color.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Unicornio Holográfico Cromado con Aplicador",
        "data2": "$25.00",
        "altTexto": "Paquete individual marca Kalanzi con un tarro de polvo efecto unicornio holográfico plateado y una brocha aplicadora de esponja.",
        "image": "imagenes/polvo-efecto-unicornio-holografico-cromado-plata.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Unicornio Holográfico Glitter Multicolor",
        "data2": "$58.00",
        "altTexto": "Caja con set de 6 tarros de polvo para uñas efecto unicornio holográfico en colores vibrantes y oscuros con acabado iridiscente.",
        "image": "imagenes/set-polvos-efecto-unicornio-holografico-multicolorr.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Efecto Acrílico 3 en 1 (Miss Cherry) Gamas con Glitter",
        "data2": "$79.00",
        "altTexto": "Cajas de la marca Miss Cherry mostrando diferentes gamas de polvos acrílicos 3 en 1 (Rojos, Nudes, Verdes y Morados) mezclados con glitter para uñas.",
        "image": "imagenes/polvo-acrilico-3-en-1-miss-cherry-coleccion-mix-glitter.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Nail Art Estrellas Glitter Holográfico 12 Colores",
        "data2": "$65.00",
        "altTexto": "Estuche organizador con 12 frascos de glitter en forma de estrellas con acabados metálicos y tornasol en colores variados para diseño de uñas.",
        "image": "imagenes/set-decoracion-estrellas-glitter-holografico-colores.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Decoración Nail Art Flores 3D Resina Rojo",
        "data2": "$35.00",
        "altTexto": "Flores pequeñas de 5 pétalos color rojo intenso en 3D para decoración de uñas, con detalles de centros dorados tipo balín.",
        "image": "imagenes/decoracion-nail-art-flores-3d-resina-rojo.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Flores de Resina Colores con Perlas y Balines",
        "data2": "$35.00",
        "altTexto": "Estuche con surtido de flores de resina en colores variados, combinadas con perlas blancas y balines dorados para decoración de uñas 3D.",
        "image": "imagenes/mix-flores-resina-colores-perlas-balines.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Glitter fino tornasol miss cherry",
        "data2": "$99.00",
        "altTexto": "",
        "image": "imagenes/glitter-fino-tornasol-miss-cherry.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de oro y  de color",
        "data2": "$65.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oro-y-de-color.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de oro y plata",
        "data2": "$54.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oro-y-plata.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de Otoño Dorada/cobre",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oto-o-dorada-cobre.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de Otoño fiusha",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oto-o-fiusha.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de Otoño (maple)",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oto-o-maple.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hoja de Otoño verde",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/hoja-de-oto-o-verde.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Hojuelas tornasol miss cherry",
        "data2": "$99.00",
        "altTexto": "",
        "image": "imagenes/hojuelas-tornasol-miss-cherry.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Kawaii caramelo",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/kawaii-caramelo.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Mariposa Neon",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/mariposa-neon.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Mariposa neón Mixta",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/mariposa-ne-n-mixta.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Mariposas metálicas",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/mariposas-met-licas.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Maxi placa cute 😉",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/maxi-placa-cute.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Maxi placa para sellos retro fashion",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/maxi-placa-para-sellos-retro-fashion.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Maxi placa para sellos sex and the city",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/maxi-placa-para-sellos-sex-and-the-city.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Maxi placa para sellos TRAZOS",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/maxi-placa-para-sellos-trazos.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Media perla cajita",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/media-perla-cajita.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Mickys tornasol",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/mickys-tornasol.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Micro cola de sirena color miss cherry",
        "data2": "$110.00",
        "altTexto": "",
        "image": "imagenes/micro-cola-de-sirena-color-miss-cherry.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "MIX NAVIDEÑO",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/mix-navide-o.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "MIX NAVIDEÑO 2",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/mix-navide-o-2.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Moongirl morado",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/moongirl-morado.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Moongirl pastel",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/moongirl-pastel.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Moongirl verde",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/moongirl-verde.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Naturaleza muerta",
        "data2": "$33.00",
        "altTexto": "",
        "image": "imagenes/naturaleza-muerta.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Naturaleza muerta",
        "data2": "$73.00",
        "altTexto": "",
        "image": "imagenes/naturaleza-muerta.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Osito mini con glitter",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/osito-mini-con-glitter.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Ositos aurora",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/ositos-aurora.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Pompon GATITOS",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/pompon-gatitos.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Pompones de Uñas",
        "data2": "$58.00",
        "altTexto": "",
        "image": "imagenes/pompones-de-u-as.webp"
    },
    {
        "category": "efectos-y-decoracion",
        "data": "Unicornio de color B",
        "data2": "$58.00",
        "altTexto": "",
        "image": "imagenes/unicornio-de-color-b.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kalanzi #10",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/pincel-kalanzi-10.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kalanzi #8 rosa y blanco",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/pincel-kalanzi-8-rosa-y-blanco.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kolinsky #10 100% original",
        "data2": "$270.00",
        "altTexto": "",
        "image": "imagenes/pincel-kolinsky-10-100-original.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kolinsky #12 100% kolinsky",
        "data2": "$299.00",
        "altTexto": "",
        "image": "imagenes/pincel-kolinsky-12-100-kolinsky.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kolinsky #12 Fantasy Nails",
        "data2": "$399.00",
        "altTexto": "",
        "image": "imagenes/pincel-kolinsky-12-fantasy-nails.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kolinsky #8 100% original",
        "data2": "$250.00",
        "altTexto": "",
        "image": "imagenes/pincel-kolinsky-8-100-original.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel kolinsky #8 Organic",
        "data2": "$580.00",
        "altTexto": "",
        "image": "imagenes/pincel-kolinsky-8-organic.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel Mussa #6",
        "data2": "-49%",
        "altTexto": "",
        "image": "imagenes/pincel-mussa-6.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel silicon",
        "data2": "$60.00",
        "altTexto": "",
        "image": "imagenes/pincel-silicon.webp"
    },
    {
        "category": "pinceles",
        "data": "Pincel wg 100% kolinsky",
        "data2": "$280.00",
        "altTexto": "",
        "image": "imagenes/pincel-wg-100-kolinsky.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles Liner con repuesto",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/pinceles-liner-con-repuesto.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles mano alzada",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/pinceles-mano-alzada.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles mixtos xioya",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/pinceles-mixtos-xioya.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles puntos azul dif tamaños",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/pinceles-puntos-azul-dif-tama-os.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles tor punteros silicon",
        "data2": "$64.00",
        "altTexto": "",
        "image": "imagenes/pinceles-tor-punteros-silicon.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles tornasol mixto",
        "data2": "$95.00",
        "altTexto": "",
        "image": "imagenes/pinceles-tornasol-mixto.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles variados colors",
        "data2": "$165.00",
        "altTexto": "",
        "image": "imagenes/pinceles-variados-colors.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles varios rose gold",
        "data2": "$98.00",
        "altTexto": "",
        "image": "imagenes/pinceles-varios-rose-gold.webp"
    },
    {
        "category": "pinceles",
        "data": "Pinceles xioya varios",
        "data2": "$90.00",
        "altTexto": "",
        "image": "imagenes/pinceles-xioya-varios.webp"
    },
    {
        "category": "pinceles",
        "data": "Set de pinceles",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/set-de-pinceles.webp"
    },
    {
        "category": "kalanzi",
        "data": "Base kalanzi",
        "data2": "$35.00",
        "altTexto": "Base Coat marca Kalanzi sistema UV/LED Gel Polish, fórmula Soak-off tipo Shellac para preparar la uña antes del color.",
        "image": "imagenes/base-coat-kalanzi-uv-led-gel-polish-soak-off.webp"
    },
    {
        "category": "kalanzi",
        "data": "Efecto Láser Ojo de Gato Holográfico (Kalanzi)",
        "data2": "$40.00",
        "altTexto": "Gama Efecto Láser Ojo de Gato Kalanzi con 6 tonos de gel semipermanente, presentando acabados magnéticos y holográficos vibrantes en colores azul claro, verde lima, morado, rojo, cobre y negro.",
        "image": "imagenes/gama-gel-semipermanente-efecto-laser-ojo-de-gato-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gama Gel Semipermanente Efecto Galaxy Set A Kalanzi",
        "data2": "$184.00",
        "altTexto": "Caja de la gama Gelish Efecto Galaxy de Kalanzi que muestra 6 tonos de gel semipermanente con acabado de glitter intenso y destellos en colores plata, oro rosa, dorado, negro, rosa y azul.",
        "image": "imagenes/gama-gel-efecto-galaxy-kalanzi-set-a-glitter-brillante-6-piezas.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gama Gel Semipermanente Efecto Galaxy Set B Kalanzi",
        "data2": "$184.00",
        "altTexto": "Gama Efecto Galaxy B de Kalanzi que presenta 6 tonos de gel semipermanente con acabado de glitter brillante en colores morado, turquesa, verde, rojo, cobre y multicolor.",
        "image": "imagenes/gama-gel-efecto-galaxy-kalanzi-set-b-glitter-brillante-6-piezas.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gama ojo de gato 9D kalanzi",
        "data2": "$220.00",
        "altTexto": "",
        "image": "imagenes/gama-ojo-de-gato-9d-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gama reflectiva kalanzi A",
        "data2": "$224.00",
        "altTexto": "",
        "image": "imagenes/gama-reflectiva-kalanzi-a.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gama reflectiva kalanzi B",
        "data2": "$224.00",
        "altTexto": "",
        "image": "imagenes/gama-reflectiva-kalanzi-b.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gel blanco kalanzi",
        "data2": "-34%",
        "altTexto": "",
        "image": "imagenes/gel-blanco-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gel cremoso kalanzi",
        "data2": "$45.00",
        "altTexto": "",
        "image": "imagenes/gel-cremoso-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gel de construcción kalanzi",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/gel-de-construcci-n-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gel negro kalanzi",
        "data2": "-34%",
        "altTexto": "",
        "image": "imagenes/gel-negro-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Gel sólido en estuche kalanzi",
        "data2": "$250.00",
        "altTexto": "",
        "image": "imagenes/gel-s-lido-en-estuche-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Ojo de gato reflejante kalanzi",
        "data2": "$38.00",
        "altTexto": "",
        "image": "imagenes/ojo-de-gato-reflejante-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Pegamento solido kalanzi",
        "data2": "$26.00",
        "altTexto": "",
        "image": "imagenes/pegamento-solido-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Poligel neon kalanzi",
        "data2": "$97.00",
        "altTexto": "",
        "image": "imagenes/poligel-neon-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "RUBBER marca kalanzi",
        "data2": "$58.00",
        "altTexto": "",
        "image": "imagenes/rubber-marca-kalanzi.webp"
    },
    {
        "category": "kalanzi",
        "data": "Solucion antiseptica",
        "data2": "$55.00",
        "altTexto": "",
        "image": "imagenes/solucion-antiseptica.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Firework Set B Efecto Glitter",
        "data2": "$239.00",
        "altTexto": "Caja de la colección Firework Set B de Mussa que muestra 6 tonos de gel semipermanente con glitter intenso en colores plata, azul cielo, rose gold, lila, dorado y cobre.",
        "image": "imagenes/gama-gel-firework-set-b-mussa-glitter-brillante-destellos.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Diamante Set D Mussa",
        "data2": "$239.00",
        "altTexto": "Gel Diamante D de Mussa que presenta 6 tonos de gel semipermanente con acabado de glitter brillante en colores rosa, amarillo, verde, azul petróleo, negro y vino.",
        "image": "imagenes/gama-gel-diamante-set-d-mussa-glitter-brillante-6-piezas.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección Halloween Mussa",
        "data2": "$135.00",
        "altTexto": "Gama de 6 tonos de gel semipermanente colección Halloween de Mussa presentados en muestrario, mostrando el acabado final mate en colores temáticos como naranja calabaza, negro, blanco, beige y morado intens",
        "image": "imagenes/gama-gel-semipermanente-coleccion-halloween-mussa-tonos-mate-naranja-negro.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Mermaid Mussa",
        "data2": "$135.00",
        "altTexto": "Gama Mermaid Mussa con 6 tonos de gel semipermanente, mostrando colores oscuros intensos con acabado de glitter fino estilo sirena en azul turquesa, azul marino, morado, dorado y negro.",
        "image": "imagenes/gama-gel-mermaid-mussa-efecto-sirena-brillo-profundo.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección A Mussa",
        "data2": "$135.00",
        "altTexto": "Gama Colección A Mussa con 6 tonos de gel semipermanente, presentando una paleta de colores nude, beige y tonos piel cálidos y suaves ideales para manicura natural o bases",
        "image": "imagenes/gama-gel-mussa-coleccion-a-tonos-nude-beige-maquillaje.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección Athena Mussa",
        "data2": "$135.00",
        "altTexto": "Gama Athena Mussa con 6 tonos de gel semipermanente, presentando una paleta de colores cálidos estilo otoño con tonos tierra, terracota, café y bronce metálico.",
        "image": "imagenes/gama-gel-athena-mussa-tonos-tierra-terracota-bronce.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección B Mussa",
        "data2": "$135.00",
        "altTexto": "Gama Colección B Mussa con 6 tonos de gel semipermanente, presentando una paleta de colores intensos en gama de rojos, vino, borgoña y tinto oscuro",
        "image": "imagenes/gama-gel-mussa-coleccion-b-tonos-rojos-vino-tinto.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección Blush Mussa",
        "data2": "$135.00",
        "altTexto": "Gama Blush Mussa con 6 tonos de gel semipermanente, presentando una paleta de colores sólidos oscuros y elegantes en gama de vino, tinto, borgoña y malva rojizo",
        "image": "imagenes/gama-gel-mussa-coleccion-blush-tonos-vino-tinto-malva.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Colección Cristal Set B Mussa",
        "data2": "$220.00",
        "altTexto": "Gama Cristal B Mussa con 6 tonos de gel semipermanente, presentando colores pastel translúcidos con acabado cristalino y destellos de glitter en rosa, azul, amarillo, lila y verde",
        "image": "imagenes/gama-gel-cristal-set-b-mussa-translucido-glitter-pastel.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Diamante Fondo Negro Set A Mussa",
        "data2": "$200.00",
        "altTexto": "Gama Diamante Fondo Negro Set A Mussa con 6 tonos de gel semipermanente, presentando un efecto de destellos de glitter plateado y holográfico diseñados para resaltar intensamente sobre bases oscuras",
        "image": "imagenes/gama-gel-diamante-fondo-negro-set-a-mussa-glitter-reflex.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Gel Semipermanente Diamante Glow Set A Mussa",
        "data2": "$205.00",
        "altTexto": "Gama Diamante Glow Set A Mussa con 6 tonos de gel semipermanente, presentando colores pastel suaves con destellos de glitter y efecto luminoso en tonos menta, rosa, azul, nude y lima",
        "image": "imagenes/gama-gel-diamante-glow-set-a-mussa-pastel-brillo-luminoso.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa G",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-g.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa gelatina E",
        "data2": "$137.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-gelatina-e.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa H",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-h.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa invierno",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-invierno.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa K",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-k.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa M",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-m.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa P",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-p.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa R",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-r.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa roma",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-roma.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa S",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-s.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa T",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-t.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa U",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-u.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa unicornio",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-unicornio.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa X",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-x.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa Y",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-y.webp"
    },
    {
        "category": "mussa",
        "data": "Gama Mussa Z",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-mussa-z.webp"
    },
    {
        "category": "mussa",
        "data": "Gama neón A",
        "data2": "$210.00",
        "altTexto": "",
        "image": "imagenes/gama-ne-n-a.webp"
    },
    {
        "category": "mussa",
        "data": "Gama nuevo otoño",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-nuevo-oto-o.webp"
    },
    {
        "category": "mussa",
        "data": "Gama ojo de gato 9D A",
        "data2": "$299.00",
        "altTexto": "",
        "image": "imagenes/gama-ojo-de-gato-9d-a.webp"
    },
    {
        "category": "mussa",
        "data": "Gama ojo de gato 9D B",
        "data2": "$299.00",
        "altTexto": "",
        "image": "imagenes/gama-ojo-de-gato-9d-b.webp"
    },
    {
        "category": "mussa",
        "data": "Gama ojo de gato galaxy",
        "data2": "$299.00",
        "altTexto": "",
        "image": "imagenes/gama-ojo-de-gato-galaxy.webp"
    },
    {
        "category": "mussa",
        "data": "Gama rainbow",
        "data2": "$137.00",
        "altTexto": "",
        "image": "imagenes/gama-rainbow.webp"
    },
    {
        "category": "mussa",
        "data": "Gama terra glitter",
        "data2": "$135.00",
        "altTexto": "",
        "image": "imagenes/gama-terra-glitter.webp"
    },
    {
        "category": "mussa",
        "data": "Gama top diamante",
        "data2": "$180.00",
        "altTexto": "",
        "image": "imagenes/gama-top-diamante.webp"
    },
    {
        "category": "mussa",
        "data": "Gama top luminaria",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/gama-top-luminaria.webp"
    },
    {
        "category": "mussa",
        "data": "Gama unicornio",
        "data2": "$137.00",
        "altTexto": "",
        "image": "imagenes/gama-unicornio.webp"
    },
    {
        "category": "mussa",
        "data": "Gel diamante glow A",
        "data2": "$208.00",
        "altTexto": "",
        "image": "imagenes/gel-diamante-glow-a.webp"
    },
    {
        "category": "mussa",
        "data": "Gel diamante glow B",
        "data2": "$208.00",
        "altTexto": "",
        "image": "imagenes/gel-diamante-glow-b.webp"
    },
    {
        "category": "mussa",
        "data": "Gel diamante láser B",
        "data2": "$208.00",
        "altTexto": "",
        "image": "imagenes/gel-diamante-l-ser-b.webp"
    },
    {
        "category": "mussa",
        "data": "Gel mirror crome mussa",
        "data2": "$273.00",
        "altTexto": "",
        "image": "imagenes/gel-mirror-crome-mussa.webp"
    },
    {
        "category": "mussa",
        "data": "Gel neón B",
        "data2": "$210.00",
        "altTexto": "",
        "image": "imagenes/gel-ne-n-b.webp"
    },
    {
        "category": "mussa",
        "data": "Mussa repara grietas",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/mussa-repara-grietas.webp"
    },
    {
        "category": "mussa",
        "data": "Transfer Mussa",
        "data2": "$50.00",
        "altTexto": "",
        "image": "imagenes/transfer-mussa.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Tinta Marble Ink Efecto Blooming (Miss Cherry)",
        "data2": "$35.00",
        "altTexto": "Gama Clear Marble Ink Miss Cherry con 6 tintas efecto blooming o mármol, mostrando la presentación en caja blanca y botella plateada para crear diseños de dispersión y acuarela.",
        "image": "imagenes/gama-tinta-marble-ink-blooming-gel-miss-cherry-efecto-marmol.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Arctic Streamer Miss Cherry 12 Piezas Efecto Aurora",
        "data2": "$350.00",
        "altTexto": "Gama de 12 geles semipermanentes Arctic Streamer de Miss Cherry con efecto aurora y acabado perla en tonos pastel sobre muestrario.",
        "image": "imagenes/gama-gel-arctic-streamer-miss-cherry-aurora-boreal.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Efecto Huevo de Codorniz",
        "data2": "$242.00",
        "altTexto": "Muestrario de 12 tips de uñas con acabado efecto huevo de codorniz en colores pastel y terrosos con moteado negro.",
        "image": "imagenes/gama-gel-efecto-huevo-codorniz.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Efecto Sal Marina con Glitter",
        "data2": "$242.00",
        "altTexto": "Muestrario de 12 tips de uñas con gel efecto sal marina y destellos de glitter, comparando acabados brillante y mate en tonos verde oscuro, azul, morado y café chocolate.",
        "image": "imagenes/gel-efecto-sal-marina-glitter-tonos-tierra-mate-brillo.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Crystal Diamond Night Set A Efecto Flash 12 Tonos",
        "data2": "$403.00",
        "altTexto": "Gama de 12 tonos de gel semipermanente colección Crystal Diamond Night presentados en muestrario, mostrando un acabado de glitter reflectivo intenso en colores metálicos, rosas, verdes y azules.",
        "image": "imagenes/gama-gel-crystal-diamond-night-set-a-glitter-reflectivo-flash.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Crystal Diamond Night Set B Efecto Flash 12 Tonos",
        "data2": "$403.00",
        "altTexto": "Gama de 12 tonos de gel semipermanente colección Crystal Diamond Night Set B presentados en muestrario, mostrando el acabado final de glitter reflectivo flash en colores intensos como rojo, negro, morado, verde y turquesa.",
        "image": "imagenes/gama-gel-crystal-diamond-night-set-b-glitter-reflectivo-flash.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Neón y Confeti Colección E1 12 Tonos",
        "data2": "$260.00",
        "altTexto": "Gama de 12 tonos de gel semipermanente colección E1 mostrada en exhibidor, alternando colores neón sólidos vibrantes con geles de glitter y confeti en tonos verde, rosa, rojo, amarillo, dorado y azul.",
        "image": "imagenes/gama-gel-neon-y-confeti-miss-cherry-coleccion-e1-glitter.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Tonos Pastel y Florales Colección F1",
        "data2": "$260.00",
        "altTexto": "Gama de 12 tonos de gel semipermanente Colección F1, presentando una combinación de colores pastel suaves, nude y rosa vibrante junto con diseños de flores encapsuladas y toques dorados.",
        "image": "imagenes/gama-gel-f1-pastel-floral-primavera-tonos-suaves-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Efecto Aurora Colección Luz de Agua",
        "data2": "$420.00",
        "altTexto": "Gama Luz de Agua Miss Cherry con 12 tonos de gel semipermanente efecto aurora y perla, mostrando acabados iridiscentes y metálicos suaves en colores blanco, rosa, azul, verde, plata y lila",
        "image": "imagenes/gama-gel-luz-de-agua-miss-cherry-efecto-aurora-perla-iridiscente.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Gel Semipermanente Ojo de Gato Diamante Miss Cherry",
        "data2": "$399.00",
        "altTexto": "Gama Ojo de Gato Diamante Miss Cherry con 12 tonos de gel semipermanente, presentando colores pastel brillantes con efecto magnético y destellos de glitter en muestrario circular",
        "image": "imagenes/gama-gel-miss-cherry-ojo-de-gato-diamante.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama ojo de gato Reflejante",
        "data2": "$430.00",
        "altTexto": "",
        "image": "imagenes/gama-ojo-de-gato-reflejante.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Unicornio Colores miss cherry",
        "data2": "$249.00",
        "altTexto": "",
        "image": "imagenes/gama-unicornio-colores-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Valentine day",
        "data2": "$320.00",
        "altTexto": "",
        "image": "imagenes/gama-valentine-day.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gama Yogourt miss cherry",
        "data2": "$380.00",
        "altTexto": "",
        "image": "imagenes/gama-yogourt-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gamas unicornio diamond",
        "data2": "$350.00",
        "altTexto": "",
        "image": "imagenes/gamas-unicornio-diamond.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gelish camaleón flourecente",
        "data2": "-3%",
        "altTexto": "",
        "image": "imagenes/gelish-camale-n-flourecente.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry A",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-a.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry B",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-b.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry B1",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-b1.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry B2",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-b2.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry C",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-c.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry D",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-d.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry D2",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-d2.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry E",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-e.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry F",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-f.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry H",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-h.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry J",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-j.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry K",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-k.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry L",
        "data2": "$200.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-l.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry M",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-m.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry M1",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-m1.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry P",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-p.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry Q",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-q.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry R",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-r.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry S",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-s.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry T",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-t.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry U",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-u.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry X",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-x.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry Y",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-y.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gm miss cherry Z",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/gm-miss-cherry-z.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Hojuelas coreanas gel",
        "data2": "$380.00",
        "altTexto": "",
        "image": "imagenes/hojuelas-coreanas-gel.webp"
    },
    {
        "category": "miss-cherry",
        "data": "KIT de gel miss cherry nude",
        "data2": "$430.00",
        "altTexto": "",
        "image": "imagenes/kit-de-gel-miss-cherry-nude.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Látex misscherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/l-tex-misscherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Liner miss cherry",
        "data2": "$299.00",
        "altTexto": "",
        "image": "imagenes/liner-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Miss cherry D1",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/miss-cherry-d1.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Miss cherry nueva B",
        "data2": "$150.00",
        "altTexto": "",
        "image": "imagenes/miss-cherry-nueva-b.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Miss cherry nueva C",
        "data2": "$120.00",
        "altTexto": "",
        "image": "imagenes/miss-cherry-nueva-c.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Miss cherry nueva D",
        "data2": "$115.00",
        "altTexto": "",
        "image": "imagenes/miss-cherry-nueva-d.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Miss cherry nueva K",
        "data2": "$115.00",
        "altTexto": "",
        "image": "imagenes/miss-cherry-nueva-k.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Nivelador misscherry",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/nivelador-misscherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Pegamento para cristales en TUBITO",
        "data2": "$28.00",
        "altTexto": "",
        "image": "imagenes/pegamento-para-cristales-en-tubito.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Practice amor",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/practice-amor.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Strong base",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/strong-base.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Transfer Foil",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/transfer-foil.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Transfer Foil misscherry",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/transfer-foil-misscherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Unicornio fantasia A miss cherry",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/unicornio-fantasia-a-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Unicornio fantasia B miss cherry",
        "data2": "$209.00",
        "altTexto": "",
        "image": "imagenes/unicornio-fantasia-b-miss-cherry.webp"
    },
    {
        "category": "miss-cherry",
        "data": "Gel suelto 10 ML miss cherry",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/gel-suelto-10-ml-miss-cherry.webp"
    },
    {
        "category": "herramientas",
        "data": "Alicata de mano",
        "data2": "$35.00",
        "altTexto": "Alicata para cutícula marca Miss Cherry de acero inoxidable, herramienta profesional para manicura en empaque rosa.",
        "image": "imagenes/alicata-para-cuticula-miss-cherry-acero-inoxidable.webp"
    },
    {
        "category": "herramientas",
        "data": "Barrilitos 3 granos para drill",
        "data2": "$80.00",
        "altTexto": "Estuche con barrilitos de lija para drill en tres granos mixtos: 80 (grueso), 120 (medio) y 180 (fino), repuestos profesionales para pulidora de uñas.",
        "image": "imagenes/set-barrilitos-para-drill-granos-80-120-180-lijas.webp"
    },
    {
        "category": "herramientas",
        "data": "Bisturí 3 pzas",
        "data2": "$69.00",
        "altTexto": "Set de bisturís para uñas marca Kalanzi, paquete de 3 herramientas metálicas (raspadores y punzones) para limpieza y preparación de manicura en tonos tornasol y dorado.",
        "image": "imagenes/set-bisturi-para-unas-3-piezas-kalanzi-metalico.webp"
    },
    {
        "category": "herramientas",
        "data": "BLEDO JUMBO rose gold",
        "data2": "$60.00",
        "altTexto": "Bledo Jumbo con mango color Rose Gold y cerdas suaves, cepillo profesional para retirar el exceso de polvo tras el limado de uñas.",
        "image": "imagenes/bledo-jumbo-rose-gold-cepillo-para-polvo.webp"
    },
    {
        "category": "herramientas",
        "data": "Cepllitos chicos dobles",
        "data2": "$10.00",
        "altTexto": "Cepillos pequeños de plástico para manicura con asa de agarre, herramientas básicas para retirar el polvo de las uñas, colores surtidos.",
        "image": "imagenes/cepillos-para-manicure-chicos-limpieza-polvo.webp"
    },
    {
        "category": "herramientas",
        "data": "Charola mariposa para cristales",
        "data2": "$40.00",
        "altTexto": "Charola metálica organizadora marca Xiaoya en forma de mariposa, acabado tornasol (camaleón) ideal para vaciar cristales y decoración de uñas.",
        "image": "imagenes/charola-mariposa-para-cristales-xiaoya-tornasol.webp"
    },
    {
        "category": "herramientas",
        "data": "Cio retiro",
        "data2": "$12.00",
        "altTexto": "Cio anatómico de plástico para retiro de uñas, recipiente con 5 cavidades para remojar los dedos en acetona y remover acrílico o gel, disponible en",
        "image": "imagenes/cio-para-retiro-de-unas-acrilicas-y-gel-manicure.webp"
    },
    {
        "category": "herramientas",
        "data": "Cio sencillo",
        "data2": "$20.00",
        "altTexto": "Cio sencillo para manicura en color rosa translúcido, recipiente ergonómico de plástico para remojar las uñas y ablandar cutícula.",
        "image": "imagenes/cio-para-manicure-sencillo-rosa-translucido.webp"
    },
    {
        "category": "herramientas",
        "data": "Cio termico para retiro",
        "data2": "$40.00",
        "altTexto": "Cio térmico de doble fondo para retiro de uñas, recipiente diseñado para usar con agua caliente (baño maría) y acelerar la remoción de acrílico y gel.",
        "image": "imagenes/cio-termico-para-retiro-de-unas-doble-fondo.webp"
    },
    {
        "category": "herramientas",
        "data": "Corta sonrisa de Almendra larga",
        "data2": "$30.00",
        "altTexto": "Herramienta metálica corta sonrisa (French Cutter) en forma de almendra larga, plantilla con varias medidas para realizar cortes precisos de acrílico en manicura francesa.",
        "image": "imagenes/plantilla-corta-sonrisa-metalica-almendra-larga.webp"
    },
    {
        "category": "herramientas",
        "data": "Corta tips camaleón",
        "data2": "$35.00",
        "altTexto": "Corta tips metálico con acabado camaleón tornasol, herramienta profesional de acero inoxidable para cortar y ajustar el largo de uñas postizas.",
        "image": "imagenes/ccorta-tips-metalico-camaleon-tornasol.webp"
    },
    {
        "category": "herramientas",
        "data": "Corta tips con tapa",
        "data2": "$50.00",
        "altTexto": "Corta tips profesional color negro con tapa recolectora transparente, herramienta ergonómica diseñada para cortar uñas postizas y atrapar los residuos evitando que salten.",
        "image": "imagenes/corta-tips-con-tapa-recolectora-negro.webp"
    },
    {
        "category": "herramientas",
        "data": "Corta tips sencillo",
        "data2": "$25.00",
        "altTexto": "Corta tips sencillo estilo Edge Cutter con mango azul de acero inoxidable, herramienta básica y eficaz para recortar el largo de las uñas postizas y acrílicas.",
        "image": "imagenes/corta-tips-sencillo-mango-azul-edge-cutter.webp"
    },
    {
        "category": "herramientas",
        "data": "Dedo de Práctica Articulado para Manicura - Kit con Base Estable y Tips de Repuesto para Acrílico",
        "data2": "$120.00",
        "altTexto": "Kit de entrenamiento para uñas que incluye dedo articulado con base soporte dedos de reemplazo y bolsa de tips de práctica en empaque blister para estudiantes de manicura.",
        "image": "imagenes/dedo-practica-articulado-manicura-con-base-y-tips-repuesto.webp"
    },
    {
        "category": "herramientas",
        "data": "Dedo de práctica sin uña",
        "data2": "$5.00",
        "altTexto": "Dedo de práctica individual de plástico con base adhesiva disponible en modelo sin uña postiza para entrenamiento de manicura.",
        "image": "imagenes/dedo-practica-individual-opcion-sin-una-postiza-base-adhesiva.webp"
    },
    {
        "category": "herramientas",
        "data": "Dedo de práctica con uña",
        "data2": "$5.00",
        "altTexto": "Dedo de práctica individual de plástico con base adhesiva disponible en modelo con uña postiza insertada para entrenamiento de manicura.",
        "image": "imagenes/dedo-practica-individual-opcion-con-una-postiza-base-adhesiva.webp"
    },
    {
        "category": "herramientas",
        "data": "Empujador de cutícula /bisturí",
        "data2": "$10.00",
        "altTexto": "Herramienta metálica para manicura con empujador de cutícula y punta tipo bisturí con mango texturizado antideslizante.",
        "image": "imagenes/empujador-cuticula-acero-inoxidable-bisturi.webp"
    },
    {
        "category": "herramientas",
        "data": "Pincel Esponja para Difuminar Gel con Cristales y Repuestos",
        "data2": "$35.00",
        "altTexto": "Pincel de esponja doble punta para Nail Art con mango transparente relleno de cristales y 4 repuestos de esponja redonda amarilla para efectos degradados.",
        "image": "imagenes/pincel-esponja-difuminar-gel-cristales-repuestos.webp"
    },
    {
        "category": "herramientas",
        "data": "Vaso Esterilizador para Puntas de Drill con Canastilla",
        "data2": "$30.00",
        "altTexto": "Contenedor redondo de plástico translúcido con tapa y canastilla interna de drenaje para la limpieza y desinfección de brocas y herramientas de manicura.",
        "image": "imagenes/vaso-esterilizador-puntas-drill-canastilla.webp"
    },
    {
        "category": "herramientas",
        "data": "Fundidor de Cera Pro-Wax100 Blanco",
        "data2": "$205.00",
        "altTexto": "Olla calentadora para cera depilatoria modelo Pro-Wax100 color blanco con tapa translúcida morada y perilla de control de temperatura.",
        "image": "imagenes/fundidor-cera-pro-wax-100-blanco.webp"
    },
    {
        "category": "herramientas",
        "data": "Gasitas libres de pelusa",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/gasitas-libres-de-pelusa.webp"
    },
    {
        "category": "herramientas",
        "data": "Gasitas libres de pelusa color",
        "data2": "$59.00",
        "altTexto": "",
        "image": "imagenes/gasitas-libres-de-pelusa-color.webp"
    },
    {
        "category": "herramientas",
        "data": "Gasitas libres de pelusa rosas",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/gasitas-libres-de-pelusa-rosas.webp"
    },
    {
        "category": "herramientas",
        "data": "Godete chico con diamante",
        "data2": "$110.00",
        "altTexto": "",
        "image": "imagenes/godete-chico-con-diamante.webp"
    },
    {
        "category": "herramientas",
        "data": "Godetes chico de color",
        "data2": "$15.00",
        "altTexto": "",
        "image": "imagenes/godetes-chico-de-color.webp"
    },
    {
        "category": "herramientas",
        "data": "Jelly spa t",
        "data2": "$26.00",
        "altTexto": "",
        "image": "imagenes/jelly-spa-t.webp"
    },
    {
        "category": "herramientas",
        "data": "Mano de plástico para practica",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/mano-de-pl-stico-para-practica.webp"
    },
    {
        "category": "herramientas",
        "data": "Mascarilla de mano",
        "data2": "$16.00",
        "altTexto": "",
        "image": "imagenes/mascarilla-de-mano.webp"
    },
    {
        "category": "herramientas",
        "data": "Mascarilla de pie",
        "data2": "$16.00",
        "altTexto": "",
        "image": "imagenes/mascarilla-de-pie.webp"
    },
    {
        "category": "herramientas",
        "data": "MOLDE de silicon para 3d",
        "data2": "$25.00",
        "altTexto": "",
        "image": "imagenes/molde-de-silicon-para-3d.webp"
    },
    {
        "category": "herramientas",
        "data": "Muestrario stiletto cristal",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/muestrario-stiletto-cristal.webp"
    },
    {
        "category": "herramientas",
        "data": "Muestrario stiletto natural",
        "data2": "$30.00",
        "altTexto": "",
        "image": "imagenes/muestrario-stiletto-natural.webp"
    },
    {
        "category": "herramientas",
        "data": "Paleta mezcladora con bisturí",
        "data2": "$65.00",
        "altTexto": "",
        "image": "imagenes/paleta-mezcladora-con-bistur.webp"
    },
    {
        "category": "herramientas",
        "data": "Pegatina doble para prees on",
        "data2": "$12.00",
        "altTexto": "",
        "image": "imagenes/pegatina-doble-para-prees-on.webp"
    },
    {
        "category": "herramientas",
        "data": "Pie de práctica",
        "data2": "-14%",
        "altTexto": "",
        "image": "imagenes/pie-de-pr-ctica.webp"
    },
    {
        "category": "herramientas",
        "data": "PINZA para retiro de cristales",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/pinza-para-retiro-de-cristales.webp"
    },
    {
        "category": "herramientas",
        "data": "Pinza sencilla camaleón",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/pinza-sencilla-camale-n.webp"
    },
    {
        "category": "herramientas",
        "data": "Placa de silicón Letras",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/placa-de-silic-n-letras.webp"
    },
    {
        "category": "herramientas",
        "data": "Placa de silicón Marino",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/placa-de-silic-n-marino.webp"
    },
    {
        "category": "herramientas",
        "data": "Placa Silicón Moño",
        "data2": "$70.00",
        "altTexto": "",
        "image": "imagenes/placa-silic-n-mo-o.webp"
    },
    {
        "category": "herramientas",
        "data": "Plantilla chica para acrílico",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/plantilla-chica-para-acr-lico.webp"
    },
    {
        "category": "herramientas",
        "data": "Plantilla grande para acrílico",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/plantilla-grande-para-acr-lico.webp"
    },
    {
        "category": "herramientas",
        "data": "Pododisco",
        "data2": "$69.00",
        "altTexto": "",
        "image": "imagenes/pododisco.webp"
    },
    {
        "category": "herramientas",
        "data": "Porta gasitas con tapa",
        "data2": "$45.00",
        "altTexto": "",
        "image": "imagenes/porta-gasitas-con-tapa.webp"
    },
    {
        "category": "herramientas",
        "data": "Porta resina- esmalte",
        "data2": "$20.00",
        "altTexto": "",
        "image": "imagenes/porta-resina-esmalte.webp"
    },
    {
        "category": "herramientas",
        "data": "Punta cerámica azul",
        "data2": "-21%",
        "altTexto": "",
        "image": "imagenes/punta-cer-mica-azul.webp"
    },
    {
        "category": "herramientas",
        "data": "Punta sellado cut",
        "data2": "$75.00",
        "altTexto": "",
        "image": "imagenes/punta-sellado-cut.webp"
    },
    {
        "category": "herramientas",
        "data": "Punta sellado cutícula",
        "data2": "$22.00",
        "altTexto": "",
        "image": "imagenes/punta-sellado-cut-cula.webp"
    },
    {
        "category": "herramientas",
        "data": "Puntero caremelo dobles",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/puntero-caremelo-dobles.webp"
    },
    {
        "category": "herramientas",
        "data": "Puntero y silicon caramelo",
        "data2": "$41.00",
        "altTexto": "",
        "image": "imagenes/puntero-y-silicon-caramelo.webp"
    },
    {
        "category": "herramientas",
        "data": "Punteros dobles ks",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/punteros-dobles-ks.webp"
    },
    {
        "category": "herramientas",
        "data": "Set de 3 contenedores para monomero y acrílico",
        "data2": "$189.00",
        "altTexto": "",
        "image": "imagenes/set-de-3-contenedores-para-monomero-y-acr-lico.webp"
    },
    {
        "category": "herramientas",
        "data": "Set de bisturí camaleón",
        "data2": "$100.00",
        "altTexto": "",
        "image": "imagenes/set-de-bistur-camale-n.webp"
    },
    {
        "category": "herramientas",
        "data": "Set de bisturí camaleón 6",
        "data2": "$190.00",
        "altTexto": "",
        "image": "imagenes/set-de-bistur-camale-n-6.webp"
    },
    {
        "category": "herramientas",
        "data": "Sponge forma Corazón",
        "data2": "$5.00",
        "altTexto": "",
        "image": "imagenes/sponge-forma-coraz-n.webp"
    },
    {
        "category": "herramientas",
        "data": "Tapete de cristales para aplicación de acrílico",
        "data2": "$80.00",
        "altTexto": "",
        "image": "imagenes/tapete-de-cristales-para-aplicaci-n-de-acr-lico.webp"
    },
    {
        "category": "herramientas",
        "data": "Tijera super fina y curva para cutícula",
        "data2": "$40.00",
        "altTexto": "",
        "image": "imagenes/tijera-super-fina-y-curva-para-cut-cula.webp"
    },
    {
        "category": "herramientas",
        "data": "Triangulo recolector de cristales",
        "data2": "$10.00",
        "altTexto": "",
        "image": "imagenes/triangulo-recolector-de-cristales.webp"
    },
    {
        "category": "herramientas",
        "data": "Vaso limpia pincel",
        "data2": "$35.00",
        "altTexto": "",
        "image": "imagenes/vaso-limpia-pincel.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Animales Tiernos",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil para transferencia en uñas con diseños coloridos de animales estilo caricatura tierna.",
        "image": "imagenes/set-foil-transfer-nail-art-animales-caricatura.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Corazones",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil para transferencia con variedad de diseños de corazones rojos, coloridos y geométricos.",
        "image": "imagenes/set-foil-transfer-unas-corazones-amor-san-valentin.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas San Valentín",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de foil con diseños románticos de San Valentín, incluyendo corazones, rosas, ositos y frases de amor en colores rojo y rosa.",
        "image": "imagenes/set-foil-unas-san-valentin-corazones-amor.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Degradado Pastel",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de papel foil para uñas con efectos de degradado suave en colores pastel y arcoíris (rosa, azul, amarillo).",
        "image": "imagenes/set-foil-transfer-unas-degradado-pastel-arcoiris.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Galaxia",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños del espacio exterior, incluyendo galaxias, nebulosas, estrellas y patrones abstractos en tonos azul, morado y naranja.",
        "image": "imagenes/set-foil-transfer-unas-galaxia-espacio-abstracto.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Flamas",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de papel foil para uñas con diseños de flamas y fuego en colores variados (rojo, azul, morado, amarillo) y degradados.",
        "image": "imagenes/set-foil-transfer-unas-flamas-fuego-colores.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Flores Difuminado",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de papel foil con diseños de flores variadas sobre fondos difuminados tipo tie-dye y acuarela en colores vibrantes.",
        "image": "imagenes/set-foil-transfer-unas-flores-difuminado-tie-dye.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Frutas",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de papel foil para uñas con diseños de frutas variadas y coloridas como fresas, limones, sandías, piñas y uvas.",
        "image": "imagenes/set-foil-transfer-unas-frutas-tropicales-verano.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Holográfico Diseños",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil plateado con efectos holográficos y patrones variados como estrellas, remolinos, puntos y formas",
        "image": "imagenes/set-foil-transfer-unas-holografico-disenos-plata.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Holográfico Liso",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil para uñas con acabados metálicos y holográficos lisos (sin estampado) en tonos plata y arcoíris.",
        "image": "imagenes/set-foil-transfer-unas-holografico-liso-plata.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Mandalas",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños coloridos de mandalas, figuras geométricas y patrones paisley estilo bohemio.",
        "image": "imagenes/set-foil-transfer-unas-mandalas-paisley-boho.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Mandalas Geométrico",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños vibrantes de mandalas combinados con figuras geométricas y patrones tribales coloridos.",
        "image": "imagenes/set-foil-transfer-unas-mandalas-geometrico-tribal.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Mandalas y Formas",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil que incluye variedad de diseños de mandalas, figuras geométricas y patrones abstractos en tonos tierra y pastel.",
        "image": "imagenes/set-foil-transfer-unas-mandalas-formas-geometricas-mix.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Moños",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil para uñas con diseños de moños, lazos y cintas en colores variados y estilos tiernos.",
        "image": "imagenes/set-foil-transfer-unas-monos-lazos-coquette-cute.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Musical",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil para uñas con diseños musicales, incluyendo notas, claves de sol, guitarras y estampados estilo graffiti colorido.",
        "image": "imagenes/set-foil-transfer-unas-musical-notas-graffiti.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas San Valentín Love",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños románticos que incluyen labios, besos, rosas, flamingos y frases de Love en tonos rojo y rosa.",
        "image": "imagenes/set-foil-transfer-unas-san-valentin-love-labios-besos.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Serpientes",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños estilo tatuaje de serpientes, cobras, dragones y rosas con calaveras en colores variados.",
        "image": "imagenes/set-foil-transfer-unas-serpientes-cobras-dragones-tattoo.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Siluetas",
        "data2": "$25.00",
        "altTexto": "Estuche organizador con 10 rollos de papel foil con diseños de arte lineal (line art), incluyendo siluetas de rostros de mujer, flores y formas abstractas con toques de color.",
        "image": "imagenes/set-foil-transfer-unas-siluetas-rostros-line-art.webp"
    },
    {
        "category": "foil",
        "data": "Foil para Uñas Degradado A",
        "data2": "$25.00",
        "altTexto": "Estuche con 10 rollos de papel foil para uñas con efectos de degradado y difuminado en colores neón brillantes como naranja, verde y azul.",
        "image": "imagenes/set-foil-transfer-unas-degradado-colores-neon.webp"
    }
];