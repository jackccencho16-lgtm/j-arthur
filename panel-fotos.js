// Paneles de obra (persistencia en localStorage)
let paneles = JSON.parse(localStorage.getItem("paneles_fotos") || "[]");
let panelActualId = null;

const listaPaneles = document.getElementById("lista-paneles");
const galeriaGrid = document.getElementById("galeria-grid");
const inputFotos = document.getElementById("input-fotos");
const btnSubir = document.getElementById("btn-subir");
const btnNuevoPanel = document.getElementById("btn-nuevo-panel");
const nombrePanel = document.getElementById("nombre-panel");

function guardar() {
    try {
        localStorage.setItem("paneles_fotos", JSON.stringify(paneles));
        return true;
    } catch (e) {
        if (!window.__avisoAlmacenamiento) {
            window.__avisoAlmacenamiento = true;
            alert("El almacenamiento del navegador esta lleno. Elimina fotos de otros paneles para poder guardar las nuevas.");
        }
        return false;
    }
}

function crearId() {
    return Date.now().toString(36) + Math.random().toString(36).substr(2, 5);
}

function renderPaneles() {
    listaPaneles.innerHTML = "";
    if (paneles.length === 0) {
        listaPaneles.innerHTML = "<p>No hay paneles creados. Crea el primero.</p>";
        return;
    }
    paneles.forEach(function(p) {
        const div = document.createElement("div");
        div.className = "panel-card" + (p.id === panelActualId ? " activo" : "");
        div.innerHTML = "<h3>" + p.nombre + "</h3><p>" + p.fotos.length + " foto(s)</p>";
        div.addEventListener("click", function() { seleccionarPanel(p.id); });
        listaPaneles.appendChild(div);
    });
}

function renderGaleria() {
    galeriaGrid.innerHTML = "";
    const panel = paneles.find(function(p) { return p.id === panelActualId; });
    if (!panel || panel.fotos.length === 0) {
        galeriaGrid.innerHTML = "<p>No hay fotos en este panel.</p>";
        return;
    }
    panel.fotos.forEach(function(f) {
        const card = document.createElement("div");
        card.className = "foto-card";
        card.dataset.id = f.id;
        const img = document.createElement("img");
        img.src = f.url;
        img.alt = f.nombre;
        const info = document.createElement("div");
        info.className = "foto-info";
        const caption = document.createElement("input");
        caption.type = "text";
        caption.value = f.caption || "";
        caption.placeholder = "Caption de la foto";
        caption.addEventListener("input", function() {
            f.caption = caption.value;
            guardar();
        });
        const inputUbicacion = document.createElement("input");
        inputUbicacion.type = "text";
        inputUbicacion.value = f.ubicacion || "";
        inputUbicacion.placeholder = "Ubicacion";
        inputUbicacion.addEventListener("input", function() {
            f.ubicacion = inputUbicacion.value;
            guardar();
        });
        const inputLat = document.createElement("input");
        inputLat.type = "text";
        inputLat.value = f.lat || "";
        inputLat.placeholder = "Latitud";
        inputLat.addEventListener("input", function() {
            f.lat = inputLat.value;
            guardar();
        });
        const inputLng = document.createElement("input");
        inputLng.type = "text";
        inputLng.value = f.lng || "";
        inputLng.placeholder = "Longitud";
        inputLng.addEventListener("input", function() {
            f.lng = inputLng.value;
            guardar();
        });
        const inputHora = document.createElement("input");
        inputHora.type = "text";
        inputHora.value = f.hora || "";
        inputHora.placeholder = "Hora";
        inputHora.addEventListener("input", function() {
            f.hora = inputHora.value;
            guardar();
        });
        const inputFecha = document.createElement("input");
        inputFecha.type = "text";
        inputFecha.value = f.fecha || "";
        inputFecha.placeholder = "Fecha";
        inputFecha.addEventListener("input", function() {
            f.fecha = inputFecha.value;
            guardar();
        });
        info.appendChild(caption);
        info.appendChild(inputUbicacion);
        info.appendChild(inputLat);
        info.appendChild(inputLng);
        info.appendChild(inputHora);
        info.appendChild(inputFecha);
        const btnEliminar = document.createElement("button");
        btnEliminar.textContent = "Eliminar";
        btnEliminar.addEventListener("click", function() { eliminarFoto(f.id); });
        info.appendChild(btnEliminar);
        card.appendChild(img);
        card.appendChild(info);
        galeriaGrid.appendChild(card);
    });
}

