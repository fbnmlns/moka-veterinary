const mongoose = require('mongoose');

const reservacionSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  nombreMascota: String,
  fechaEntrada : String,
  fechaSalida : String,
  cuidadosEspeciales : String,
  numeroCuarto : Number,
  observaciones : String,
  estadoReservacion : Boolean,
  idMascota : String,
  cedulaCliente : Number
});

module.exports = mongoose.model('Reservacion', reservacionSchema, 'Reservaciones');
module.exports = mongoose.model('Reservacion', reservacionSchema, 'Reservaciones');