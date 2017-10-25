//jshint esversion : 6

const express = require('express');
const router = express.Router();
const Users = require('../models/Users');

router.route('/')
.get((req, res) => {
  res.json('Hello World');
});

module.exports = router;