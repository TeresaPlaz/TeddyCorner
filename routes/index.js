const express = require('express');
const router  = express.Router();
const STATES  = require('../models/states');
const HOUSING = require('../models/housing');
const ensureLogin    = require("connect-ensure-login");
const User    = require('../models/User');

/* GET home page */
router.get('/', (req, res, next) => {
  if (req.user) {
  res.render('index',{user: req.user});
  }
  else {
  res.render('index');
  }
});

//StateRoutes
router.get('/:state', (req, res, next) => {
  let stateAcronym = req.params.state;
  HOUSING.find({state: stateAcronym}).then(house => {
    if (!house) {
      return res.status(404).render('not-found');
    }
    res.render('houses/houses', {house});
  })
  .catch(next);
});

module.exports = router;
