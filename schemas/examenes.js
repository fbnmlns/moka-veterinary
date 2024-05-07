var mongoose = require('mongoose');

var examenesSchema = mongoose.Schema({
    Vacuna: String,
    Exámen: String,
    mascota: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Mascota"
    },
});
module.exports = mongoose.model('Examen', examenesSchema, 'Examenes');

