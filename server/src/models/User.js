const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const uniqueValidator = require("mongoose-unique-validator");
const bcrypt = require("bcrypt");

const UserSchema = new Schema({
  username : {
    type : String,
    required : true,
    unique : true
  },
  email : {
    type : String,
    required : true,
    unique : true,
    validate : {
      validator : (emailInput) => {
        const emailRegex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
        return emailRegex.test(emailInput);
      },
      message : "Not a valid email address" 
    }
  },
  passwordHash : {
    type : String, 
    required : true 
  },
  createdAt : {
    type : Date,
    default : Date.now()
  },
  imageKey : {
    type : String,
    default : "default-picture"
  }
});

UserSchema.plugin(uniqueValidator);

UserSchema.methods.setPassword = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, 12, (err, hash) => {
      if(err){
        reject(err);
      }
      this.passwordHash = hash;
      resolve(this);
    });
  });
};

UserSchema.methods.validPassword = function(password){
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, this.passwordHash, function(err, isValid){
      if(err){
        reject(err);
      }
      resolve(isValid);
    });
  });
};


const User = mongoose.model("User", UserSchema);

module.exports = User;