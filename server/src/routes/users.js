const express = require('express');
const users = express.Router();

const User = require('../models/User');

users.get('/', (req, res) => {

});

users.post('/', async (req, res) => {
  try{
    const baseUser = new User({ 
      username: req.body.username, 
    });
    const userWithHash = await baseUser.setPassword(req.body.password);
    const user = await userWithHash.save();
    let userRes = user.toObject({versionKey : false});
    delete userRes.passwordHash;
    res.json({success : true, payload : userRes});
    
  }catch(err){
    res.json({success : false, message : err});
  }
});

module.exports = users;