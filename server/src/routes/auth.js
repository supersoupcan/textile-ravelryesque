const express = require('express');

module.exports = (passport) => {
  const auth = express.Router();
  auth.post(
    '/login', 
    passport.authenticate('local', {
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
    console.log(res.locals, req.user);
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
    console.log('match');
    req.logout();
    res.locals.success = true;
    next();
  });
  
  return auth;
};