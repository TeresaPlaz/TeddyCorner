const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const STATES         = require("../models/states");
const multer         = require('multer');
const HOUSING        = require('../models/housing');
const uploadCloud = require('../config/cloudinary.js');

router.get('/addHousing',(req,res,next) => {
  STATES.find().sort({name:1}).then(states => {
    if (!states) {
      return res.status(404).render('not-found');
    }
    res.render("houses/addHouse", {states});
  });
});

router.post('/addHousing', upload.single('photo'), (req, res) => {

  const { title, price, motive, state, description } = req.body;

  const newHouse = new HOUSING({title, price, motive, state, description, });

  const pic = new Picture({
    name: req.body.name,
    path: `/images/${req.file.filename}`,
    originalName: req.file.originalname
  });

  pic.save((err) => {
      res.redirect('/');
  });
});

//   newCelebrity.save()
//   .then((celebrity) => {
//     res.redirect('/celebrities')
//   })
//   .catch((error) => {
//     console.log(error)
//     res.redirect('/celebrities/add')
//   })
// });


module.exports = router;