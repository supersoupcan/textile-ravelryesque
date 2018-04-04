const express = require('express');

const path = require('path');

const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const configPassport = require('./config/passport');


const env = require('./config/env'); 

const api = require('./api');

//CREATE//
var app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(env.MONGO_URL);

app.use(session({
  secret: env.SESSION_SECRET,
  cookie: { maxAge : 2628000000 },
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: false,
  saveUninitialized: false
}));

let passport = configPassport.init(app);

//SERVE STATIC FILES//
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'static')));

//ROUTES//
app.use('/api', api(passport));

// REDIRECT UNKNOWN ROUTES //
app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '..', '..', 'client', 'static', 'index.html'));
});

//SERVE API//
module.exports = app;