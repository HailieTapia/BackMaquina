/**
 * The function starts a server by connecting to a database and listening on a specified port.
 */
require('dotenv').config();
const express = require('express');
const https = require('https');
const fs = require('fs');
const app = require("./src/app"); // Importar la configuración de la app
const connectDB = require("./src/config/dataBase"); // Importar la función de conexión a la base de datos
const PORT = process.env.PORT || 3000;

// Rutas para SSL (especificar las rutas donde tienes tus certificados)
const options = {
  key: fs.readFileSync('/nginx/ssl/filograficos.key'),  // Ruta a la clave privada
  cert: fs.readFileSync('/nginx/ssl/filograficos.crt'), // Ruta al certificado SSL
};

async function startServer() {
  try {
    // Conectar a la base de datos
    await connectDB();
    console.log("Conexión a la base de datos establecida correctamente.");

    // Iniciar el servidor HTTPS
    https.createServer(options, app).listen(PORT, '0.0.0.0', () => {
      console.log(`Servidor HTTPS corriendo en https://0.0.0.0:${PORT}`);
    });
  } catch (error) {
    console.error("Error al iniciar el servidor:", error);
  }
}

startServer();