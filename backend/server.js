const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const path = require("path");
require("dotenv").config();

const app = express();


// ==============================
// MIDDLEWARE
// ==============================

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));



// ==============================
// CONEXIÓN A POSTGRESQL
// ==============================

const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: {
        rejectUnauthorized: false
    }
});


// ==============================
// RUTA DE PRUEBA
// ==============================

app.get("/", (req, res) => {

    res.sendFile(
        path.join(__dirname, "../frontend/index.html")
    );

});


// ==============================
// CREAR INVITADO
// ==============================

app.post("/invitados", async (req, res) => {

    try {

        const {
            nombre,
            asistira,
            acompanantes
        } = req.body;


        // Validación básica

        if (!nombre) {

            return res.status(400).json({
                error: "El nombre es obligatorio"
            });

        }


        // Insertar en PostgreSQL

        const resultado = await pool.query(
            `
            INSERT INTO invitados
            (nombre, asistira, acompanantes)
            VALUES ($1, $2, $3)
            RETURNING *
            `,
            [
                nombre,
                asistira,
                acompanantes || 0
            ]
        );


        // Respuesta

        res.status(201).json({
            mensaje: "Invitado registrado correctamente 🎉",
            invitado: resultado.rows[0]
        });


    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al guardar el invitado"
        });

    }

});


// ==============================
// OBTENER INVITADOS
// ==============================

app.get("/invitados", async (req, res) => {

    try {

        const resultado = await pool.query(
            "SELECT * FROM invitados ORDER BY id DESC"
        );

        res.json(resultado.rows);

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "Error al obtener invitados"
        });

    }

});


// ==============================
// INICIAR SERVIDOR
// ==============================

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {

    console.log(
        `Servidor funcionando en http://localhost:${PORT}`
    );

});