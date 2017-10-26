//jshint esversion : 6
const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const methodOverride = require('method-override');
const routes = require('./routes');
const PORT = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes);
app.use(methodOverride('_method'));
app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root : path.join(__dirname, '/public')});
});

app.listen(PORT, () => {
  db.sequelize.sync({force: false});
  console.log('Swervin Up on PORT : ' + PORT);
});