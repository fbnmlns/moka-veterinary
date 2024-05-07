var mongoose = require('mongoose');

var doctorSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    telefonoEmpleado: String,
    direccionEmpleado: String,
    fotoEmpleado: String,
    rol: String,
    pinEmlpeado: String,
    emailEmpleado: String,
    estadoEmpleado: Boolean
});

module.exports = mongoose.model('Empleados', doctorSchema, 'Empleados');