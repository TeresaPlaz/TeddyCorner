const express        = require("express");
const router         = express.Router();
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;
const ensureLogin    = require("connect-ensure-login");
const passport       = require("passport");
const User           = require('../models/User');

//LOG OUT ROUTE
router.get("/logout", (req, res) => {  
    req.logout();
    req.session.destroy();
    res.redirect('/');
});

// //SIGN UP GET ROUTE
// router.get('/signup', (req, res) => {
//   res.render('users/newUser');
// });

//LOG IN GET ROUTE
router.get("/login", (req, res, next) => {
  res.render("users/login", { "message": req.flash("error") });
});

//LOG IN POST ROUTE
router.post("/login", passport.authenticate("local-login", {
  successRedirect: "/",
  failureRedirect: "/users/login",
  failureFlash: true,
  passReqToCallback: true
  })
);

//User Profile 
router.get('/:id', ensureLogin.ensureLoggedIn(), (req, res, next) => {

  let userId = req.params.id;
    if (!userId) { 
      return res.status(404).render('not-found');
    }
   User.findById(userId)
     .then(userO => {
            if (!userO) {
              return res.status(404).render('not-found');
            }
      res.render("users/profile", {userO, user: req.user});
      })
    .catch(next);
});

//GET ROUTE FOR USER PROFILE EDITING
router.get('/:id/edit', ensureLogin.ensureLoggedIn(), (req, res, next) => {
      let userId = req.params.id;
      User.findById(userId)
       .then(userO => {
          if (!userO) {
            return res.status(404).render('not-found');
        }
    res.render("users/editUser", {userO, user: req.user});
  })
  .catch((error) => {
    console.log(error);
  });
});

//POST ROUTE FOR USER PROFILE EDITING
router.post('/:id/edit', (req, res, next) => {

     let userId = req.params.id;
     const { username, password, password2 } = req.body;

     if (username === "" || password === "" || password2 === "") {
      res.render("users/editUser", { message: "No empty fields", user:req.user, userO: req.user});
      return;
    }

     if (password === password2) {

      User.findOne({ username })
      .then(user => {
         if (user !== null) {
           res.render("users/editUser", { message: "The username already exists", user:req.user, userO: req.user});
           return;
       }});

      const salt = bcrypt.genSaltSync(bcryptSalt);
      const hashPass = bcrypt.hashSync(password, salt);
   
          User.update({_id: userId}, { $set: { username, password:hashPass }},{new: true})
           .then((e) => {
                res.redirect('/');
           })
            .catch((error) => {
              console.log(error);
            });
     }
      else {
        res.render("users/editUser", {message: "Passwords don't match", id:userId, user:req.user, userO:req.user});
      }
    
    });

//DELETING USER/ACCOUNT ROUTE
router.post('/:id/delete', ensureLogin.ensureLoggedIn(), (req, res, next) => {

  let userId = req.params.id;
  console.log(req.params.id);
  User.findByIdAndRemove(userId)
    .then(user => {
      if (!user) {
        return res.status(404).render('not-found');
    }
      console.log('Deleting succes!!');
      res.redirect('/');
    })
    .catch(next);
});

module.exports = router;