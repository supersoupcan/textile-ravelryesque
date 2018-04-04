const express = require('express');

const users = require('./routes/users');
const auth = require('./routes/auth',)
  

module.exports = (passport) => {
  
  const api = express.Router();
  
  api.use('/users', users);
  api.use('/auth', auth(passport));
  
  return api;
};