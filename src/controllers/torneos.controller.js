const Torneo = require('../models/torneos.model');
const Liga = require('../models/liga.model')
const bcrypt = require('bcrypt-nodejs');
const jwt = require('../services/jwt');
const mongoose = require('mongoose');

function agregarTorneo(req, res) {
    var parametros = req.body;
    var TorneoModel = new Torneo();

    if (req.user.rol == 'ADMINISTRADOR') {
        if (parametros.nombreTorneo) {
            TorneoModel.nombreTorneo = parametros.nombreTorneo;
            TorneoModel.idLiga = null

            Torneo.find({ nombreTorneo: parametros.nombreTorneo }, (err, TorneoEncontrado) => {

                TorneoModel.rol = 'TORNEO';

                if (TorneoEncontrado.length == 0) {
                    TorneoModel.save((err, TorneoEncontrado) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if (!TorneoEncontrado) return res.status(500)
                            .send({ mensaje: 'Error al agregar el torneo' });

                        return res.status(200).send({ torneo: TorneoEncontrado });
                    });
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este nombre ya se encuentra utilizado' });
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para agregar torneos.' })
    }

}

function agregarLigasAtorneo(req, res) {
    const idLiga = req.params.idLiga;
    const idTorneo = req.params.idTorneo;

    if (req.user.rol == 'ADMINISTRADOR') {
        Liga.findByIdAndUpdate(idLiga, { idTorneo: idTorneo }, { new: true }, (err, torneoEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!torneoEditado) return res.status(404)
                .send({ mensaje: 'Error al editar el torneo' });

            Torneo.findOne({ _id: idTorneo }, (err, torneoEncontrado) => {
                Liga.findByIdAndUpdate(idLiga, { nombreTorneo: torneoEncontrado.nombreTorneo }, { new: true }, (err, torneoActualizado) => {

                    if (err) return res.status(500).send({ mensaje: 'No se puede actualizar la liga' });

                    return res.status(200).send({ liga: torneoActualizado });
                })
            })
        })
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para editar torneos.' })
    }

}

function EditarTorneo(req, res) {
    var idTorneo = req.params.idTorneo;
    var parametros = req.body;

    if (req.user.rol == 'ADMINISTRADOR') {
        Torneo.findByIdAndUpdate(idTorneo, parametros, { new: true }, (err, torneoEditado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!torneoEditado) return res.status(404)
                .send({ mensaje: 'Error al editar el torneo' });

            return res.status(200).send({ torneo: torneoEditado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para editar torneos.' })
    }

}

function EliminarTorneo(req, res) {
    var idTorneo = req.params.idTorneo;

    if (req.user.rol == 'ADMINISTRADOR') {
        Torneo.findByIdAndDelete(idTorneo, (err, torneoEliminado) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!torneoEliminado) return res.status(500)
                .send({ mensaje: 'Error al eliminar el torneo' })

            return res.status(200).send({ torneo: torneoEliminado });
        })
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para eeliminar torneos.' })
    }

}

function agregarLiga(req, res) {
    var parametros = req.body;
    var LigaModel = new Liga();

    if (req.user.rol == 'ADMINISTRADOR') {
        if (parametros.nombreLiga) {
            LigaModel.nombreLiga = parametros.nombreLiga;
            Liga.find({ nombreLiga: parametros.nombreLiga }, (err, LigaEncontrada) => {

                if (LigaEncontrada.length == 0) {
                    LigaModel.save((err, LigaEncontrada) => {
                        if (err) return res.status(500)
                            .send({ mensaje: 'Error en la peticion' });
                        if (!LigaEncontrada) return res.status(500)
                            .send({ mensaje: 'Error al agregar la liga' });

                        return res.status(200).send({ liga: LigaEncontrada });
                    });
                } else {
                    return res.status(500)
                        .send({ mensaje: 'Este nombre ya se encuentra utilizado' });
                }
            })
        }
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para agregar ligas.' })
    }

}

function editarLiga(req, res) {
    var idLiga = req.params.idLiga;
    var parametros = req.body;

    if (req.user.rol == 'ADMINISTRADOR') {
        Liga.findByIdAndUpdate(idLiga, parametros, { new: true }, (err, ligaEditada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!ligaEditada) return res.status(404)
                .send({ mensaje: 'Error al editar la liga' });

            return res.status(200).send({ liga: ligaEditada });
        })
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para editar ligas.' })
    }

}

function eliminarLiga(req, res) {
    var idLiga = req.params.idLiga;

    if (req.user.rol == 'ADMINISTRADOR') {
        Liga.findByIdAndDelete(idLiga, (err, ligaEliminada) => {
            if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
            if (!ligaEliminada) return res.status(500)
                .send({ mensaje: 'Error al eliminar la liga' })

            return res.status(200).send({ liga: ligaEliminada });
        })
    } else {
        return res.status(500).send({ mensaje: 'Tiene que ser administrador para eliminar ligas.' })
    }

}

function agregarEquipoAliga(req, res) {
    var LigaId = req.params.idLiga;
    var parametros = req.body;
    var EquipoId = req.params.idEquipo;

    if (parametros.nombreEquipo) {

        Liga.findByIdAndUpdate(LigaId, { $push: { equipos: { idEquipo: EquipoId } } },
            { new: true }, (err, equipoAgregado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
                if (!equipoAgregado) return res.status(500).send({ mensaje: 'Error al agregar el equipo a la liga' });

                return res.status(200).send({ liga: equipoAgregado })
            })

    } else {
        return res.status(500).send({ mensaje: 'Debe enviar los parametros necesarios.' })
    }

}

function editarEquipoAliga(req, res) {
    const equipoId = req.params.idEquipo;
    const parametros = req.body;

    if (req.user.rol == 'ADMINISTRADOR') {
        Liga.findOneAndUpdate({ equipos: { $elemMatch: { _id: equipoId } } },
            { "equipos.$.nombreEquipo": parametros.nombreEquipo, "equipos.$.puntos": parametros.puntos, "equipos.$.posicion": parametros.posicion }, { new: true }, (err, equipoActualizado) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!equipoActualizado) return res.status(500).send({ mensaje: 'error al editar la liga' });

                return res.status(200).send({ liga: equipoActualizado })
            })
    } else {
        return res.status(500).send({ mensaje: 'no tienes permisos para editar los equipos.' })
    }

}

