//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Message = db.messages;

router.route('/latest')
.get((req, res) => {
   Message.findAll({
    limit: 10,
    order: [["id", "DESC"]]
  })
  .then(data => {
    return res.json(data);
  });
})
.post((req, res) => {
  Message.create({
    body: req.body.body
  })
  .then(data => {
    return res.json(data);
  });
});

router.route('/by-topic/:topic_id')
.get((req, res) => {
  let topicId = req.params.topic_id;
  return Message.findAll({
    where : { topic_id : topicId},
    order : [["createdAt", "ASC"]]
  })
  .then(data => {
    return res.json(data);
  });
});


module.exports = router;