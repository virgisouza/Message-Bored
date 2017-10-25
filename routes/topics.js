//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Topic = db.topics;

router.route('/')
.get((req, res) => {
  res.render('./views/users');
})
.post((req,res) => {
  Topic.create({
    name: req.body.name
  })
  .then(data => {
    return res.json(data);
  });
});


router.route('/:id')
.get((req, res) => {
  let topics = req.params.id;
  return Topic.findById(topics)
  .then(data => {
    return res.json(data);
  })
  .put((req, res) => {
    Topic.update({
      name : req.body.name
    })
    .then(data => {
      return res.json(data);
    });
  });
});



module.exports = router;