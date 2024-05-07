var mongoose = require('mongoose');
const Mascota = require('./mascotas');

var clientesSchema = mongoose.Schema({
    nombreCompleto: String,
    fechaDeNacimiento: Date,
    correo: String,
    numeroDeCelular: Number,
    genero: String,
    id: { type: Number, required: true, unique: true },
    direccionCompleta: String,
    provincia: String,
    canton: String,
    distrito: String,
    observaciones: String,
    imagen: String,
    mascotas: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota"
    }]
});
module.exports = mongoose.model('Cliente', clientesSchema, 'Clientes'); //( Nombre Colection, NombreSchema, Nombre de la Collection)


