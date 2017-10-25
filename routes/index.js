//jshint esversion : 6
const express = require('express');
const router = express.Router();

const users = require('./users');
const messages = require('./messages');
const topics = require('./topics');


router.use('/users', users);
router.use('/messages', messages);
router.use('/topics', topics);

module.exports = router;