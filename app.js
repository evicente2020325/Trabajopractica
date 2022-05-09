const express = require('express');
const cors = require('cors');
var app = express();

// IMPORTACION RUTAS

const UsuarioRouter = require('./src/routers/usuario.router')
const TorneoRouter = require('./src/routers/torneos.router')

// MIDDLEWARES
app.use(express.urlencoded({ extended: false}));
app.use(express.json());

// CABECERAS
app.use(cors());

// CARGA DE RUTAS localhost:3000/api/productos
app.use('/api', UsuarioRouter, TorneoRouter);

module.exports = app;