var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

var Padecimientos = require("../schemas/padecimientos");
const fs = require("fs");



router.get("/:id", async (req, res) => {
    try {
      let padecimientos = await Padecimientos.find({mascota:req.params.id}).populate("mascota");
  
      padecimientos = padecimientos.map((item) => {
        return {
          padecimientoID: item?._id,
          "Pet's name": item?.mascota?.nombreMascota,
          nombrePadecimiento: item?.nombrePadecimiento,
        };
      });
  
      res.json({ msg: "padecimientos List", padecimientos: padecimientos, status: true });
    } catch (err) {
      console.error(err.message);
      res.json({ error: err.message });
    }
  });


router.post("/add-new", async function (req, res, next) {
    const {  nombrePadecimiento,mascota} = req.body; // De todas estas variables, del body saco los valores.
    console.log('============req.body========================');
    console.log(req.body,nombrePadecimiento);
    console.log('====================================');
  
    try {
      const padecimientos = new Padecimientos({
        nombrePadecimiento:nombrePadecimiento,mascota: mascota,
     
    });
  
      await padecimientos.save();
  
      res.status(201).json({
        message: "padecimientos created successfully!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });




router.put("/updateNewPadecimientos/:id", async function (req, res, next) {


    try {
        Padecimientos.findOneAndUpdate({_id:req.params.id},req.body, null, function (err, docs) {
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

router.get('/getFileById/:id',async function(req, res, next){

    const user = await registroCliente.findById(req.params.id);
    res.status(200).json({
      msg:"User detail",
      user:user
    })
  
  })



  router.delete("/delete-Padecimientos/:id", async (req, res, next) => {
    await Padecimientos.findByIdAndDelete(req.params.id , (error, data)=>{
      if(error) {
          console.log('error in deleting')
          throw error;
      }
      if (!data) {
          return res.status(404).send({ error: 'Data not found' });
      }
     
      console.log('user has been deleted', data);
      return  res.status(201).json({
        message: "padecimientos deleted successfully!",
      });
    })
  })





module.exports = router;
