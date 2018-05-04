const express = require('express');
const users = express.Router();



const User = require('../models/User');
const methods = require('../methods');

let multer = require('multer');
let upload = multer();

users.get('/:userID', async (req, res, next) => {
  try{
    const user = await User.findById(req.params.userID, { passwordHash : false, __v : false });
    res.locals.success = true;
    res.locals.data = user;
    
  }catch(err){
    req.flash('error', err);
    res.locals.success = false; 
  }
  next();
});

users.post('/', upload.fields([]), async (req, res, next) => {
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
    
    const saveUser = savedUser.toObject({versionKey : false});
    delete saveUser.passwordHash;
    
    res.locals.success = true;
    res.locals.data = saveUser;
    
  }catch(err){
    console.log(err);
    req.flash('error', 'server side error');
    res.locals.success = false;
  }
  
  next();
});

module.exports = users;