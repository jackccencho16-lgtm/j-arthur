(function () {
    "use strict";

    var HASH_VALIDO = "2ce143eb3c3af4dc63aeef462a9ced63004c5853616e453891e997f4da356ddc";
    var CLAVE_SESION = "blog_acceso";

    var FOTOS = [
        { archivo: "fotitos/1.jpeg", pie: "Nuestra aventura en el sendero de la monta\u00f1a, abrazados bajo el cielo azul" },
        { archivo: "fotitos/2.jpeg", pie: "Nuestro beso junto a la cascada y la sirena, como en un cuento" },
        { archivo: "fotitos/3.jpeg", pie: "Un beso en tu mejilla y tu sonrisa que me enamora, entre globos rosados" },
        { archivo: "fotitos/4.jpeg", pie: "Tu frente bajo las luces de la plaza, en nuestra noche perfecta" },
        { archivo: "fotitos/5.jpeg", pie: "A tu lado en el estadio, animando juntos y sonriendo" },
        { archivo: "fotitos/6.jpeg", pie: "La ciudad entera a nuestros pies desde el mirador de Ayacucho" },
        { archivo: "fotitos/7.jpeg", pie: "Nuestro domo de luces, un rinc\u00f3n que parece de cuento" },
        { archivo: "fotitos/8.jpeg", pie: "De la mano frente al agua, sellando otro mes de amor" },
        { archivo: "fotitos/9.jpeg", pie: "Contigo bajo el cielo y las nubes, mi vista favorita" },
        { archivo: "fotitos/10.jpeg", pie: "Tu abrazo en la noche, mi lugar seguro en el mundo" }
    ];

    var FRASES = [
        "Te elegir\u00eda una y mil veces, en cada 12 de cada mes.",
        "Cada 12 celebramos que sigues siendo mi persona favorita.",
        "Nuestro amor se renueva cada mes, como la luna: siempre tuyo.",
        "Doce veces al a\u00f1o te vuelvo a pedir que te quedes para siempre.",
        "Contigo, todos los d\u00edas merecen celebrarse como un 12.",
        "Cada foto de aqu\u00ed guarda un \u201cte amo\u201d que no alcanz\u00f3 a decirse.",
        "Si el amor se midiera en meses, el nuestro no cabr\u00eda en el calendario.",
        "Mi lugar favorito del mundo sigue siendo a tu lado.",
        "Gracias por hacer que cada d\u00eda com\u00fan se sienta como aniversario.",
        "Que nunca se acaben nuestros 12: ni los d\u00edas, ni los meses, ni nosotros."
    ];

    var acceso = document.getElementById("acceso");
    var formulario = document.getElementById("form-acceso");
    var campoClave = document.getElementById("clave");
    var textoError = document.getElementById("clave-error");
    var album = document.getElementById("album");
    var cuadricula = document.getElementById("album-grid");
    var botonBloquear = document.getElementById("btn-bloquear");

    var mainPagina = document.querySelector(".blog-pagina");
    var heroBloqueado = document.getElementById("hero-bloqueado");
    var heroRomantico = document.getElementById("hero-romantico");
    var zonaAcceso = document.getElementById("zona-acceso");
    var zonaAlbum = document.getElementById("zona-album");

    var lightbox = document.getElementById("lightbox");
    var lbImagen = document.getElementById("lb-imagen");
    var lbPie = document.getElementById("lb-pie");
    var lbCerrar = document.getElementById("lb-cerrar");
    var lbPrev = document.getElementById("lb-prev");
    var lbNext = document.getElementById("lb-next");

    var corazonesFondo = document.getElementById("corazones-fondo");
    var corazonesBurst = document.getElementById("corazones-burst");

    var mensajeAniversario = document.getElementById("aniversario-mensaje");
    var fraseRomantica = document.getElementById("frase-romantica");

    var indiceActual = 0;
    var intentosFallidos = 0;

    function nombreFoto(indice) {
        return FOTOS[indice].pie;
    }

    function azar(minimo, maximo) {
        return minimo + Math.random() * (maximo - minimo);
    }

    function calcularHash(texto) {
        if (!(window.crypto && crypto.subtle && crypto.subtle.digest)) {
            return Promise.resolve(null);
        }
        var datos = new TextEncoder().encode(texto);
        return crypto.subtle.digest("SHA-256", datos).then(function (buffer) {
            var bytes = new Uint8Array(buffer);
            var hex = "";
            for (var i = 0; i < bytes.length; i++) {
                hex += bytes[i].toString(16).padStart(2, "0");
            }
            return hex;
        });
    }

    function mostrarError(mensaje) {
        textoError.textContent = mensaje;
    }

    function actualizarAniversario() {
        if (!mensajeAniversario) {
            return;
        }
        var hoy = new Date();
        var dia = hoy.getDate();
        if (dia === 12) {
            mensajeAniversario.textContent = "\u00a1Feliz aniversario! Hoy celebramos otro mes am\u00e1ndonos \u2764";
            mensajeAniversario.closest(".aniversario").classList.add("hoy");
            return;
        }
        var proximo = new Date(hoy.getFullYear(), hoy.getMonth(), 12);
        if (dia > 12) {
            proximo = new Date(hoy.getFullYear(), hoy.getMonth() + 1, 12);
        }
        var dias = Math.ceil((proximo - hoy) / 86400000);
        mensajeAniversario.textContent = "Faltan " + dias + (dias === 1 ? " d\u00eda" : " d\u00edas") + " para celebrarnos otra vez \u2764";
    }

    function mostrarFrase() {
        if (!fraseRomantica) {
            return;
        }
        var indice = Math.floor(Math.random() * FRASES.length);
        fraseRomantica.textContent = "\u201c" + FRASES[indice] + "\u201d";
    }

    function construirAlbum() {
        if (cuadricula.childElementCount) {
            return;
        }
        FOTOS.forEach(function (foto, indice) {
            var figura = document.createElement("figure");
            figura.className = "album-item";

            var imagen = document.createElement("img");
            imagen.src = foto.archivo;
            imagen.alt = foto.pie;
            imagen.loading = "lazy";
            imagen.decoding = "async";

            var pie = document.createElement("figcaption");
            pie.textContent = foto.pie;

            figura.appendChild(imagen);
            figura.appendChild(pie);
            figura.setAttribute("tabindex", "0");
            figura.setAttribute("role", "button");
            figura.setAttribute("aria-label", "Ampliar: " + foto.pie);
            figura.addEventListener("click", function () {
                abrirVisor(indice);
            });
            figura.addEventListener("keydown", function (evento) {
                if (evento.key === "Enter" || evento.key === " ") {
                    evento.preventDefault();
                    abrirVisor(indice);
                }
            });
            cuadricula.appendChild(figura);
        });
    }

    function crearCorazonesFondo() {
        if (!corazonesFondo || corazonesFondo.childElementCount) {
            return;
        }
        for (var i = 0; i < 20; i++) {
            var corazon = document.createElement("span");
            corazon.textContent = "\u2764";
            corazon.style.setProperty("--x", azar(2, 98).toFixed(1) + "%");
            corazon.style.setProperty("--s", azar(.7, 1.8).toFixed(2) + "rem");
            corazon.style.setProperty("--d", azar(8, 16).toFixed(1) + "s");
            corazon.style.setProperty("--delay", azar(0, 12).toFixed(1) + "s");
            corazon.style.setProperty("--o", azar(.22, .6).toFixed(2));
            corazon.style.setProperty("--rot", (Math.random() > .5 ? "" : "-") + azar(10, 32).toFixed(0) + "deg");
            corazonesFondo.appendChild(corazon);
        }
    }

    function lanzarCorazones() {
        if (!corazonesBurst) {
            return;
        }
        corazonesBurst.innerHTML = "";
        for (var i = 0; i < 22; i++) {
            var corazon = document.createElement("span");
            corazon.textContent = "\u2764";
            corazon.style.setProperty("--tx", azar(-200, 200).toFixed(0) + "px");
            corazon.style.setProperty("--ty", (azar(-260, -40)).toFixed(0) + "px");
            corazon.style.setProperty("--s", azar(.9, 2.1).toFixed(2) + "rem");
            corazon.style.setProperty("--d", azar(1, 1.7).toFixed(2) + "s");
            corazon.style.setProperty("--rot", (Math.random() > .5 ? "" : "-") + azar(15, 60).toFixed(0) + "deg");
            corazonesBurst.appendChild(corazon);
        }
        window.setTimeout(function () {
            corazonesBurst.innerHTML = "";
        }, 2000);
    }

    function desbloquear(silencioso) {
        acceso.hidden = true;
        if (heroBloqueado) {
            heroBloqueado.hidden = true;
        }
        if (zonaAcceso) {
            zonaAcceso.hidden = true;
        }
        if (heroRomantico) {
            heroRomantico.hidden = false;
        }
        if (zonaAlbum) {
            zonaAlbum.hidden = false;
        }
        if (mainPagina) {
            mainPagina.classList.add("desbloqueado");
        }
        construirAlbum();
        crearCorazonesFondo();
        if (!silencioso) {
            lanzarCorazones();
        }
    }

    function bloquear() {
        if (zonaAlbum) {
            zonaAlbum.hidden = true;
        }
        if (heroRomantico) {
            heroRomantico.hidden = true;
        }
        if (zonaAcceso) {
            zonaAcceso.hidden = false;
        }
        if (heroBloqueado) {
            heroBloqueado.hidden = false;
        }
        acceso.hidden = false;
        if (mainPagina) {
            mainPagina.classList.remove("desbloqueado");
        }
        if (corazonesFondo) {
            corazonesFondo.innerHTML = "";
        }
        sessionStorage.removeItem(CLAVE_SESION);
        campoClave.value = "";
        window.scrollTo({ top: 0, behavior: "smooth" });
    }

    function abrirVisor(indice) {
        indiceActual = indice;
        lbImagen.src = FOTOS[indiceActual].archivo;
        lbImagen.alt = nombreFoto(indiceActual);
        if (lbPie) {
            lbPie.textContent = nombreFoto(indiceActual);
        }
        lightbox.hidden = false;
        document.body.style.overflow = "hidden";
        lbCerrar.focus();
    }

    function cerrarVisor() {
        lightbox.hidden = true;
        lbImagen.src = "";
        document.body.style.overflow = "";
    }

    function cambiarFoto(paso) {
        indiceActual = (indiceActual + paso + FOTOS.length) % FOTOS.length;
        lbImagen.src = FOTOS[indiceActual].archivo;
        lbImagen.alt = nombreFoto(indiceActual);
        if (lbPie) {
            lbPie.textContent = nombreFoto(indiceActual);
        }
    }

    function iniciar() {
        if (!acceso || !formulario || !album) {
            return;
        }

        actualizarAniversario();
        mostrarFrase();

        if (sessionStorage.getItem(CLAVE_SESION) === "1") {
            desbloquear(true);
        }

        formulario.addEventListener("submit", function (evento) {
            evento.preventDefault();
            var clave = campoClave.value;

            if (!clave.trim()) {
                mostrarError("Escribe nuestra palabra secreta.");
                campoClave.focus();
                return;
            }

            calcularHash(clave).then(function (hash) {
                if (hash === HASH_VALIDO) {
                    intentosFallidos = 0;
                    mostrarError("");
                    sessionStorage.setItem(CLAVE_SESION, "1");
                    desbloquear();
                } else if (hash === null) {
                    mostrarError("Tu navegador no permite la verificaci\u00f3n. \u00c1brelo en un navegador actualizado.");
                } else {
                    intentosFallidos++;
                    mostrarError("Esa no es nuestra palabra... intento " + intentosFallidos + " \u2764");
                    campoClave.select();
                }
            });
        });

        campoClave.addEventListener("input", function () {
            if (textoError.textContent) {
                mostrarError("");
            }
        });

        if (botonBloquear) {
            botonBloquear.addEventListener("click", bloquear);
        }

        if (lightbox) {
            lbCerrar.addEventListener("click", cerrarVisor);
            lbPrev.addEventListener("click", function () { cambiarFoto(-1); });
            lbNext.addEventListener("click", function () { cambiarFoto(1); });

            lightbox.addEventListener("click", function (evento) {
                if (evento.target === lightbox) {
                    cerrarVisor();
                }
            });

            document.addEventListener("keydown", function (evento) {
                if (lightbox.hidden) {
                    return;
                }
                if (evento.key === "Escape") {
                    cerrarVisor();
                } else if (evento.key === "ArrowLeft") {
                    cambiarFoto(-1);
                } else if (evento.key === "ArrowRight") {
                    cambiarFoto(1);
                }
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
