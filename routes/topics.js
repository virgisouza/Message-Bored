//jshint esversion : 6
const express = require('express');
const router = express.Router();
const db = require('../models');

const Topic = db.topics;
const Users = db.users;
const Message = db.messages;

router.route('/')
.get((req, res) => {
  Topic.findAll({
    include: [{ model: Users}]
  })
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
  .then(newTopic => {
    return newTopic.reload({ include: [{model: Users}]});
  })
  .then(data => {
    return res.json(data);
  });
});


router.route('/:id')
.get((req, res) => {
  let topics = req.params.id;
  return Topic.findById(parseInt(topics))
  .then(data => {
    return res.json(data);
    });
  })
  .put(isAuthenticated, (req, res) => {
    let data = req.body;
    let id = req.params.id;
    return Topic.update({
      username : data.username
    }, {
      where : {id : id}
    })
    .then(data => {
      return res.json(data);
    });
  });


router.route('/:id/messages')
.get((req, res) => {
  let topicId = req.params.id;
  return Message.findAll({
    include : [{model: Users}],
    where : { topic_id : topicId},
    order : [["createdAt", "ASC"]]
  })
  .then(result => {
    Topic.findOne({
      where: { id: topicId }
    })
    .then(topic => {
      let topicData = {
        topic: topic,
        result: result
      };
      return res.json(topicData);
    });
  });
});




module.exports = router;

//secure route for logged in users
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/login.html');}
}