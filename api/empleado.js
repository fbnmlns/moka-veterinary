var express = require('express');
var mongoose = require('mongoose');
var router = express.Router();
var Empleado = require('../schemas/empleado.js');

router.get('/', function (req, res) {
  Empleado.find().exec()
    .then(
      function (result) {
        res.json(result);
      }
    );
});




router.post('/loginEmpleado', function (req, res) {
  var pinEmpleado = req.body.pinEmpleado;
  Empleado.find({ pinEmpleado: pinEmpleado }).exec()
    .then(
      function (result) {
        res.json(result);
      }
    )
});

router.post('/loginAdmin', function (req, res) {
  var emailEmpleado = req.body.emailEmpleado;
  var contrasena = req.body.contrasena;
  Empleado.find({ emailEmpleado: emailEmpleado, contrasena: contrasena }).exec()
    .then(
      function (result) {
        res.json(result);
      }
    )
})

router.post('/registrarEmpleado', function (req, res) {
  var empleadoNuevo = new Empleado({
    _id: new mongoose.Types.ObjectId(),
    primerNombre: req.body.primerNombre,
    segundoNombre: req.body.segundoNombre,
    primerApellido: req.body.primerApellido,
    segundoApellido: req.body.segundoApellido,
    telefonoEmpleado: req.body.telefonoEmpleado,
    direccionEmpleado: req.body.direccionEmpleado,
    myFile: req.body.myFile,
    rol: req.body.rol,
    pinEmpleado: req.body.pinEmpleado,
    contrasena: req.body.contrasena,
    emailEmpleado: req.body.emailEmpleado,
    idEmpleado: req.body.idEmpleado,
    estadoEmpleado: req.body.estadoEmpleado
  });

  empleadoNuevo.save()
    .then(
      function (result) {
        res.json(result);
      }
    );
});

router.post('/buscar', function (req, res) {
  var idUsuario = req.body.idUsuario;
  Empleado.findById(idUsuario).exec()
    .then(
      function (result) {
        res.json(result);
      }
    );
});

//Cynthia
router.post('/buscarEmpleado', function (req, res) {
  var _id = req.body._id;
  Empleado.findById(_id).exec() /*ES ESTO*/
    .then(
      function (result) {
        res.json(result);
      }
    );
});

router.post('/actualizar', function (req, res) {
  var _id = req.body.idUsuario;
  var primerNombre = req.body.primerNombre;
  var segundoNombre = req.body.segundoNombre;
  var primerApellido = req.body.primerApellido;
  var segundoApellido = req.body.segundoApellido;
  var direccionEmpleado = req.body.direccionEmpleado;
  var rol = req.body.rol;
  var pinEmpleado = req.body.pinEmpleado;
  var emailEmpleado = req.body.emailEmpleado;
  var idEmpleado = req.body.idEmpleado;
  var estadoEmpleado = req.body.estadoEmpleado;
  // findOneAndUpdate - Filtro - Valores - Opciones - Función anónima
  Empleado.findOneAndUpdate({ _id: _id }, { $set: { primerNombre: primerNombre, segundoNombre: segundoNombre, primerApellido: primerApellido, segundoApellido: segundoApellido, rol: rol, direccionEmpleado: direccionEmpleado, pinEmpleado: pinEmpleado, emailEmpleado: emailEmpleado, idEmpleado: idEmpleado, estadoEmpleado: estadoEmpleado } }, { useFindAndModify: false, new: true }, function (err, doc) {
    res.json(doc);
  });
});
//Cynthia
router.post('/actualizarPerfil', function (req, res) {
  var _id = req.body._id;
  var primerNombre = req.body.primerNombre;
  var segundoNombre = req.body.segundoNombre;
  var primerApellido = req.body.primerApellido;
  var segundoApellido = req.body.segundoApellido;
  var telefonoEmpleado = req.body.telefonoEmpleado;
  var direccionEmpleado = req.body.direccionEmpleado;
  var emailEmpleado = req.body.emailEmpleado;
  

  Empleado.findOneAndUpdate({ _id: _id }, { $set: { primerNombre: primerNombre, segundoNombre: segundoNombre, primerApellido: primerApellido, segundoApellido: segundoApellido, telefonoEmpleado: telefonoEmpleado, direccionEmpleado: direccionEmpleado, emailEmpleado: emailEmpleado,} }, { useFindAndModify: false, new: true }, function (err, doc) {
    res.json(doc);
  }
  );
});


module.exports = router;