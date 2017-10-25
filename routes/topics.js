//jshint esversion : 6
const express = require('express');
const router = express.Router();
const Topics = require('../models/Topics');


router.route('/')
.get((req, res) => {
  res.json('Hello World');
});

module.exports = router;