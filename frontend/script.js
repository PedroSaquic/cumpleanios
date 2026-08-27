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

    const acompanantes =
        document.getElementById("acompanantes").value;


    // ==============================
    // VALIDACIÓN PARA ADMIN
    // ==============================

    if (
        nombre === "banjotoie" &&
        asistencia === "si" &&
        Number(acompanantes) === 586
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

        acompanantes: Number(acompanantes)

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

            respuesta.textContent =
                `¡Gracias ${nombre}! 🎉 Tu asistencia ha sido confirmada.`;

        } else {

            respuesta.textContent =
                `Gracias ${nombre}. Lamentamos que no puedas asistir 😢`;

        }


        // ==============================
        // LIMPIAR FORMULARIO
        // ==============================

        formulario.reset();


    } catch (error) {

        console.error(error);

        respuesta.textContent =
            "❌ No se pudo registrar la asistencia.";

    }

});


// ==============================
// CUENTA REGRESIVA
// ==============================

const fechaCumpleanos =
    new Date(
        "September 27, 2026 13:00:00"
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