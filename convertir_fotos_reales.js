const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- CONFIGURACIÓN ---
// Aquí definimos que busque dentro de 'catalogo' y luego en 'imagenes'
const carpetaImagenes = path.join(__dirname, 'catalogo', 'imagenes');

console.log(`📂 Buscando imágenes en: ${carpetaImagenes}`);

// Leemos la carpeta
fs.readdir(carpetaImagenes, (err, archivos) => {
    if (err) {
        console.error('❌ Error al leer la carpeta. Verifica que la ruta sea correcta.');
        console.error(err);
        return;
    }

    let contador = 0;

    archivos.forEach(archivo => {
        // Obtenemos la extensión del archivo (ej: .jpg)
        const extension = path.extname(archivo).toLowerCase();

        // Solo procesamos si es JPG, JPEG o PNG
        if (['.jpg', '.jpeg', '.png'].includes(extension)) {
            const nombreSinExt = path.parse(archivo).name;
            
            const rutaEntrada = path.join(carpetaImagenes, archivo);
            const rutaSalida = path.join(carpetaImagenes, `${nombreSinExt}.webp`);

            // Usamos SHARP para convertir
            sharp(rutaEntrada)
                .webp({ quality: 80 }) // Calidad del 80% (buen balance peso/calidad)
                .toFile(rutaSalida)
                .then(() => {
                    console.log(`✅ Convertido: ${archivo} -> ${nombreSinExt}.webp`);
                    contador++;
                })
                .catch(err => {
                    console.error(`❌ Falló: ${archivo}`, err);
                });
        }
    });

    console.log('🚀 Iniciando conversión masiva...');
});