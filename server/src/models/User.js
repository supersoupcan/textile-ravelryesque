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

UserSchema.methods.validPassword = (password) => new Promise(
  (resolve, reject) => {
    bcrypt.compare(password, this.passwordHash, function(err, res){
      if(err){
        return reject;
      }
      return resolve(res);
    });
  }
);

UserSchema.virtual("password").set((value) => new Promise(
  (resolve, reject) => {
    bcrypt.hash(value, 12, function(err, hash){
      if(err){
        return reject;
      }
      return resolve(hash);
    });
  }
));

const User = mongoose.model("User", UserSchema);

module.exports = User;