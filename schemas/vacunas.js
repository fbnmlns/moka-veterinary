var mongoose = require('mongoose');

var vacunasSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    nombreVacuna: String,
});
module.exports = mongoose.model('Vacuna', vacunasSchema, 'Vacunas');

