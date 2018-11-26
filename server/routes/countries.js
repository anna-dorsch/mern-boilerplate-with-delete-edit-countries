const express = require('express');
const mongoose = require('mongoose');
const Country = require('../models/Country')

const router = express.Router();

// Route to get all countries
router.get('/', (req, res, next) => {
  Country.find()
    .then(countries => {
      res.json(countries);
    })
    .catch(err => next(err))
});

// Route to add a country
router.post('/', (req, res, next) => {
  let { name, capitals, area, description } = req.body
  Country.create({ name, capitals, area, description })
    .then(country => {
      res.json({
        success: true,
        country
      });
    })
    .catch(err => next(err))
});

router.delete('/:id', (req, res, next) => {
  let id = req.params.id
  if (!mongoose.Types.ObjectId.isValid(id)) {
    // 400 = Bad Request
    res.status(400).json({
      success: false,
      country: null,
      message: "Wrong id"
    })
    return
  }
  Country.findByIdAndDelete(id)
    .then(countryDoc => {
      console.log("DEBUG countryDoc", countryDoc)
      res.json({
        // !!myVariable converts truthy to true and falsy to false
        success: !!countryDoc,
        country: countryDoc,
        // message: "This is just a test!"
      })
    })
    .catch(err => next(err))
})

module.exports = router;
