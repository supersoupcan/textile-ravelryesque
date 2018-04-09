const express = require('express');

const users = require('./routes/users');
const auth = require('./routes/auth');
  

module.exports = (passport) => {
  
  const api = express.Router();
  
  api.use('/users', users);
  api.use('/auth', auth(passport));
  
  api.use('*', (req, res) => {
    const data = {
      success : res.locals.success,
      data : res.locals.data,
      messages : {
        errors : req.flash('error'),
      },
    };
    res.json(data);
  });
  
  return api;
};