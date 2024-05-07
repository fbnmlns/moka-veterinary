var express = require('express');
// Como import Java, importamos Express.
var mongoose = require('mongoose');
// importamos Mongoose.
var router = express.Router();
//Creo mi enrrutador para que el navegador pueda navegar a direcciones ficticias. 
var registroCliente = require('../schemas/clientes.js');
var Pet = require('../schemas/mascotas.js');



router.get('/', async (req, res) => { // Promesa, 
    const listaclientes = await registroCliente.find().populate("mascotas"); // La respuesta de la promesa
    return res.status(200).json(listaclientes); // envio exitoso, convert to json.
});


router.post('/', async (req, res) => {

    const { nombreCompleto,
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
        imagen } = req.body; // De todas estas variables, del body saco los valores.

    const nuevoCliente = await registroCliente.create({
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
        imagen

    })
    return res.status(201).json(nuevoCliente)
});

router.post("/add-pet", async (req, res) => {
    const {clientId, name} = req.body;

    const pet = await Pet.create({nombreMascota: name})

    const client = await registroCliente.findById(clientId);
    client.mascotas.push(pet._id);
    await client.save()

    return res.status(200).json(pet)
})



router.post('/insertar', async (req, res) => {

    const { nombreCompleto,
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
        imagen
    } = req.body;


    const newClient = await registroCliente.create({
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
        imagen

    })
    newClient.save();
    return res.status(201).json(newClient)
});



// router.get('/expediente/:id', (req, res) => {

//     if (mongoose.isObjectIdOrHexString.isValid(req.params.id)) {
//         this.delete.collection('Cliente')
//             .findOne({ _id: ObjectId(req.params.id) })
//             .then(doc => {
//                 res.status(200).jason(doc)
//             })
//             .catch(err => {
//                 res.status(500).json({ error: 'No se pudo encontrar el documento :(' })
//             })
//     } else {
//         res.status(500).json({ error: 'El ID no es valido' })
//     }
// }

// );

module.exports = router;