const express = require('express');
const router  = express.Router();
const STATES  = require('../models/states');
const HOUSING = require('../models/housing');
const User    = require('../models/User');
const bcrypt         = require("bcrypt");
const bcryptSalt     = 10;



/* GET home page */
router.get('/', (req, res, next) => {
  if (req.user) {
    STATES.find().sort({name:1}).then(states => {
      if (!states) {
        return res.status(404).render('not-found');
      }
    res.render('index', {states, user: req.user});
    })
  .catch(next);
}
  else {
    STATES.find().sort({name:1}).then(states => {
      if (!states) {
        return res.status(404).render('not-found');
      }
    res.render('index', {states});
    })
  .catch(next);
  }
});

//SIGN UP POST ROUTE
router.post("/", (req, res, next) => {

  const { username, password, password2 } = req.body;

  if (username === "" || password === "" || password2 === "") {
    res.render("users/newUser", { message: "No empty fields" });
    return;
  }

  if (password === password2) {

    User.findOne({ username })
    .then(user => {
       if (user !== null) {
         res.render("users/newUser", { message: "The username already exists" });
         return;
     }
    
  const salt = bcrypt.genSaltSync(bcryptSalt);
  const hashPass = bcrypt.hashSync(password, salt);

  const newUser = new User({
    username,
    password: hashPass,
  });

    newUser.save((err) => {
      if (err) {
        res.render("users/newUser", { message: "Something went wrong" });
      } else {
        res.redirect("/");
      }
    });
})
  .catch(error => {
    next(error);
  });
  }  
    else {
      res.render("users/newUser", {message: "Passwords don't match"});
    }  
});


//StateRoutes
router.get('/:state', (req, res, next) => {
  const stateAcronym = req.params.state;

  if (req.user) {
  HOUSING.find({state: stateAcronym}).then(house => {
    if (!house) {
      return res.status(404).render('not-found');
    }

    STATES.find().sort({name:1}).then(states => {
      if (!states) {
        return res.status(404).render('not-found');
      }
    res.render('houses/houses', {house, states, user: req.user});
    });
  })
  .catch(next);
}
  else {
    HOUSING.find({state: stateAcronym}).then(house => {
      if (!house) {
        return res.status(404).render('not-found');
      }
  
      STATES.find().sort({name:1}).then(states => {
        if (!states) {
          return res.status(404).render('not-found');
        }
      res.render('houses/houses', {house, states});
      });
    })
    .catch(next);
  }
});

module.exports = router;
