const express = require('express');
const router  = express.Router();
const STATE   = require('../models/states');

/* GET home page */
router.get('/', (req, res, next) => {
  res.render('index');
});

//StateRoutes
router.get('/:state', (req, res, next) => {
  let stateAcronym = req.params.state;
  STATE.findOne({stateAcronym}).then(state => {
    if (!state) {
      return res.status(404).render('not-found');
    }
    res.render('index');
  })
  .catch(next);
});

module.exports = router;
