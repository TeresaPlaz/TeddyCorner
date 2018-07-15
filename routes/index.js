const express = require('express');
const router  = express.Router();
const STATES  = require('../models/states');
const HOUSING = require('../models/housing');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//StateRoutes
router.get('/:state', (req, res, next) => {
  let stateAcronym = req.params.state;
  console.log(stateAcronym);
  HOUSING.find({state: stateAcronym}).then(house => {
    if (!house) {
      return res.status(404).render('not-found');
    }
    console.log(house);
    res.render('houses/houses', {house});
  })
  .catch(next);
});

module.exports = router;
