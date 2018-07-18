const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const STATES         = require("../models/states");
const multer         = require('multer');
const HOUSING        = require('../models/housing');
const uploadCloud    = require('../config/cloudinary');

router.get("/addHousing",(req,res,next) => {
  STATES.find().sort({name:1}).then(states => {
    if (!states) {
      return res.status(404).render('not-found');
    }
    res.render("houses/addHouse", {states});
  });
});

router.post("/addHousing", uploadCloud.single('photo'), (req, res, next) => {

   const { title, price, motive, state, description } = req.body;
    console.log(req.file);
   const imagePath = req.file.url;
   const imageName = req.file.originalname;
   console.log("here2");
   const newHouse = new HOUSING({title, price, motive, state, description, imagePath, imageName });
   console.log(newHouse);
   newHouse.save((err) => {
     if (err) {
       res.render("houses/addHouse", { message: "Something went wrong" });
     } else {
       res.redirect("/");
     }
   });
 });

 

module.exports = router;