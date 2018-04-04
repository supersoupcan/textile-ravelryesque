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
  passwordHash : {
    type : String, required : true 
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