var mongoose = require('mongoose');
const Cliente = require('./clientes');

var mascotaSchema = mongoose.Schema({
    //_id: mongoose.Schema.Types.ObjectId,
    nombreMascota: String,
    idMascota: String,
    raza: String,
    observaciones: String,
    imagen: String,
    genero: String,
    idMascota: String,
    cedulaCliente: Number,
    fechaNacimiento: Date,
    ranking: Number,
    cliente: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Cliente"
    },
    padecimientos: Array,
});

module.exports = mongoose.model('Mascota', mascotaSchema, 'Mascotas');