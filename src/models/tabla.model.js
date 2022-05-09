const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TablaSchema = new Schema({
    equipo1 : Number,
    equipo2 : Number,
    resultado : Number
})

module.exports = mongoose.model('Tablas', TablaSchema);