function seleccionarPanel(id) {
    panelActualId = id;
    renderPaneles();
    renderGaleria();
    renderReporte();
}

function crearPanel() {
    const nombre = nombrePanel.value.trim();
    if (!nombre) { alert("Escribe un nombre para el panel."); return; }
    const panel = { id: crearId(), nombre: nombre, fotos: [] };
    paneles.push(panel);
    panelActualId = panel.id;
    nombrePanel.value = "";
    guardar();
    renderPaneles();
    renderGaleria();
    renderReporte();
}

function comprimirArchivo(file, maxLado) {
    return new Promise(function(resolve, reject) {
        const objectUrl = URL.createObjectURL(file);
        cargarImagen(objectUrl).then(function(img) {
            let w = img.naturalWidth || img.width;
            let h = img.naturalHeight || img.height;
            const escala = Math.min(1, maxLado / Math.max(w, h));
            w = Math.max(1, Math.round(w * escala));
            h = Math.max(1, Math.round(h * escala));
            const canvas = document.createElement("canvas");
            canvas.width = w;
            canvas.height = h;
            const ctx = canvas.getContext("2d");
            ctx.fillStyle = "#ffffff";
            ctx.fillRect(0, 0, w, h);
            ctx.drawImage(img, 0, 0, w, h);
            URL.revokeObjectURL(objectUrl);
            resolve({ dataUrl: canvas.toDataURL("image/jpeg", 0.85), width: w, height: h });
        }).catch(function(err) {
            URL.revokeObjectURL(objectUrl);
            reject(err);
        });
    });
}

function subirFotos(files) {
    if (!panelActualId) { alert("Selecciona o crea un panel primero."); return; }
    const panelId = panelActualId;
    Array.from(files).forEach(function(file) {
        comprimirArchivo(file, 1600).then(function(res) {
            const panel = paneles.find(function(p) { return p.id === panelId; });
            if (!panel) return;
            panel.fotos.push({ id: crearId(), nombre: file.name, caption: "", url: res.dataUrl, ubicacion: "", lat: "", lng: "", hora: "", fecha: "" });
            guardar();
            if (panelId === panelActualId) {
                renderGaleria();
                renderReporte();
            }
        }).catch(function() {
            alert("No se pudo procesar la imagen: " + file.name);
        });
    });
}

function eliminarFoto(id) {
    const panel = paneles.find(function(p) { return p.id === panelActualId; });
    if (!panel) return;
    const idx = panel.fotos.findIndex(function(f) { return f.id === id; });
    if (idx >= 0) {
        panel.fotos.splice(idx, 1);
        guardar();
        renderGaleria();
        renderReporte();
    }
}

btnNuevoPanel.addEventListener("click", crearPanel);

btnSubir.addEventListener("click", function() { inputFotos.click(); });

inputFotos.addEventListener("change", function(e) {
    if (e.target.files) subirFotos(e.target.files);
    e.target.value = "";
});

galeriaGrid.addEventListener("click", function(e) {
    const btn = e.target.closest("button");
    if (!btn) return;
    const card = btn.closest(".foto-card");
    if (!card) return;
    const id = card.dataset.id;
    eliminarFoto(id);
});

