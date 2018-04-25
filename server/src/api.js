const express = require('express');
const s3 = require('./s3');

const users = require('./routes/users');
const auth = require('./routes/auth');
const patterns = require('./routes/patterns')

module.exports = (passport, s3) => {
  const api = express.Router();
  api.use('/users', users);
  api.use('/auth', auth(passport));
  api.use('/patterns', patterns(s3));
  
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