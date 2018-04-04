const User = require("../models/User.js");
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;

const local = new LocalStrategy(
  async (username, password, done) => {
  try{
    const user = await User.findOne({ username });
    if(!user){
      done(null, false, { message : "Wrong Username"});
    }else{
      const isMatch = await user.validPassword(password);
      if(isMatch){
        const userRes = user.toObject({versionKey : false});
        delete userRes.passwordHash;
        done(null, userRes);
      }else{
        done(null, false, { message : "Wrong Password"});
      }
    }
  }catch(err){
    done(err, false, { message : "Unexpected Server Error"});
  }
});


module.exports.init = function(app){
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(userId, done) {
    User.findById(userId, (err, user) => done(err, user));
  });
  
  passport.use('local', local);
  
  return passport;
};
