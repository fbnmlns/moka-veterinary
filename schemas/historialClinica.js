var mongoose = require('mongoose');

var historialClinicaSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    motivoVisita: String,
    fecha: String,
    observaciones: String,
    nombreDoctor: String,
    idMascota: String
});

module.exports = mongoose.model('Historial Clinica', historialClinicaSchema, 'Historial Clinica');