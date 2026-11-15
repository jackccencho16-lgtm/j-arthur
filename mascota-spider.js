(function () {
    "use strict";

    function iniciar() {
        if (document.querySelector(".mascota-spider")) {
            return;
        }

        const reducido = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const mascota = document.createElement("div");

        mascota.className = "mascota-spider";
        mascota.innerHTML = [
            '<div class="mascota-spider__flotante">',
            '    <span class="mascota-spider__tela" aria-hidden="true"></span>',
            '    <button class="mascota-spider__control" type="button" aria-label="Pausar a Spider-Man" aria-pressed="false" title="Dos toques para pausar o reanudar">',
            '        <span class="mascota-spider__estado" aria-hidden="true">PAUSA</span>',
            '        <span class="mascota-spider__giro">',
            '            <svg class="mascota-spider__svg" viewBox="0 0 100 160" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" focusable="false">',
            '                <defs>',
            '                    <linearGradient id="msRojo" x1="33" y1="14" x2="72" y2="147" gradientUnits="userSpaceOnUse">',
            '                        <stop offset="0" stop-color="#ff626e"/>',
            '                        <stop offset=".42" stop-color="#d21c31"/>',
            '                        <stop offset="1" stop-color="#710817"/>',
            '                    </linearGradient>',
            '                    <linearGradient id="msAzul" x1="18" y1="24" x2="82" y2="72" gradientUnits="userSpaceOnUse">',
            '                        <stop offset="0" stop-color="#3d7cf0"/>',
            '                        <stop offset=".52" stop-color="#1745a8"/>',
            '                        <stop offset="1" stop-color="#071b4c"/>',
            '                    </linearGradient>',
            '                    <linearGradient id="msAcero" x1="0" y1="0" x2="1" y2="1">',
            '                        <stop offset="0" stop-color="#ffffff"/>',
            '                        <stop offset=".55" stop-color="#d3dee7"/>',
            '                        <stop offset="1" stop-color="#8795a4"/>',
            '                    </linearGradient>',
            '                    <linearGradient id="msOjo" x1="0" y1="0" x2="0" y2="1">',
            '                        <stop offset="0" stop-color="#ffffff"/>',
            '                        <stop offset=".62" stop-color="#effdff"/>',
            '                        <stop offset="1" stop-color="#a0dff1"/>',
            '                    </linearGradient>',
            '                    <linearGradient id="msBrillo" x1="0" y1="0" x2="1" y2="1">',
            '                        <stop offset="0" stop-color="#ffc5cb" stop-opacity=".7"/>',
            '                        <stop offset="1" stop-color="#ffc5cb" stop-opacity="0"/>',
            '                    </linearGradient>',
            '                    <clipPath id="msCabezaClip">',
            '                        <path d="M50 105.5c10.6 0 18.5 8.3 18.5 20.2S60.6 146 50 146s-18.5-8.5-18.5-20.3S39.4 105.5 50 105.5Z"/>',
            '                    </clipPath>',
            '                    <clipPath id="msTorsoClip">',
            '                        <path d="M32 91C35 80 38.5 69.5 41 57.5h18c2.5 12 6 22.5 9 33.5-6 4.8-12 7-18 7s-12-2.2-18-7Z"/>',
            '                    </clipPath>',
            '                    <filter id="msGlow" x="-90%" y="-90%" width="280%" height="280%">',
            '                        <feGaussianBlur stdDeviation=".9" result="brillo"/>',
            '                        <feMerge>',
            '                            <feMergeNode in="brillo"/>',
            '                            <feMergeNode in="SourceGraphic"/>',
            '                        </feMerge>',
            '                    </filter>',
            '                </defs>',
            '                <g>',
            '                    <path d="M43 60C31 57 20 49 17 38" fill="none" stroke="#160207" stroke-width="16.5" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M43 60C31 57 20 49 17 38" fill="none" stroke="url(#msAzul)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M40 57C31 55 24 49 21 42" fill="none" stroke="#75a6ff" stroke-width="1.7" stroke-linecap="round" opacity=".55"/>',
            '                    <path d="M17 38C16 30 21 23 30 19" fill="none" stroke="#160207" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M17 38C16 30 21 23 30 19" fill="none" stroke="url(#msAzul)" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M20 33C20 28 23 24 27 21" fill="none" stroke="#75a6ff" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>',
            '                    <path d="M30 17.5c2.5-1.3 5-.3 5.5 2.2l.5 3.8-7.5 1.8-2.8-3.7Z" fill="url(#msRojo)" stroke="#160207" stroke-width="1.5" stroke-linejoin="round"/>',
            '                </g>',
            '                <g>',
            '                    <path d="M57 60C69 57 80 49 83 38" fill="none" stroke="#160207" stroke-width="16.5" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M57 60C69 57 80 49 83 38" fill="none" stroke="url(#msAzul)" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M60 57C69 55 76 49 79 42" fill="none" stroke="#75a6ff" stroke-width="1.7" stroke-linecap="round" opacity=".55"/>',
            '                    <path d="M83 38C84 30 79 23 70 19" fill="none" stroke="#160207" stroke-width="15" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M83 38C84 30 79 23 70 19" fill="none" stroke="url(#msAzul)" stroke-width="10.5" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M80 33C80 28 77 24 73 21" fill="none" stroke="#75a6ff" stroke-width="1.5" stroke-linecap="round" opacity=".55"/>',
            '                    <path d="M70 17.5c-2.5-1.3-5-.3-5.5 2.2l-.5 3.8 7.5 1.8 2.8-3.7Z" fill="url(#msRojo)" stroke="#160207" stroke-width="1.5" stroke-linejoin="round"/>',
            '                </g>',
            '                <path d="M32 91C35 80 38.5 69.5 41 57.5h18c2.5 12 6 22.5 9 33.5-6 4.8-12 7-18 7s-12-2.2-18-7Z" fill="url(#msRojo)" stroke="#160207" stroke-width="2.2"/>',
            '                <g clip-path="url(#msTorsoClip)" fill="none" stroke="#610812" stroke-width=".75" opacity=".6">',
            '                    <path d="M50 58v38M38 65 62 91M62 65 38 91M35 77h30"/>',
            '                    <path d="M40 72c6-2.5 14-2.5 20 0M38.5 82c7-2.5 16-2.5 23 0"/>',
            '                </g>',
            '                <path d="M41 58c-1 10-2 20-4.5 29l-2 5 3.5 1c2-12 3.5-23 6-34Z" fill="url(#msAzul)" opacity=".96"/>',
            '                <path d="M59 58c1 10 2 20 4.5 29l2 5-3.5 1c-2-12-3.5-23-6-34Z" fill="url(#msAzul)" opacity=".96"/>',
            '                <path d="M37 89c4 2.5 8 4 13 4s9-1.5 13-4" fill="none" stroke="#ff9aa5" stroke-width="1.2" stroke-linecap="round" opacity=".45"/>',
            '                <path d="M42 68c5-2 11-2 16 0M40 77c6-2 14-2 20 0M42 86c5-2 11-2 16 0" fill="none" stroke="#7b0a1a" stroke-width="1" stroke-linecap="round" opacity=".55"/>',
            '                <g fill="none" stroke="#f2f7fa" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round">',
            '                    <path d="M48.8 70 41.8 65.2 35.8 60.8M48.6 73 39.5 71 32.5 67.5M49 79 41.5 82.5 37.2 88M49.3 81.5 42.8 88.5 39 94M51.2 70 58.2 65.2 64.2 60.8M51.4 73 60.5 71 67.5 67.5M51 79 58.5 82.5 62.8 88M50.7 81.5 57.2 88.5 61 94"/>',
            '                </g>',
            '                <ellipse cx="50" cy="75.5" rx="2.4" ry="4.2" fill="#2a0309" stroke="#f2f7fa" stroke-width="1.1"/>',
            '                <circle cx="50" cy="70.3" r="1.6" fill="#2a0309" stroke="#f2f7fa" stroke-width=".95"/>',
            '                <g class="mascota-spider__manito">',
            '                    <path d="M35 90.5C30 79 24 68 24.5 59L41 31" fill="none" stroke="#160207" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M35 90.5C30 79 24 68 24.5 59L41 31" fill="none" stroke="url(#msRojo)" stroke-width="8.6" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M34 86C30 78 27 68 27.5 61L40 35" fill="none" stroke="url(#msBrillo)" stroke-width="1.8" stroke-linecap="round"/>',
            '                    <path d="M36.6 33.3 43.5 30" stroke="#160207" stroke-width="4.4" stroke-linecap="round"/>',
            '                    <path d="M36.6 33.3 43.5 30" stroke="url(#msAcero)" stroke-width="2.7" stroke-linecap="round"/>',
            '                </g>',
            '                <g>',
            '                    <path d="M65 90.5C70 79 76 68 75.5 59L59 31" fill="none" stroke="#160207" stroke-width="12" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M65 90.5C70 79 76 68 75.5 59L59 31" fill="none" stroke="url(#msRojo)" stroke-width="8.6" stroke-linecap="round" stroke-linejoin="round"/>',
            '                    <path d="M66 86C70 78 73 68 72.5 61L60 35" fill="none" stroke="url(#msBrillo)" stroke-width="1.8" stroke-linecap="round"/>',
            '                    <path d="M63.4 33.3 56.5 30" stroke="#160207" stroke-width="4.4" stroke-linecap="round"/>',
            '                    <path d="M63.4 33.3 56.5 30" stroke="url(#msAcero)" stroke-width="2.7" stroke-linecap="round"/>',
            '                </g>',
            '                <path d="M45 92.5h10v15H45Z" fill="url(#msRojo)" stroke="#160207" stroke-width="1.6"/>',
            '                <g transform="rotate(180 50 126)">',
            '                    <g class="mascota-spider__cabeza">',
            '                    <path d="M50 105.5c10.6 0 18.5 8.3 18.5 20.2S60.6 146 50 146s-18.5-8.5-18.5-20.3S39.4 105.5 50 105.5Z" fill="url(#msRojo)" stroke="#160207" stroke-width="2.2"/>',
            '                    <g clip-path="url(#msCabezaClip)" fill="none" stroke="#5c0712" stroke-width=".8" opacity=".72">',
            '                        <path d="M50 106v40M39 110 61 142M61 110 39 142M34 120 66 132M66 120 34 132M31.5 129h37"/>',
            '                        <path d="M40 112c3-2.5 6.5-3.8 10-3.8s7 1.3 10 3.8M35.5 121c4-3 9.2-4.5 14.5-4.5s10.5 1.5 14.5 4.5M38 133c3.5 1.8 7.7 2.7 12 2.7s8.5-.9 12-2.7"/>',
            '                    </g>',
            '                    <g class="mascota-spider__ojos">',
            '                    <path d="M39 117.8c2.4-3.7 7.2-4.4 10-1.3l-1 6.1c-3.1 2.2-7.6 1.6-9.3-1.3-.8-1.2-.7-2.3.3-3.5Z" fill="url(#msOjo)" stroke="#0b0205" stroke-width="1.55" stroke-linejoin="round" filter="url(#msGlow)"/>',
            '                    <path d="M61 117.8c-2.4-3.7-7.2-4.4-10-1.3l1 6.1c3.1 2.2 7.6 1.6 9.3-1.3.8-1.2.7-2.3-.3-3.5Z" fill="url(#msOjo)" stroke="#0b0205" stroke-width="1.55" stroke-linejoin="round" filter="url(#msGlow)"/>',
            '                    <path d="M41.2 119 46.4 117.6" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity=".9"/>',
            '                    <path d="M58.8 119 53.6 117.6" stroke="#ffffff" stroke-width="1" stroke-linecap="round" opacity=".9"/>',
            '                    </g>',
            '                    <path d="M42 108c4-3.3 9.5-5 15.5-5l-2.2 6.2c-4.1 0-7.7 1-10.7 3Z" fill="url(#msBrillo)" opacity=".48"/>',
            '                    </g>',
            '                </g>',
            '                <path d="M42 12c-3.2 1.6-4.3 5-2.3 7.5 1.9 2.4 5.4 2.3 7.2-.1l2.3-4-4.7-3.9Z" fill="url(#msRojo)" stroke="#160207" stroke-width="1.7" stroke-linejoin="round"/>',
            '                <path d="M58 12c3.2 1.6 4.3 5 2.3 7.5-1.9 2.4-5.4 2.3-7.2-.1l-2.3-4 4.7-3.9Z" fill="url(#msRojo)" stroke="#160207" stroke-width="1.7" stroke-linejoin="round"/>',
            '                <path d="M46 13.5c1.2-.7 2.7-.5 3.5.5M54 13.5c-1.2-.7-2.7-.5-3.5.5" fill="none" stroke="#6b0815" stroke-width="1" stroke-linecap="round"/>',
            '                <circle cx="50" cy="15.5" r="1.8" fill="url(#msAcero)" stroke="#160207" stroke-width=".8"/>',
            '            </svg>',
            '        </span>',
            '    </button>',
            '</div>',
            '<div class="mascota-spider__saludo" aria-hidden="true">¡Hola!</div>'
        ].join("");

        document.body.appendChild(mascota);

        const control = mascota.querySelector(".mascota-spider__control");
        const burbujaSaludo = mascota.querySelector(".mascota-spider__saludo");
        let x = 0;
        let y = 0;
        let destinoX = null;
        let destinoY = null;
        let pausaHasta = 0;
        let ultimoTiempo = performance.now();
        let ultimoToque = 0;
        let pausada = false;
        let temporizadorResize = null;
        let temporizadorAcrobacia = null;
        let temporizadorToque = null;
        let temporizadorSaludo = null;
        let temporizadorBurbuja = null;
        let indiceSaludo = 0;
        const frasesSaludo = [
            "¡Hola!",
            "¿En qué te ayudo?",
            "¿Tienes un proyecto?",
            "¡Hablemos de tu obra!"
        ];

        function limites() {
            const margen = window.innerWidth <= 820 ? 12 : 18;
            const cabecera = document.querySelector(".header");
            const altoCabecera = cabecera ? Math.min(cabecera.getBoundingClientRect().height + 12, 132) : margen;
            const ancho = mascota.offsetWidth || 88;
            const alto = mascota.offsetHeight || 141;
            const zonaInferior = window.innerWidth <= 820 ? 102 : 118;

            return {
                minX: margen,
                maxX: Math.max(margen, window.innerWidth - ancho - margen),
                minY: Math.max(margen, altoCabecera),
                maxY: Math.max(margen, window.innerHeight - alto - zonaInferior)
            };
        }

        function colocar() {
            mascota.style.transform = "translate3d(" + x.toFixed(2) + "px, " + y.toFixed(2) + "px, 0)";
        }

        function elegirDestino() {
            const zona = limites();
            const separacion = Math.min(340, Math.max(170, window.innerWidth * .28));
            let mejor = null;
            let mejorDistancia = -1;

            for (let intento = 0; intento < 14; intento += 1) {
                const nx = zona.minX + Math.random() * (zona.maxX - zona.minX);
                const ny = zona.minY + Math.random() * (zona.maxY - zona.minY);
                const distancia = Math.hypot(nx - x, ny - y);

                if (distancia > mejorDistancia) {
                    mejorDistancia = distancia;
                    mejor = { x: nx, y: ny };
                }

                if (distancia > separacion) {
                    destinoX = nx;
                    destinoY = ny;
                    return;
                }
            }

            destinoX = mejor ? mejor.x : zona.minX;
            destinoY = mejor ? mejor.y : zona.maxY;
        }

        function ajustarAlRedimensionar() {
            const zona = limites();
            x = Math.min(Math.max(x, zona.minX), zona.maxX);
            y = Math.min(Math.max(y, zona.minY), zona.maxY);
            destinoX = null;
            pausaHasta = performance.now() + 500;
            colocar();
        }

        function animarAcrobacia() {
            if (reducido) {
                return;
            }
            window.clearTimeout(temporizadorAcrobacia);
            mascota.classList.remove("mascota-spider--acrobacia");
            void mascota.offsetWidth;
            mascota.classList.add("mascota-spider--acrobacia");
            temporizadorAcrobacia = window.setTimeout(function () {
                mascota.classList.remove("mascota-spider--acrobacia");
            }, 960);
        }

        function alternarPausa() {
            pausada = !pausada;
            mascota.classList.toggle("pausada", pausada);
            control.setAttribute("aria-pressed", String(pausada));
            control.setAttribute("aria-label", pausada ? "Reanudar a Spider-Man" : "Pausar a Spider-Man");
            control.setAttribute("title", pausada ? "Dos toques para reanudar" : "Dos toques para pausar");
            destinoX = null;
            destinoY = null;
            pausaHasta = performance.now() + (pausada ? 0 : 320);
            animarAcrobacia();
        }

        function marcarToque() {
            control.classList.remove("toque");
            void control.offsetWidth;
            control.classList.add("toque");
            window.clearTimeout(temporizadorToque);
            temporizadorToque = window.setTimeout(function () {
                control.classList.remove("toque");
            }, 480);
        }

        function ocultarSaludo() {
            mascota.classList.remove("mascota-spider--saluda");
        }

        function saludar() {
            if (document.hidden) {
                programarSaludo(9000);
                return;
            }

            burbujaSaludo.textContent = frasesSaludo[indiceSaludo % frasesSaludo.length];
            indiceSaludo += 1;

            mascota.classList.remove("mascota-spider--saluda");
            void mascota.offsetWidth;
            mascota.classList.add("mascota-spider--saluda");

            window.clearTimeout(temporizadorBurbuja);
            temporizadorBurbuja = window.setTimeout(ocultarSaludo, 4400);

            programarSaludo(16000 + Math.random() * 18000);
        }

        function programarSaludo(demora) {
            window.clearTimeout(temporizadorSaludo);
            temporizadorSaludo = window.setTimeout(saludar, demora);
        }

        control.addEventListener("pointerup", function (evento) {
            if (evento.pointerType === "mouse" && evento.button !== 0) {
                return;
            }

            const ahora = performance.now();
            pausaHasta = Math.max(pausaHasta, ahora + 520);
            marcarToque();

            if (ahora - ultimoToque < 420) {
                ultimoToque = 0;
                alternarPausa();
                return;
            }

            ultimoToque = ahora;
        });

        control.addEventListener("keydown", function (evento) {
            if (evento.key === "Enter" || evento.key === " ") {
                evento.preventDefault();
                alternarPausa();
            }
        });

        function animar(ahora) {
            const delta = Math.min((ahora - ultimoTiempo) / 16.667, 2.6);
            ultimoTiempo = ahora;

            if (!pausada && !document.hidden && !control.matches(":focus-visible") && ahora >= pausaHasta) {
                if (destinoX === null) {
                    elegirDestino();
                } else {
                    const dx = destinoX - x;
                    const dy = destinoY - y;
                    const distancia = Math.hypot(dx, dy);

                    if (distancia < 2.5) {
                        x = destinoX;
                        y = destinoY;
                        destinoX = null;
                        pausaHasta = ahora + 800 + Math.random() * 1900;
                        colocar();
                    } else {
                        const suavizado = 1 - Math.pow(.983, delta);

                        x += dx * suavizado;
                        y += dy * suavizado;

                        if (Math.abs(dx) > 6) {
                            mascota.dataset.direccion = dx < 0 ? "izquierda" : "derecha";
                        }

                        colocar();
                    }
                }
            }

            window.requestAnimationFrame(animar);
        }

        const zonaInicial = limites();

        x = zonaInicial.maxX - 4;
        y = zonaInicial.maxY;
        colocar();

        programarSaludo(5200);

        if (reducido) {
            window.addEventListener("resize", ajustarAlRedimensionar, { passive: true });
            return;
        }

        document.addEventListener("visibilitychange", function () {
            ultimoTiempo = performance.now();
            if (!document.hidden) {
                programarSaludo(6000);
            }
        });

        window.addEventListener("resize", function () {
            window.clearTimeout(temporizadorResize);
            temporizadorResize = window.setTimeout(ajustarAlRedimensionar, 140);
        }, { passive: true });

        window.requestAnimationFrame(animar);
    }

    if (document.readyState === "loading") {
        document.addEventListener("DOMContentLoaded", iniciar);
    } else {
        iniciar();
    }
})();
