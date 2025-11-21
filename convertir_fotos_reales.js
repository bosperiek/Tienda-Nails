const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// --- CONFIGURACIÓN ---
const carpetaImagenes = path.join(__dirname, 'imagenes');

console.log(`📂 Buscando imágenes (JPG y PNG) en: ${carpetaImagenes}`);

fs.readdir(carpetaImagenes, (err, archivos) => {
    if (err) {
        console.error('❌ Error:', err);
        return;
    }

    let contador = 0;

    archivos.forEach(archivo => {
        const extension = path.extname(archivo).toLowerCase();

        // CAMBIO AQUÍ: Agregamos '.png' a la lista
        if (['.jpg', '.jpeg', '.png'].includes(extension)) {
            const nombreSinExt = path.parse(archivo).name;

            const rutaEntrada = path.join(carpetaImagenes, archivo);
            const rutaSalida = path.join(carpetaImagenes, `${nombreSinExt}.webp`);

            sharp(rutaEntrada)
                // Sharp detecta automáticamente si hay transparencia y la mantiene
                .webp({ quality: 80 })
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

    console.log('🚀 Iniciando conversión...');
});