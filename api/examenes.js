var express = require("express");
var mongoose = require("mongoose");
var router = express.Router();

var Examenes = require("../schemas/examenes");
const fs = require("fs");



router.get("/:id", async (req, res) => {
    try {
      let examenes = await Examenes.find({mascota:req.params.id}).populate("mascota");
  
      examenes = examenes.map((item) => {
        return {
          ID: item?._id,
          "Pet's name": item?.mascota?.nombreMascota,
          Vacuna: item?.Vacuna,
          Exámen: item?.Exámen,

        };
      });
  
      res.json({ msg: "padecimientos List", examenes: examenes, status: true });
    } catch (err) {
      console.error(err.message);
      res.json({ error: err.message });
    }
  });


router.post("/add-new", async function (req, res, next) {
    const {  Vacuna,Exámen,mascota} = req.body; // De todas estas variables, del body saco los valores.
    
  
    try {
      const examenes = new Examenes({
        Vacuna,Exámen,mascota: mascota,
     
    });
  
      await examenes.save();
  
      res.status(201).json({
        message: "examenes created successfully!",
      });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  });




router.put("/updateNewexamenes/:id", async function (req, res, next) {


    try {
        Examenes.findOneAndUpdate({_id:req.params.id},req.body, null, function (err, docs) {
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
      msg:"examenes detail",
      user:user
    })
  
  })



  router.delete("/delete-examenes/:id", (req, res, next) => {
    Examenes.findByIdAndDelete(req.params.id , (error, data)=>{
      if(error) {
          console.log('error in deleting')
          throw error;
      }
      if (!data) {
          return res.status(404).send({ error: 'Data not found' });
      }
     
      console.log('user has been deleted', data);
      return res.status(201).json({
        message: "examenes deleted successfully!",
      });})
  })





module.exports = router;
