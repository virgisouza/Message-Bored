//jshint esversion : 6
const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const path = require('path');
const bodyParser = require('body-parser');
const db = require('./models');
const session = require('express-session');
const bcrypt = require('bcrypt');
const redis = require('connect-redis')(session);
const routes = require('./routes');
const saltRounds = 12; //about 3 sec.
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use('/api', routes);

app.use(express.static('public'));

app.get('*', (req, res) => {
  res.sendFile('index.html', { root : path.join(__dirname, '/public')});
});

app.use(session({
  store: new redis(),
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: false
}));

///start authentication
app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user,done) => {
  console.log('serializing');
  console.log("LOGGIN in USER.ID: ", user.id);
  console.log('LOGGIN in USER.USERNAME: ', user.username);
  return done(null, {
    id: user.id,
    username: user.username
  });
});

passport.deserializeUser((user, done) => {
  console.log('deserializing');
  db.users.findOne({ where: {id: user.id}})
    .then(user => {
      console.log("LOGGIN OUT: ", user);
      console.log("LOGGIN OUT USER.ID: ", user.id);
      console.log('LOGGIN OUT USER.USERNAME: ', user.username);
      return done(null, {
        id: user.id,
        username: user.username

      });
    });
});

passport.use(new LocalStrategy(function (username, password, done) {
  db.users.findOne({where: {username : username}})
  .then(user => {
    if(user === null) {
      return done(null, false, {message: 'bad username or password'});
    }else{
      bcrypt.compare(password, user.password)
      .then(res => {
        console.log(res);
        if(res) {return done(null, user);
        }else{
          return done(null, false, {message: 'bad username or password'});
        }
      });
    }
  })
  .catch(err => {
    console.log('error : ', err);
  });
}));

//routes
app.post('/api/login', passport.authenticate('local', {
  successRedirect: '/',
  failureRedirect: '/login'
}));

app.get('/api/logout', (req, res) => {
  req.logout();
  res.redirect('/');
  console.log('YOU LOGGED OUT');
});

app.post('/api/register', (req,res) => {
  bcrypt.genSalt(saltRounds, function (err, salt) {
    bcrypt.hash(req.body.password, salt, function (err, hash) {
      db.users.create({
        username: req.body.username,
        password: hash
      })
      .then((user) => {
        console.log('YOU REGISTERED');
        res.json(user);
      })
      .catch((err) => {return res.send('Stupid username');});
    });
  });
});


//secure route for logged in users
function isAuthenticated(req, res, next) {
  if (req.isAuthenticated()) {next();}
  else {res.redirect('/login.html');}
}

app.get('/api/secret', isAuthenticated, (req,res) => {
  console.log('req.user',req.user);
  console.log('req.user.id', req.user.id);
  console.log('req.user.username',req.user.username);
  console.log('req.user.password',req.user.password);
  res.send('you found the secret');
});
//////end authentication

app.listen(PORT, () => {
  db.sequelize.sync({force: false});
  console.log('Swervin Up on PORT : ' + PORT);
});