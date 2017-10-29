//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const User = db.users;
const Message = db.messages;
const Topic = db.topics;

router.route('/')
.get((req, res) => {
  User.findAll({ limit: 10})
  .then(data => {
    return res.json(data);
  });
});

router.route('/:id')
  .get((req,res) => {
    let id = req.params.id;
    return Message.findAll({
      include : [{model: User}],
      where : {author_id : id},
      order : [["createdAt", "DESC"]]
    })
    .then(messages => {
      Topic.findAll({
      include : [{model: User}],
      where : { created_by : id},
      order : [["createdAt", "DESC"]]
      })
      .then(topic => {
        User.findById(id)
        .then(users => {
          let result = {
        user: users,
        messages: messages,
        topic : topic
       };

        return res.json(result);
      });
    });
  });
});

module.exports = router;

