const express = require('express');
const users = express.Router();

const User = require('../models/User');
const methods = require('../methods');

users.get('/:userID', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userId, { passwordHash : false });
    res.locals.success = true;
    res.locals.data = user;
  }catch(err){
    req.flash('error', err);
    res.locals.success = false; 
  }
  
  next();
});

users.post('/', async (req, res, next) => {
  try{
    if(!methods.isValidPassword(req.body.password)){
      throw new Error("Password is not valid");
    }
    const baseUser = new User({ 
      username: req.body.username,
      email: req.body.email
    });
    const userWithHash = await baseUser.setPassword(req.body.password);
    const savedUser = await userWithHash.save();
    
    res.locals.success = true;
    res.locals.data = methods.makeUserSave(savedUser);
    
  }catch(err){
    req.flash('error', err);
    res.locals.success = false;
  }
  
  next();
});

module.exports = users;