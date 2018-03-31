const express = require('express');

const path = require('path');
const session = require('express-session');
const mongoose = require('mongoose');
const MongoStore = require('connect-mongo')(session);
const bodyParser = require('body-parser');
const configPassport = require('./config/passport');

const env = require('./config/env'); 

//CREATE//
var app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect(env.MONGO_URL, { useMongoClient: true });

app.use(session({
  secret: env.SESSION_SECRET,
  store: new MongoStore({
    mongooseConnection: mongoose.connection
  }),
  resave: true,
  saveUninitialized: true
}));

configPassport.init(app);

//SERVE STATIC FILES//
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'static')));

//ROUTES//

//SERVE API//
module.exports = app;