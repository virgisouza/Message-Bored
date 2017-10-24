//jshint esversion : 6
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const PORT = process.env.PORT || 3000;

const Topic = db.topics;
const Message = db.messages;
const User = db.users;

app.use(express.static('public'));

app.use(bodyParser.urlencoded({extended: true}));

app.listen(PORT, () => {

  console.log('Swervin Up on PORT : ' + PORT);
});