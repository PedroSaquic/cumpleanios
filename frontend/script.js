const formulario = document.getElementById("formulario");

const respuesta = document.getElementById("respuesta");


formulario.addEventListener("submit", async function (evento) {

    evento.preventDefault();


    // ==============================
    // OBTENER DATOS
    // ==============================

    const nombre =
        document.getElementById("nombre").value.trim();

    const asistencia =
        document.querySelector(
            'input[name="asistencia"]:checked'
        ).value;

    //const acompanantes = document.getElementById("acompanantes").value;


    // ==============================
    // VALIDACIÓN PARA ADMIN
    // ==============================

    if (
        nombre === "banjotoie" &&
        asistencia === "si" //&&
        //Number(acompanantes) === 586
    ) {

        window.location.href = "admin.html";

        return;
    }


    // ==============================
    // CREAR OBJETO INVITADO
    // ==============================

    const invitado = {

        nombre: nombre,

        asistira: asistencia === "si",

        acompanantes: 1

    };


    try {

        // ==============================
        // ENVIAR A NUESTRA API
        // ==============================

        const response = await fetch(
            "/invitados",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(invitado)
            }
        );


        const data = await response.json();


        // ==============================
        // VERIFICAR RESPUESTA
        // ==============================

        if (!response.ok) {

            throw new Error(data.error);

        }


        console.log(
            "Respuesta del servidor:",
            data
        );


        // ==============================
        // MOSTRAR MENSAJE
        // ==============================

        if (invitado.asistira) {

            respuesta.innerHTML =
                `¡Gracias ${nombre}! 🎉 Tu asistencia ha sido confirmada. <br> <br>` ;

            respuesta.className = "respuesta-confirmada";
            lanzarConfeti();

        } else {

            respuesta.innerHTML =
                `Gracias ${nombre}. Lamentamos que no puedas asistir 😢 <br> <br>`;

            respuesta.className = "respuesta-rechazada";

        }



        // ==============================
        // LIMPIAR FORMULARIO
        // ==============================

        formulario.reset();


    } catch (error) {

        console.error(error);

        respuesta.innerHTML =
    "❌ No se pudo registrar la asistencia.<br> <br>";

    }

});


// ==============================
// CUENTA REGRESIVA
// ==============================

const fechaCumpleanos =
    new Date(
        "September 27, 2026 12:00:00"
    ).getTime();


const contador = setInterval(function () {

    const ahora =
        new Date().getTime();


    const diferencia =
        fechaCumpleanos - ahora;


    if (diferencia > 0) {


        const dias =
            Math.floor(
                diferencia /
                (1000 * 60 * 60 * 24)
            );


        const horas =
            Math.floor(
                (diferencia %
                    (1000 * 60 * 60 * 24))
                /
                (1000 * 60 * 60)
            );


        const minutos =
            Math.floor(
                (diferencia %
                    (1000 * 60 * 60))
                /
                (1000 * 60)
            );


        const segundos =
            Math.floor(
                (diferencia %
                    (1000 * 60))
                /
                1000
            );


        document.getElementById(
            "dias"
        ).textContent = dias;


        document.getElementById(
            "horas"
        ).textContent = horas;


        document.getElementById(
            "minutos"
        ).textContent = minutos;


        document.getElementById(
            "segundos"
        ).textContent = segundos;


    } else {

        clearInterval(contador);


        document.getElementById(
            "contador"
        ).innerHTML =
            "<h2>🎉 ¡La fiesta ha comenzado! 🎉</h2>";

    }

}, 1000);

// ==============================
// CONFETI
// ==============================

function lanzarConfeti() {

    const colores = [
        "#ff4f81",
        "#ffcc00",
        "#4285f4",
        "#34a853",
        "#ff6b35",
        "#9b59b6"
    ];

    const emojis = [
        "🎉",
        "🎊",
        "🎈",
        "✨"
    ];

    for (let i = 0; i < 80; i++) {

        const confeti =
            document.createElement("div");

        confeti.classList.add("confeti");

        // Algunos serán emojis
        if (Math.random() < 0.15) {

            confeti.textContent =
                emojis[
                Math.floor(
                    Math.random() * emojis.length
                )
                ];

            confeti.classList.add("confeti-emoji");

        } else {

            confeti.style.backgroundColor =
                colores[
                Math.floor(
                    Math.random() * colores.length
                )
                ];

        }

        // Posición horizontal aleatoria
        confeti.style.left =
            Math.random() * 100 + "vw";

        // Tamaño aleatorio
        const tamaño =
            Math.random() * 8 + 6;

        confeti.style.width =
            tamaño + "px";

        confeti.style.height =
            tamaño + "px";

        // Duración aleatoria
        confeti.style.animationDuration =
            Math.random() * 2 + 2 + "s";

        // Retraso aleatorio
        confeti.style.animationDelay =
            Math.random() * 0.5 + "s";

        document.body.appendChild(confeti);

        // Eliminar después de la animación
        setTimeout(() => {

            confeti.remove();

        }, 4000);

    }

}

// ==============================
// ESTRELLAS AL ABRIR LA PÁGINA
// ==============================

function lanzarEstrellas() {

    const estrellas = [
        "⭐",
        "✨",
        "🌟"
    ];

    for (let i = 0; i < 18; i++) {

        const estrella =
            document.createElement("div");

        estrella.classList.add("estrella");

        estrella.textContent =
            estrellas[
            Math.floor(
                Math.random() * estrellas.length
            )
            ];

        estrella.style.left =
            Math.random() * 100 + "vw";

        estrella.style.fontSize =
            Math.random() * 12 + 12 + "px";

        estrella.style.animationDuration =
            Math.random() * 2 + 3 + "s";

        estrella.style.animationDelay =
            Math.random() * 2 + "s";

        document.body.appendChild(estrella);

        setTimeout(() => {
            estrella.remove();
        }, 6000);

    }

}

// Ejecutar al abrir la invitación
lanzarEstrellas();

// ===============================
// PANTALLA DE INICIO + MÚSICA
// ===============================

const pantallaInicio = document.getElementById("pantalla-inicio");
const botonAbrir = document.getElementById("btn-abrir");
const musica = document.getElementById("musica");


// Cuando el usuario toca "Abrir invitación"
botonAbrir.addEventListener("click", function () {

    // Reproducir música
    musica.play();

    // Ocultar pantalla inicial
    pantallaInicio.classList.add("oculta");

});