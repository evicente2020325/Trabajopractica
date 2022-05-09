const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const torneoSchema = new Schema({
    nombreTorneo: String,
    rol: String,
})

module.exports = mongoose.model('Torneos', torneoSchema);