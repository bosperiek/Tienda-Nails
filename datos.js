// URL de tu Google Sheet publicado vía opensheet
// Reemplaza TU_SHEET_ID por el ID real de tu Google Sheet
const SHEET_ID = "1pwoKKCUUlxmqUQGEMCEemXHngq-4wWUMPfMReI2vQdA";
const SHEET_NOMBRE = "productos"; // nombre exacto de la pestaña/hoja
const SHEET_URL = `https://opensheet.elk.sh/${SHEET_ID}/${SHEET_NOMBRE}`;

// Esta variable queda disponible igual que antes,
// pero ahora se llena de forma asíncrona desde el Sheet.
let misProductos = [];

// Callbacks que se ejecutan cuando los productos ya están listos
// (útil si tu código necesita saber cuándo llegaron los datos)
const listenersProductos = [];

function alCargarProductos(callback) {
    if (misProductos.length > 0) {
        callback(misProductos);
    } else {
        listenersProductos.push(callback);
    }
}

async function cargarProductosDesdeSheet() {
    try {
        const res = await fetch(SHEET_URL);
        if (!res.ok) throw new Error("Error al obtener el sheet: " + res.status);

        const filas = await res.json();

        // Normaliza los datos (por si vienen espacios o vacíos)
        misProductos = filas
            .filter(p => p.data && p.data.trim() !== "")
            .map(p => ({
                category: (p.category || "").trim(),
                data: (p.data || "").trim(),
                data2: (p.data2 || "").trim(),
                altTexto: (p.altTexto || "").trim(),
                image: (p.image || "").trim()
            }));

        // Avisa a quien esté esperando los datos
        listenersProductos.forEach(cb => cb(misProductos));
        listenersProductos.length = 0;

        // Dispara un evento global por si otras partes del código lo escuchan
        document.dispatchEvent(new CustomEvent("productosActualizados", { detail: misProductos }));

        return misProductos;
    } catch (err) {
        console.error("No se pudieron cargar los productos desde Google Sheets:", err);
        return [];
    }
}

// Carga inicial al abrir la página
cargarProductosDesdeSheet();

// Refresca cada 30 segundos para reflejar cambios hechos en el Sheet
setInterval(cargarProductosDesdeSheet, 30000);
