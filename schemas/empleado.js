var mongoose = require('mongoose');

var empleadoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    primerNombre: String,
    segundoNombre: String,
    primerApellido: String,
    segundoApellido: String,
    telefonoEmpleado: String,
    direccionEmpleado: String,
    myfile: String,
    rol: String,
    pinEmpleado: String,
    contrasena: String,
    emailEmpleado: String,
    idEmpleado: String,
    estadoEmpleado: String
});

module.exports = mongoose.model('Empleado', empleadoSchema, 'Empleados');