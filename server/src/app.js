const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');

//CREATE//
var app = express();

//MIDDLEWARE
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended : true}))

//SERVE STATIC FILES//
app.use(express.static(path.resolve(__dirname, '..', '..', 'client', 'static')));

//ROUTES//

//SERVE API//
module.exports = app;