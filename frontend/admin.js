// ==============================
// VARIABLES
// ==============================

let invitados = [];


// ==============================
// ELEMENTOS
// ==============================

const tabla =
    document.getElementById("tabla");

const buscar =
    document.getElementById("buscar");

const filtro =
    document.getElementById("filtro");


// ==============================
// CARGAR INVITADOS
// ==============================

async function cargarInvitados() {

    try {

        const response =
            await fetch(
                "/invitados"
            );


        if (!response.ok) {

            throw new Error(
                "Error al obtener invitados"
            );

        }


        invitados =
            await response.json();


        console.log(
            "Invitados:",
            invitados
        );


        actualizarEstadisticas();

        mostrarInvitados();


    } catch (error) {

        console.error(error);

        alert(
            "❌ No se pudieron cargar los invitados."
        );

    }

}


// ==============================
// ESTADÍSTICAS
// ==============================

function actualizarEstadisticas() {


    const total =
        invitados.length;


    const confirmados =
        invitados.filter(
            invitado =>
                invitado.asistira === true
        ).length;


    const noAsisten =
        invitados.filter(
            invitado =>
                invitado.asistira === false
        ).length;


    const acompanantes =
        invitados.reduce(
            (total, invitado) => {

                return total +
                    Number(
                        invitado.acompanantes || 0
                    );

            },
            0
        );


    document.getElementById(
        "total"
    ).textContent = total;


    document.getElementById(
        "confirmados"
    ).textContent = confirmados;


    document.getElementById(
        "no-asisten"
    ).textContent = noAsisten;


    document.getElementById(
        "acompanantes"
    ).textContent = acompanantes;

}


// ==============================
// MOSTRAR INVITADOS
// ==============================

function mostrarInvitados() {


    const texto =
        buscar.value
            .trim()
            .toLowerCase();


    const tipoAsistencia =
        filtro.value;


    const filtrados =
        invitados.filter(
            invitado => {


                // ==============================
                // FILTRO NOMBRE
                // ==============================

                const coincideNombre =
                    invitado.nombre
                        .toLowerCase()
                        .includes(texto);


                // ==============================
                // FILTRO ASISTENCIA
                // ==============================

                let coincideAsistencia =
                    true;


                if (
                    tipoAsistencia === "true"
                ) {

                    coincideAsistencia =
                        invitado.asistira === true;

                }


                if (
                    tipoAsistencia === "false"
                ) {

                    coincideAsistencia =
                        invitado.asistira === false;

                }


                return (
                    coincideNombre &&
                    coincideAsistencia
                );

            }
        );


    // ==============================
    // LIMPIAR TABLA
    // ==============================

    tabla.innerHTML = "";


    // ==============================
    // SIN RESULTADOS
    // ==============================

    if (filtrados.length === 0) {

        document.getElementById(
            "sin-resultados"
        ).style.display = "block";

        return;

    }


    document.getElementById(
        "sin-resultados"
    ).style.display = "none";


    // ==============================
    // CREAR FILAS
    // ==============================

    filtrados.forEach(
        invitado => {


            const fila =
                document.createElement("tr");


            fila.innerHTML = `

                <td>
                    ${invitado.id}
                </td>

                <td>
                    ${invitado.nombre}
                </td>

                <td>

                    ${invitado.asistira

                    ? `
                            <span class="estado confirmado">
                                Sí 🎉
                            </span>
                          `

                    : `
                            <span class="estado rechazado">
                                No 😢
                            </span>
                          `
                }

                </td>

                <td>
                    ${invitado.acompanantes}
                </td>
                <td>
    <button
        class="boton-eliminar"
        onclick="eliminarInvitado(${invitado.id})"
    >
        🗑️ Eliminar
    </button>
</td>


            `;


            tabla.appendChild(fila);

        }
    );

}


// ==============================
// BUSCAR
// ==============================

buscar.addEventListener(
    "input",
    mostrarInvitados
);


// ==============================
// FILTRAR
// ==============================

filtro.addEventListener(
    "change",
    mostrarInvitados
);


// ==============================
// VOLVER
// ==============================

document
    .getElementById("volver")
    .addEventListener(
        "click",
        function () {

            window.location.href =
                "index.html";

        }
    );


// ==============================
// INICIAR
// ==============================

cargarInvitados();

// ==============================
// ELIMINAR INVITADO
// ==============================

async function eliminarInvitado(id) {

    const confirmar = confirm(
        "¿Estás seguro de que quieres eliminar este invitado?"
    );

    if (!confirmar) {
        return;
    }

    try {

        const response = await fetch(
            `/invitados/${id}`,
            {
                method: "DELETE"
            }
        );

        const data = await response.json();

        if (!response.ok) {

            throw new Error(data.error);

        }

        alert("✅ Invitado eliminado correctamente.");

        cargarInvitados();

    } catch (error) {

        console.error(error);

        alert(
            "❌ No se pudo eliminar el invitado."
        );

    }

}
