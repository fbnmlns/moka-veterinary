var mongoose = require('mongoose');
const Mascota = require('./mascotas');

var padecimientoSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombrePadecimiento: String,
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota"
    },
});

module.exports = mongoose.model('Padecimiento', padecimientoSchema, 'Padecimientos');