function renderReporte() {
    const panel = paneles.find(function(p) { return p.id === panelActualId; });
    const titulo = document.getElementById("rep-titulo");
    const pPanel = document.getElementById("rep-panel");
    const repFotos = document.getElementById("rep-fotos");
    if (!panel) {
        titulo.textContent = "Reporte de Obra";
        pPanel.textContent = "Selecciona un panel.";
        repFotos.innerHTML = "";
        return;
    }
    titulo.textContent = "Reporte: " + panel.nombre;
    pPanel.textContent = "Fecha: " + new Date().toLocaleDateString();
    repFotos.innerHTML = "";
    if (panel.fotos.length === 0) {
        repFotos.innerHTML = "<p>No hay fotos en este panel.</p>";
        return;
    }
    panel.fotos.forEach(function(f) {
        const div = document.createElement("div");
        div.className = "rep-foto-item";
        const img = document.createElement("img");
        img.src = f.url;
        img.alt = f.nombre;
        const meta = document.createElement("div");
        meta.className = "rep-foto-meta";
        let html = "<h4>" + f.nombre + "</h4><p>" + (f.caption || "Sin caption") + "</p>";
        if (f.ubicacion) html += "<p>Ubicacion: " + f.ubicacion + "</p>";
        if (f.lat) html += "<p>Lat: " + f.lat + "</p>";
        if (f.lng) html += "<p>Lng: " + f.lng + "</p>";
        if (f.hora) html += "<p>Hora: " + f.hora + "</p>";
        if (f.fecha) html += "<p>Fecha: " + f.fecha + "</p>";
        meta.innerHTML = html;
        div.appendChild(img);
        div.appendChild(meta);
        repFotos.appendChild(div);
    });
}

function cargarScript(src) {
    return new Promise(function(resolve, reject) {
        const s = document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = function() { reject(new Error("No se pudo cargar " + src)); };
        document.head.appendChild(s);
    });
}

function slug(texto) {
    const limpio = (texto || "panel").toString().toLowerCase()
        .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "");
    return limpio || "panel";
}

function cargarImagen(url) {
    return new Promise(function(resolve, reject) {
        const img = new Image();
        img.onload = function() { resolve(img); };
        img.onerror = function() { reject(new Error("No se pudo cargar la imagen")); };
        img.src = url;
    });
}

function prepararImagen(url, maxLado, formato) {
    return cargarImagen(url).then(function(img) {
        let w = img.naturalWidth || img.width;
        let h = img.naturalHeight || img.height;
        if (!w || !h) { w = maxLado; h = maxLado; }
        const escala = Math.min(1, maxLado / Math.max(w, h));
        w = Math.max(1, Math.round(w * escala));
        h = Math.max(1, Math.round(h * escala));
        const canvas = document.createElement("canvas");
        canvas.width = w;
        canvas.height = h;
        const ctx = canvas.getContext("2d");
        ctx.fillStyle = "#ffffff";
        ctx.fillRect(0, 0, w, h);
        ctx.drawImage(img, 0, 0, w, h);
        const dataUrl = formato === "png"
            ? canvas.toDataURL("image/png")
            : canvas.toDataURL("image/jpeg", 0.88);
        return { dataUrl: dataUrl, width: w, height: h };
    });
}

function bloquearBoton(id, texto) {
    const btn = document.getElementById(id);
    if (!btn) return null;
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = texto;
    return function() {
        btn.disabled = false;
        btn.textContent = original;
    };
}

function panelActual() {
    return paneles.find(function(p) { return p.id === panelActualId; });
}

