const express = require('express');

const multer = require('multer');
const upload = multer();

module.exports = (passport) => {
  const auth = express.Router();
  
  auth.post(
    '/login', upload.fields([]), passport.authenticate('local', {
      failureFlash : true,
      failureRedirect : "/api/auth/login/failure",
      successRedirect : "/api/auth/login/success"
    })
  );
  
  auth.get('/login/success', (req, res, next) => {
    res.locals.success = true;
    res.locals.data = req.user;
    next();
  });
  
  auth.get('/login/failure', (req, res, next) => {
    res.locals.success = false;
    next();
  });

  auth.get('/login', (req, res, next) => {
    if(req.user){
      res.locals.success = true;
      res.locals.data = req.user;
    }else{
      req.flash('error', "no user session found");
      res.locals.success = false;
    }
    next();
  });
  
  auth.post('/logout', (req, res, next) => {
    req.logout();
    res.locals.success = true;
    next();
  });
  
  return auth;
};