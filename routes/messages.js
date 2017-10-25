//jshint esversion : 6

const express = require('express');
const router = express.Router();
const Messages = require('../models/Messages');

router.route('/')
.get((req, res) => {
  res.json('Hello World');
});

module.exports = router;