//jshint esversion : 6
const express = require('express');
const passport = require('passport');
const router = express.Router();
const users = require('./users');
const messages = require('./messages');
const topics = require('./topics');
const bcrypt = require('bcrypt');
const db = require('../models');
const saltRounds = 12; //about 3 sec.

router.use('/users', users);
router.use('/messages', messages);
router.use('/topics', topics);

//routes
router.post('/login', passport.authenticate('local'), function (req, res) {
  console.log('YOU LOGGED IN');
  res.json(req.user);
});

router.get('/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  console.log('YOU LOGGED OUT');
});

router.post('/register', (req,res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      db.users.create({
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        console.log('YOU REGISTERED');
        res.json(user);
      })
      .catch((err) => {return res.send('Stupid username');});
    });
  });
});


// router.get('/secret', isAuthenticated, (req,res) => {
//   console.log('req.user',req.user);
//   console.log('req.user.id', req.user.id);
//   console.log('req.user.username',req.user.username);
//   console.log('req.user.password',req.user.password);
//   res.send('you found the secret');
// });
// //////end authentication

module.exports = router;