//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Message = db.messages;
const Topic = db.topics;

router.route('/')
.post(isAuthenticated, (req, res) => {
  Message.create({
    body: req.body.body,
    author_id: req.user.id,
    topic_id: req.body.topic_id
  })
  .then(data => {
    return res.json(data);
  });
});

router.route('/latest')
.get((req, res) => {
   Message.findAll({
    limit: 10,
    order: [["id", "DESC"]]
  })
  .then(data => {
    return res.json(data);
  });
});

// router.route('/by-topic/:topic_id')
// .get((req, res) => {
//   let topicId = req.params.topic_id;
//   return Message.findAll({
//     where : { topic_id : topicId},
//     order : [["createdAt", "ASC"]]
//   })
//   .then(data => {
//     return res.json(data);
//   });
// });


module.exports = router;

//secure route for logged in users
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/login.html');}
}