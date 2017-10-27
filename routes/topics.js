//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Topic = db.topics;

router.route('/')
.get((req, res) => {
  Topic.findAll()
  .then(data =>{
    return res.json(data);
  });
})
.post(isAuthenticated ,(req,res) => {
  let name = req.body.name;
  let created_by = req.user.id;
  Topic.create({
    name: name,
    created_by: created_by
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
  .put(isAuthenticated, (req, res) => {
    Topic.update({
      name : req.body.name
    })
    .then(data => {
      return res.json(data);
    });
  });
});



module.exports = router;

//secure route for logged in users
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/login.html');}
}