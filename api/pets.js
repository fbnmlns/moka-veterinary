var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var Pet = require("../schemas/mascotas.js");
const fs = require("fs");

const multer = require("multer");
const path = require("path");

router.post("/add-pet", (req, res) => {
  const storage = multer.diskStorage({
    destination: "./public/pets",
    filename: function (req, file, cb) {
      cb(null, "PET-PICTURE-" + Date.now() + path.extname(file.originalname));
    },
  });

  //Save user profile picture
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("file");

  upload(req, res, async () => {
    const { name, cedulaCliente, raza, observaciones, genero, idCliente, fechaNacimiento } =
      req.body; // De todas estas variables, del body saco los valores.

    const pet = await Pet.create({
      nombreMascota: name,
      idMascota: name + "12345",
      raza: raza,
      observaciones: observaciones,
      imagen: req?.file?.filename,
      genero: genero,
      idCliente: idCliente,
      cliente: idCliente,
      ranking: 0,
      fechaNacimiento
    });
    return res.status(201).json(pet);
  });
});

router.get("/:id", async (req, res) => {
  try {
    let pets = await Pet.find({ cliente: req.params.id }).populate("cliente");

    pets = pets.map((item) => {
      return {
        ID: item?._id,
        "Owner's name": item?.cliente?.nombreCompleto,
        Telephone: item?.cliente?.numeroDeCelular,
        nombreMascota: item?.nombreMascota,
        raza: item?.raza,
        observaciones: item?.observaciones,
        imagen: `/pets/${item?.imagen}`,
        Address: item?.cliente?.direccionCompleta,
        cliente: item?.cliente?._id,
        fechaNacimiento: item?.fechaNacimiento,
      };
    });

    res.json({ msg: "Pet List", pets: pets, status: true });
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
});

router.get('/getPetById/:id', async function (req, res, next) {

  const user = await Pet.findById(req.params.id);
  res.status(200).json({
    msg: "User detail",
    user: user
  })

})


router.put("/updateNewPet/:id", async function (req, res, next) {

  const storage = multer.diskStorage({
    destination: "./public/pets",
    filename: function (req, file, cb) {
      cb(
        null,
        "PROFILE-PICTURE-" + Date.now() + path.extname(file.originalname)
      );
    },
  });

  //Save user profile picture
  const upload = multer({
    storage: storage,
    limits: { fileSize: 1000000 },
  }).single("file");

  upload(req, res, async () => {


    const { name, raza, observaciones, genero, idCliente, fechaNacimiento, } =
      req.body; // De todas estas variables, del body saco los valores.



    const data = {
      nombreMascota: name,
      raza: raza,
      observaciones: observaciones,
      idCliente: idCliente,
      genero: genero,
      cliente: idCliente,
      fechaNacimiento
    }

    if (req?.file?.filename) {
      data['imagen'] = req?.file?.filename
    }


    try {
      Pet.findOneAndUpdate({ _id: req.params.id }, data, null, function (err, docs) {
        if (err) {
          console.log(err)
        }
        else {
          console.log("Original Doc : ", docs);
        }
      });

      res.status(201).json({
        message: "File updated successfully!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }

  });


});


router.delete("/delete-pet/:id", (req, res, next) => {
  Pet.findByIdAndDelete(req.params.id, (error, data) => {
    if (error) {
      console.log('error in deleting')
      throw error;
    }
    if (!data) {
      return res.status(404).send({ error: 'Data not found' });
    }

    console.log('user has been deleted', data);
    return res.status(201).json({
      message: "pet deleted successfully!",
    });
  })
})


module.exports = router;
