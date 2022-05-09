const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ligaSchema = new Schema({
    nombreLiga : String,
        equipos:[{
            nombreEquipo : String,
            puntos : Number,
            posicion : Number
        }],       
    idTorneo: {type : Schema.Types.ObjectId, ref:'Torneo'},
    nombreTorneo : String
})

module.exports = mongoose.model('Liga', ligaSchema);