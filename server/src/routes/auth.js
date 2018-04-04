const express = require('express');


module.exports = (passport) => {
  
  const auth = express.Router();
  
  auth.post('/login', (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
      if (err || !user){
        return res.json({
          success : false,
          message : info.message
        });
      }else{
        return res.json({
          success : true,
          payload : user
        });
      }
    })(req, res, next);
  });
  
  return auth;
};