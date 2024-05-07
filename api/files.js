var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();
var registroCliente = require("../schemas/clientes.js");
var Pet = require("../schemas/mascotas.js");
const fs = require("fs");

const multer = require("multer");
const path = require("path");

router.get("/", async (req, res) => {
  // Promesa,
  const listaclientes = await registroCliente.find().populate("mascotas"); // La respuesta de la promesa
  return res.status(200).json(listaclientes); // envio exitoso, conver to json.
});
router.get("/", async (req, res) => {
  try {
    let listaclientes = await registroCliente.find();

    res.json({ msg: "listaclientes", listaclientes: listaclientes, status: true });
  } catch (err) {
    console.error(err.message);
    res.json({ error: err.message });
  }
});


router.post("/add-new", (req, res) => {
  const storage = multer.diskStorage({
    destination: "./public/files",
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
    const {
      nombreCompleto,
      fechaDeNacimiento,
      correo,
      numeroDeCelular,
      genero,
      id,
      direccionCompleta,
      provincia,
      canton,
      distrito,
      observaciones,
    } = req.body; // De todas estas variables, del body saco los valores.

    const nuevoCliente = await registroCliente.create({
      nombreCompleto,
      fechaDeNacimiento:new Date(fechaDeNacimiento),
      correo,
      numeroDeCelular,
      genero,
      id,
      direccionCompleta,
      provincia,
      canton,
      distrito,
      observaciones,
      imagen:req?.file?.filename,
    });
    return res.status(201).json(nuevoCliente);

  });
});


router.put("/updateNewFile/:id", async function (req, res, next) {

  const storage = multer.diskStorage({
    destination: "./public/files",
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


    const {
      nombreCompleto,
      fechaDeNacimiento,
      correo,
      numeroDeCelular,
      genero,
      id,
      direccionCompleta,
      provincia,
      canton,
      distrito,
      observaciones,
    } = req.body; 

    const data = {
      nombreCompleto,
      fechaDeNacimiento:new Date(fechaDeNacimiento),
      correo,
      numeroDeCelular,
      genero,
      id,
      direccionCompleta,
      provincia,
      canton,
      distrito,
      observaciones,
    }

    if(req?.file?.filename){
      data['imagen'] = req?.file?.filename
    }


    try {
      registroCliente.findOneAndUpdate({_id:req.params.id},data, null, function (err, docs) {
        if (err){
            console.log(err)
        }
        else{
            console.log("Original Doc : ",docs);
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

router.get('/getFileById/:id',async function(req, res, next){

    const user = await registroCliente.findById(req.params.id);
    res.status(200).json({
      msg:"User detail",
      user:user
    })
  
  })


  router.delete("/delete-file/:id", (req, res, next) => {
    registroCliente.findByIdAndDelete(req.params.id , (error, data)=>{
      if(error) {
          console.log('error in deleting')
          throw error;
      }
      if (!data) {
          return res.status(404).send({ error: 'Data not found' });
      }
     
      console.log('user has been deleted', data);
      return  res.status(201).json({
        message: "file deleted successfully!",
      });})
  })





module.exports = router;
