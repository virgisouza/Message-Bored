//jshint esversion : 6
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const methodOverride = require('method-override');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

const Topic = db.topics;
const Message = db.messages;
const User = db.users;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('/', (req, res) => {
  res.render('./routes');
});

let users = require('./routes/users');
app.use('/users', users);
let topics = require('./routes/topics');
app.use('/topics', topics);
let messages = require('./routes/messages');
app.use('/messages', messages);

app.listen(PORT, () => {
  db.sequelize.sync({force: false});
  console.log('Swervin Up on PORT : ' + PORT);
});