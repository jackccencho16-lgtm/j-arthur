(function () {
    "use strict";

    function iniciar() {
        const header = document.getElementById("header");
        const nav = document.getElementById("nav");
        const menuToggle = document.getElementById("menu-toggle");
        const botonArriba = document.getElementById("arriba");
        const formulario = document.getElementById("formulario");
        const estadoFormulario = document.getElementById("form-estado");
        const anio = document.getElementById("ano");
        const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

        if (anio) {
            anio.textContent = new Date().getFullYear();
        }

        function actualizarHeader() {
            if (header) {
                header.classList.toggle("compacto", window.scrollY > 14);
            }
            if (botonArriba) {
                botonArriba.classList.toggle("visible", window.scrollY > 520);
            }
        }

        actualizarHeader();
        window.addEventListener("scroll", actualizarHeader, { passive: true });

        function cerrarMenu() {
            document.body.classList.remove("menu-abierto");
            if (menuToggle) {
                menuToggle.setAttribute("aria-expanded", "false");
                menuToggle.setAttribute("aria-label", "Abrir menú");
            }
        }

        if (nav && menuToggle) {
            menuToggle.addEventListener("click", function () {
                const abierto = document.body.classList.toggle("menu-abierto");
                menuToggle.setAttribute("aria-expanded", String(abierto));
                menuToggle.setAttribute("aria-label", abierto ? "Cerrar menú" : "Abrir menú");
            });

            nav.querySelectorAll("a").forEach(function (enlace) {
                enlace.addEventListener("click", cerrarMenu);
            });

            document.addEventListener("keydown", function (evento) {
                if (evento.key === "Escape") {
                    cerrarMenu();
                }
            });

            document.addEventListener("click", function (evento) {
                if (!document.body.classList.contains("menu-abierto")) {
                    return;
                }
                if (!nav.contains(evento.target) && !menuToggle.contains(evento.target)) {
                    cerrarMenu();
                }
            });

            window.addEventListener("resize", function () {
                if (window.innerWidth > 820) {
                    cerrarMenu();
                }
            });
        }

        if (botonArriba) {
            botonArriba.addEventListener("click", function () {
                window.scrollTo({ top: 0, behavior: reducido ? "auto" : "smooth" });
            });
        }

        const revelables = Array.prototype.slice.call(document.querySelectorAll(".revelar"));

        if (reducido || !("IntersectionObserver" in window)) {
            revelables.forEach(function (elemento) {
                elemento.classList.add("visible");
            });
        } else {
            const observadorRevelar = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (entrada.isIntersecting) {
                        entrada.target.classList.add("visible");
                        observadorRevelar.unobserve(entrada.target);
                    }
                });
            }, { rootMargin: "0px 0px -8% 0px", threshold: 0.12 });

            revelables.forEach(function (elemento) {
                observadorRevelar.observe(elemento);
            });
        }

        const contadores = Array.prototype.slice.call(document.querySelectorAll("[data-contador]"));

        if (!reducido) {
            contadores.forEach(function (elemento) {
                elemento.textContent = "0";
            });
        }

        function animarContador(elemento) {
            const objetivo = Number(elemento.dataset.contador) || 0;
            if (reducido) {
                elemento.textContent = objetivo.toLocaleString("es-PE");
                return;
            }
            const duracion = 1500;
            const inicio = performance.now();

            function paso(ahora) {
                const progreso = Math.min((ahora - inicio) / duracion, 1);
                const suavizado = 1 - Math.pow(1 - progreso, 3);
                elemento.textContent = Math.round(objetivo * suavizado).toLocaleString("es-PE");
                if (progreso < 1) {
                    requestAnimationFrame(paso);
                }
            }

            requestAnimationFrame(paso);
        }

        if (contadores.length) {
            if (!("IntersectionObserver" in window)) {
                contadores.forEach(animarContador);
            } else {
                const observadorContador = new IntersectionObserver(function (entradas) {
                    entradas.forEach(function (entrada) {
                        if (entrada.isIntersecting) {
                            animarContador(entrada.target);
                            observadorContador.unobserve(entrada.target);
                        }
                    });
                }, { threshold: 0.4 });

                contadores.forEach(function (elemento) {
                    observadorContador.observe(elemento);
                });
            }
        }

        if (nav && "IntersectionObserver" in window) {
            const enlaces = Array.prototype.slice.call(nav.querySelectorAll('a[href^="#"]:not(.boton)'));
            const mapa = new Map();

            enlaces.forEach(function (enlace) {
                enlace.classList.remove("activo");
            });
            if (enlaces.length) {
                enlaces[0].classList.add("activo");
            }

            enlaces.forEach(function (enlace) {
                const id = enlace.getAttribute("href").slice(1);
                const seccion = document.getElementById(id);
                if (seccion) {
                    mapa.set(seccion, enlace);
                }
            });

            const observadorSeccion = new IntersectionObserver(function (entradas) {
                entradas.forEach(function (entrada) {
                    if (!entrada.isIntersecting) {
                        return;
                    }
                    enlaces.forEach(function (enlace) {
                        enlace.classList.remove("activo");
                    });
                    const enlaceActivo = mapa.get(entrada.target);
                    if (enlaceActivo) {
                        enlaceActivo.classList.add("activo");
                    }
                });
            }, { rootMargin: "-45% 0px -50% 0px", threshold: 0 });

            mapa.forEach(function (_, seccion) {
                observadorSeccion.observe(seccion);
            });
        }

        function mostrarError(campo, texto) {
            const contenedor = campo.closest(".campo");
            const salida = contenedor ? contenedor.querySelector(".error") : null;
            if (contenedor) {
                contenedor.classList.add("invalido");
            }
            if (salida) {
                salida.textContent = texto;
            }
            campo.setAttribute("aria-invalid", "true");
        }

        function limpiarError(campo) {
            const contenedor = campo.closest(".campo");
            const salida = contenedor ? contenedor.querySelector(".error") : null;
            if (contenedor) {
                contenedor.classList.remove("invalido");
            }
            if (salida) {
                salida.textContent = "";
            }
            campo.removeAttribute("aria-invalid");
        }

        if (formulario) {
            const nombre = formulario.querySelector("#nombre");
            const correo = formulario.querySelector("#correo");
            const telefono = formulario.querySelector("#telefono");
            const mensaje = formulario.querySelector("#mensaje");

            [nombre, correo, telefono, mensaje].forEach(function (campo) {
                if (!campo) {
                    return;
                }
                campo.addEventListener("input", function () {
                    limpiarError(campo);
                });
            });

            formulario.addEventListener("submit", function (evento) {
                evento.preventDefault();
                let valido = true;
                let primerInvalido = null;

                [nombre, correo, telefono, mensaje].forEach(function (campo) {
                    if (campo) {
                        limpiarError(campo);
                    }
                });

                if (nombre && nombre.value.trim().length < 3) {
                    mostrarError(nombre, "Ingresa tu nombre completo.");
                    valido = false;
                    primerInvalido = primerInvalido || nombre;
                }

                if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(correo.value.trim())) {
                    mostrarError(correo, "Ingresa un correo electrónico válido.");
                    valido = false;
                    primerInvalido = primerInvalido || correo;
                }

                if (telefono && telefono.value.trim()) {
                    const digitos = telefono.value.replace(/\D/g, "");
                    if (digitos.length < 6) {
                        mostrarError(telefono, "El teléfono debe tener al menos 6 dígitos.");
                        valido = false;
                        primerInvalido = primerInvalido || telefono;
                    }
                }

                if (mensaje && mensaje.value.trim().length < 10) {
                    mostrarError(mensaje, "Describe tu proyecto con al menos 10 caracteres.");
                    valido = false;
                    primerInvalido = primerInvalido || mensaje;
                }

                if (!valido) {
                    if (estadoFormulario) {
                        estadoFormulario.textContent = "Revisa los campos marcados antes de enviar.";
                        estadoFormulario.classList.add("error");
                    }
                    if (primerInvalido) {
                        primerInvalido.focus();
                    }
                    return;
                }

                if (estadoFormulario) {
                    const nombrePersona = nombre ? nombre.value.trim().split(" ")[0] : "";
                    estadoFormulario.textContent = "Gracias" + (nombrePersona ? ", " + nombrePersona : "") + ". Recibimos tu solicitud y te contactaremos en las próximas 24 horas hábiles.";
                    estadoFormulario.classList.remove("error");
                }

                formulario.reset();

                window.setTimeout(function () {
                    if (estadoFormulario) {
                        estadoFormulario.textContent = "";
                    }
                }, 9000);
            });
        }
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
