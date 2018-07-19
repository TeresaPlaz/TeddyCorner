const express        = require('express');
const router         = express.Router();
const ensureLogin    = require("connect-ensure-login");
const STATES         = require("../models/states");
const multer         = require('multer');
const HOUSING        = require('../models/housing');
const uploadCloud    = require('../config/cloudinary');
const User           = require('../models/User');

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
   const imagePath = req.file.url;
   const imageName = req.file.originalname;
   const ownerOfPost = req.user._id;
   const newHouse = new HOUSING({title, price, motive, state, ownerOfPost, description, imagePath, imageName });
   
   req.user.classifieds.push(newHouse);
   const classifieds = req.user.classifieds;

   newHouse.save((err) => {
     if (err) {
       res.render("houses/addHouse", { message: "Something went wrong" });
     } else {
        User.update({_id: ownerOfPost}, { $set: { classifieds }},{new: true})
        .then((e) => {
             res.redirect('/');
        })
         .catch((error) => {
           console.log(error);
         });
     }
   });
 });

  router.get('/:id/Yours', (req, res, next) => {
  let userId = req.params.id;
  User.findById(userId).populate('classifieds')
   .then(populated => {
      if (!populated) {
        return res.status(404).render('not-found');
    }
    
  res.render("users/YourClass", {populated});
})
.catch((error) => {
console.log(error);
});
});

//  router.get('/:id/edit', (req, res, next) => {
//   let userId = req.params.id;
//   User.findById(userId)
//    .then(user => {
//       if (!user) {
//         return res.status(404).render('not-found');
//     }
// res.render("users/editUser", user);
// })
// .catch((error) => {
// console.log(error);
// });
// });

// //POST ROUTE FOR USER PROFILE EDITING
// router.post('/:id/edit', (req, res, next) => {

//  let userId = req.params.id;
//  const { username, password } = req.body;

// const salt = bcrypt.genSaltSync(bcryptSalt);
// const hashPass = bcrypt.hashSync(password, salt);

//     User.update({_id: userId}, { $set: { username, password:hashPass }},{new: true})
//      .then((e) => {
//           res.redirect('/');
//      })
//       .catch((error) => {
//         console.log(error);
//       });
// });

// //TYPE OF USER CHECKING FUNCTION, NOT YET APPLIED
// function checkRoles(role) {
// return function(req, res, next) {
// if (req.isAuthenticated() && req.user.role === role) {
//   return next();
// } else {
//   res.redirect('/login');
// }
// };
// }

// //DELETING USER/ACCOUNT ROUTE
// router.post('/:id/delete', (req, res, next) => {

// let userId = req.params.id;
// console.log(req.params.id);
// User.findByIdAndRemove(userId)
// .then(user => {
//   if (!user) {
//     return res.status(404).render('not-found');
// }
//   console.log('Deleting succes!!');
//   res.redirect('/');
// })
// .catch(next);
// });

module.exports = router;