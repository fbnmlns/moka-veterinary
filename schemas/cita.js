var mongoose = require('mongoose');

var citaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    idMascota: String,
    nombreMascota: String,
    idDoctor: String,
    hora: String,
    fecha: String
});

module.exports = mongoose.model('Cita', citaSchema, 'Citas');