function agregarLigaAtorneo(req, res) {
    var TorneoId = req.params.idTorneo;
    var ligaId = req.params.idLiga;
    var parametros = req.body;

    if (parametros.nombreLiga) {

        Torneo.findByIdAndUpdate(TorneoId, { $push: { liga: { idLiga: ligaId } } },
            { new: true }, (err, ligaAgregada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en  la peticion' });
                if (!ligaAgregada) return res.status(500).send({ mensaje: 'Error al agregar la liga al torneo' });

                return res.status(200).send({ torneo: ligaAgregada })
            })

    } else {
        return res.status(500).send({ mensaje: 'Debe enviar los parametros necesarios.' })
    }

}

function editarLigaAtorneo(req, res) {
    const ligaId = req.params.idLiga;
    const parametros = req.body;

    if (req.user.rol == 'ADMINISTRADOR') {
        Torneo.findOneAndUpdate({ liga: { $elemMatch: { _id: ligaId } } },
            { "liga.$.nombreLiga": parametros.nombreLiga }, { new: true }, (err, ligaActualizada) => {
                if (err) return res.status(500).send({ mensaje: 'Error en la peticion' });
                if (!ligaActualizada) return res.status(500).send({ mensaje: 'error al editar la liga' });

                return res.status(200).send({ liga: ligaActualizada })
            })
    } else {
        return res.status(500).send({ mensaje: 'no tienes permisos para editar la liga.' })
    }

}

module.exports = {
    agregarTorneo,
    EditarTorneo,
    EliminarTorneo,
    agregarLigaAtorneo,
    editarLigaAtorneo,
    agregarEquipoAliga,
    editarEquipoAliga,
    agregarLiga,
    editarLiga,
    eliminarLiga,
    agregarLigasAtorneo

}