async function generarPDF() {
    const panel = panelActual();
    if (!panel || panel.fotos.length === 0) {
        alert("No hay fotos para generar el reporte.");
        return;
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
        try { await cargarScript("https://unpkg.com/jspdf@2.5.1/dist/jspdf.umd.min.js"); } catch (e) {}
    }
    if (!window.jspdf || !window.jspdf.jsPDF) {
        alert("No se pudo cargar la libreria de PDF. Revisa tu conexion a internet.");
        return;
    }

    const restaurar = bloquearBoton("btn-pdf", "Generando PDF...");
    try {
        const jsPDF = window.jspdf.jsPDF;
        const doc = new jsPDF({ unit: "mm", format: "a4", orientation: "portrait" });
        const pageW = doc.internal.pageSize.getWidth();
        const pageH = doc.internal.pageSize.getHeight();
        const margen = 12;
        const anchoUtil = pageW - margen * 2;
        let y = margen;

        doc.setFont("helvetica", "bold");
        doc.setFontSize(16);
        doc.text("Reporte: " + panel.nombre, margen, y + 6);
        y += 12;
        doc.setFont("helvetica", "normal");
        doc.setFontSize(10);
        doc.text("Fecha: " + new Date().toLocaleDateString(), margen, y + 2);
        y += 7;
        doc.setDrawColor(210);
        doc.line(margen, y, pageW - margen, y);
        y += 7;

        for (let i = 0; i < panel.fotos.length; i++) {
            const f = panel.fotos[i];
            let img = null;
            try { img = await prepararImagen(f.url, 1400); } catch (e) { img = null; }

            let dibW = anchoUtil;
            let dibH = 0;
            if (img) {
                dibH = dibW * img.height / img.width;
                const maxH = 110;
                if (dibH > maxH) {
                    dibH = maxH;
                    dibW = dibH * img.width / img.height;
                }
            }

            const lineas = [];
            lineas.push({ texto: f.nombre || "Sin nombre", negrita: true, tam: 10 });
            lineas.push({ texto: f.caption || "Sin caption", negrita: false, tam: 10 });
            if (f.ubicacion) lineas.push({ texto: "Ubicacion: " + f.ubicacion, negrita: false, tam: 9 });
            if (f.lat || f.lng) lineas.push({ texto: "Coordenadas: " + [f.lat, f.lng].filter(Boolean).join(", "), negrita: false, tam: 9 });
            if (f.hora) lineas.push({ texto: "Hora: " + f.hora, negrita: false, tam: 9 });
            if (f.fecha) lineas.push({ texto: "Fecha: " + f.fecha, negrita: false, tam: 9 });

            const alturaTexto = lineas.length * 4.6;
            const alturaBloque = (img ? dibH + 4 : 10) + alturaTexto + 8;

            if (y + alturaBloque > pageH - margen - 8) {
                doc.addPage();
                y = margen;
            }

            if (img) {
                const x = margen + (anchoUtil - dibW) / 2;
                doc.addImage(img.dataUrl, "JPEG", x, y, dibW, dibH);
                y += dibH + 4;
            } else {
                doc.setFontSize(9);
                doc.setTextColor(180, 30, 30);
                doc.text("Imagen no disponible: " + (f.nombre || ""), margen, y + 4);
                doc.setTextColor(0, 0, 0);
                y += 8;
            }

            for (let j = 0; j < lineas.length; j++) {
                const l = lineas[j];
                doc.setFont("helvetica", l.negrita ? "bold" : "normal");
                doc.setFontSize(l.tam);
                const partes = doc.splitTextToSize(l.texto, anchoUtil);
                for (let k = 0; k < partes.length; k++) {
                    if (y > pageH - margen - 6) {
                        doc.addPage();
                        y = margen;
                    }
                    doc.text(partes[k], margen, y + 4);
                    y += 4.4;
                }
            }

            y += 6;
            doc.setDrawColor(235);
            doc.line(margen, y - 2, pageW - margen, y - 2);
        }

        const total = doc.getNumberOfPages();
        for (let p = 1; p <= total; p++) {
            doc.setPage(p);
            doc.setFont("helvetica", "normal");
            doc.setFontSize(8);
            doc.setTextColor(120);
            doc.text("Pagina " + p + " de " + total, pageW - margen, pageH - 6, { align: "right" });
        }

        doc.save("reporte-" + slug(panel.nombre) + ".pdf");
    } catch (err) {
        console.error(err);
        alert("Ocurrio un error al generar el PDF: " + (err && err.message ? err.message : err));
    } finally {
        if (restaurar) restaurar();
    }
}

