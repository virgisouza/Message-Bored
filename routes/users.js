//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const User = db.users;

router.route('/')
.get((req, res) => {
  User.findAll({ limit: 10})
  .then(data => {
    return res.json(data);
  });
});
// .post((req, res) => {
//   User.create({
//     name: req.body.name,
//     password: req.body.password
//   })
//   .then(data => {
//     return res.json(data);
//   });
// });

router.route('/:id')
  .get((req,res) => {
    let users = req.params.id;
    return User.findById(users)
  .then(data => {
    return res.json(data);
  });
});


module.exports = router;