    var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();

var Cita = require('../schemas/cita.js');
var Doctores = require('../schemas/doctores.js');
var Mascotas = require('../schemas/mascotas.js');
var Padecimientos = require('../schemas/padecimientos.js');
var HistoralClinico = require('../schemas/historialClinica.js');

router.get('/listarCitas', function (req, res) {
    Cita.find().exec()
        .then(
            function (result) {
                res.json(result);
            }
        );
})

router.get('/listarDoctores', function (req, res) {
    Doctores.find({ rol: "Veterinario/a" }).exec()
        .then(
            function (result) {
                res.json(result);
            }
        );
});

router.get('/listarPadecimientos', function (req, res) {
    Padecimientos.find().exec()
        .then(
            function (result) {
                res.json(result);
            }
        );
});

router.post('/insertarCita', function (req, res) {
    var nombreMascota = req.body.nombreMascota;
    var idCliente = req.body.idCliente;
    var idMascota = nombreMascota + idCliente;

    var citaNuevo = new Cita({
        _id: new mongoose.Types.ObjectId(),
        idMascota: idMascota,
        nombreMascota: nombreMascota,
        idDoctor: req.body.idDoctor,
        hora: req.body.hora,
        fecha: req.body.fecha
    });

    citaNuevo.save().then(
        function (result) {
            res.json(result);
        }
    );
});

router.delete('/borrarCita', function (req, res) {
    var idCita = req.body._id;
    Cita.deleteOne({ _id: idCita }, function (err, result) {
        if (err) {
            console.err(err);
        } else {
            res.json(result);
        }
    });
});

router.post('/actualizarDatosMascota', function (req, res) {
    var idMascota = req.body.idMascota;
    var ranking = req.body.ranking;
    var padecimientos = req.body.padecimientos;

    Mascotas.findOneAndUpdate({ idMascota: idMascota }, { $set: { ranking: ranking, padecimientos: padecimientos } }, { useFindAndModify: false, new: true }, function (err, doc) {
        res.json(doc);
    });
});

router.post('/actualizarDatosHistorial', function (req, res) {
    var idMascota = req.body.idMascota;
    var observaciones = req.body.observaciones;

    HistoralClinico.findOneAndUpdate({ idMascota: idMascota }, { $set: { observaciones: observaciones } }, { useFindAndModify: false, new: true }, function (err, doc) {
        res.json(doc);
    });
});

module.exports = router;