async function generarWord() {
    const panel = panelActual();
    if (!panel || panel.fotos.length === 0) {
        alert("No hay fotos para generar el reporte.");
        return;
    }
    let docxV8 = false;
    if (!window.docx || typeof window.docx.Document !== "function") {
        try { await cargarScript("https://unpkg.com/docx@9.15.3/dist/index.umd.cjs"); } catch (e) {}
        if (!window.docx || typeof window.docx.Document !== "function") {
            try {
                await cargarScript("https://cdn.jsdelivr.net/npm/docx@8.5.0/build/index.umd.js");
                docxV8 = true;
            } catch (e) {}
        }
    }
    if (typeof window.saveAs !== "function") {
        try { await cargarScript("https://cdn.jsdelivr.net/npm/file-saver@2.0.5/dist/FileSaver.min.js"); } catch (e) {}
    }
    if (!window.docx || typeof window.docx.Document !== "function" || typeof window.saveAs !== "function") {
        alert("No se pudo cargar la libreria de Word. Revisa tu conexion a internet.");
        return;
    }

    const restaurar = bloquearBoton("btn-word", "Generando Word...");
    try {
        const d = window.docx;
        const Document = d.Document;
        const Packer = d.Packer;
        const Paragraph = d.Paragraph;
        const TextRun = d.TextRun;
        const ImageRun = d.ImageRun;
        const HeadingLevel = d.HeadingLevel;
        const AlignmentType = d.AlignmentType;

        const hijos = [];
        hijos.push(new Paragraph({ text: "Reporte de Obra: " + panel.nombre, heading: HeadingLevel.HEADING_1 }));
        hijos.push(new Paragraph({
            spacing: { after: 200 },
            children: [new TextRun({ text: "Fecha: " + new Date().toLocaleDateString(), color: "666666" })]
        }));

        for (let i = 0; i < panel.fotos.length; i++) {
            const f = panel.fotos[i];
            let img = null;
            try { img = await prepararImagen(f.url, 1200, docxV8 ? "png" : "jpeg"); } catch (e) { img = null; }

            if (img) {
                const maxW = 580;
                const maxH = 430;
                const escala = Math.min(maxW / img.width, maxH / img.height, 1);
                const w = Math.max(1, Math.round(img.width * escala));
                const h = Math.max(1, Math.round(img.height * escala));
                const opcionesImagen = {
                    data: img.dataUrl,
                    transformation: { width: w, height: h }
                };
                if (!docxV8) opcionesImagen.type = "jpg";
                hijos.push(new Paragraph({
                    alignment: AlignmentType.CENTER,
                    spacing: { before: 200, after: 80 },
                    children: [new ImageRun(opcionesImagen)]
                }));
            } else {
                hijos.push(new Paragraph({
                    children: [new TextRun({ text: "[Imagen no disponible: " + (f.nombre || "") + "]", color: "B00020" })]
                }));
            }

            hijos.push(new Paragraph({
                spacing: { after: 40 },
                children: [new TextRun({ text: f.nombre || "Sin nombre", bold: true })]
            }));
            hijos.push(new Paragraph({
                spacing: { after: 40 },
                children: [new TextRun({ text: f.caption || "Sin caption" })]
            }));
            if (f.ubicacion) hijos.push(new Paragraph({ children: [new TextRun({ text: "Ubicacion: " + f.ubicacion, size: 18, color: "444444" })] }));
            if (f.lat || f.lng) hijos.push(new Paragraph({ children: [new TextRun({ text: "Coordenadas: " + [f.lat, f.lng].filter(Boolean).join(", "), size: 18, color: "444444" })] }));
            if (f.hora) hijos.push(new Paragraph({ children: [new TextRun({ text: "Hora: " + f.hora, size: 18, color: "444444" })] }));
            if (f.fecha) hijos.push(new Paragraph({ children: [new TextRun({ text: "Fecha: " + f.fecha, size: 18, color: "444444" })] }));
            hijos.push(new Paragraph({ text: "", spacing: { after: 160 } }));
        }

        const documento = new Document({
            sections: [{
                properties: { page: { margin: { top: 720, right: 720, bottom: 720, left: 720 } } },
                children: hijos
            }]
        });

        const blob = await Packer.toBlob(documento);
        window.saveAs(blob, "reporte-" + slug(panel.nombre) + ".docx");
    } catch (err) {
        console.error(err);
        alert("Ocurrio un error al generar el Word: " + (err && err.message ? err.message : err));
    } finally {
        if (restaurar) restaurar();
    }
}

document.getElementById("ano").textContent = new Date().getFullYear();

renderPaneles();
renderGaleria();
renderReporte();

document.getElementById("btn-pdf").addEventListener("click", generarPDF);
document.getElementById("btn-word").addEventListener("click", generarWord);
