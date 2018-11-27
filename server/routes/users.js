const express = require('express');
const User = require('../models/User');
const { isLoggedIn } = require('../middlewares')
const router = express.Router();
const parser = require('../configs/cloudinary')

router.get('/profile', isLoggedIn, (req,res,next) => {
  req.user.password = null
  res.json(req.user)
})

// parser.single('picture') => extract from the field 'picture' the file and define req.file (and req.file.url)
router.post('/pictures', isLoggedIn, parser.single('picture'), (req, res, next) => {
  User.findByIdAndUpdate(req.user._id, { pictureUrl: req.file.url })
    .then(() => {
      res.json({
        success: true,
        pictureUrl: req.file.url
      })
    })
    .catch(err => next(err))
});

module.exports = router;
