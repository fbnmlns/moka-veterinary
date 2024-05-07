const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const Reservacion = require('../schemas/reservaciones.js');

router.get('/', function (_req, res) {
  Reservacion.find().exec()
    .then(
      function (result) {
        res.json(result);
      }
    );
});

router.post('/buscar', function (req, res) {
  const idReservacion = req.body.idReservacion;
  Reservacion.findById(idReservacion).exec()
    .then(
      function (result) {
        res.json(result);
      }
    );
});

router.put('/actualizar', function (req, res) {
  const idReservacion = req.body.idReservacion;
  const numeroCuarto = req.body.numeroCuarto;
  const observaciones = req.body.observaciones;
  const estadoReservacion = req.body.estadoReservacion;

  Reservacion.findByIdAndUpdate({ _id: idReservacion },
    { $set: { numeroCuarto: numeroCuarto, observaciones: observaciones, estadoReservacion: estadoReservacion } }, { useFindAndModify: false, new: true }, function (_err, doc) {
      res.json(doc);
    });
});


router.post('/insertar', function (req, res) {
  const reservacionNueva = new Reservacion({
    _id: new mongoose.Types.ObjectId(),
    nombreMascota: req.body.nombreMascota,
    fechaEntrada: req.body.fechaEntrada,
    fechaSalida: req.body.fechaSalida,
    cuidadosEspeciales: req.body.cuidadosEspeciales,
    numeroCuarto: '',
    observaciones: '',
    estadoReservacion: true,
    idMascota: req.body.idMascota,
    cedulaCliente: req.body.cedulaCliente
  });

  reservacionNueva.save()
    .then(
      function (result) {
        res.json(result);
      }
    );
});

module.exports = router;