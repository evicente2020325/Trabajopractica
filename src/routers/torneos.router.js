const express = require('express');
const torneoControlador = require('../controllers/torneos.controller');


const md_autenticacion = require('../middlewares/autorizacion');
const api = express.Router();

api.post('/agregarTorneo',  md_autenticacion.Auth, torneoControlador.agregarTorneo);
api.put('/editarTorneo/:idTorneo', md_autenticacion.Auth, torneoControlador.EditarTorneo);
api.delete('/eliminarTorneo/:idTorneo', md_autenticacion.Auth, torneoControlador.EliminarTorneo);
api.put('/agregarLigaAtorneo/:idTorneo', torneoControlador.agregarLigaAtorneo);
api.put('/editarLigaAtorneo/:idTorneo/:idLiga', md_autenticacion.Auth, torneoControlador.editarLigaAtorneo);
api.put('/agregarEquipoAliga/:idLiga', torneoControlador.agregarEquipoAliga);
api.put('/editarEquipoAliga/:idEquipo', md_autenticacion.Auth, torneoControlador.editarEquipoAliga);
api.post('/agregarLiga', md_autenticacion.Auth, torneoControlador.agregarLiga);
api.put('/editarLiga/:idLiga', md_autenticacion.Auth, torneoControlador.editarLiga);
api.delete('/eliminarLiga/:idLiga', md_autenticacion.Auth, torneoControlador.eliminarLiga);
api.put('/editarLigasAtorneo/:idTorneo/:idLiga', md_autenticacion.Auth, torneoControlador.agregarLigasAtorneo);

module.exports = api;