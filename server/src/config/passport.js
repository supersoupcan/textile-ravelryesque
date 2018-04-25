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
          done(null, user);
        }else{
          done(null, false, { message : "Wrong Password"});
        }
      }
    }catch(err){
      done(err, false, { message : "Unexpected Server Error"});
    }
  }
);


module.exports.init = function(app){
  app.use(passport.initialize());
  app.use(passport.session());
  
  passport.serializeUser(function(user, done) {
    console.log('serializing ' + user.username +  ' into session ');
    done(null, user._id);
  });
  
  passport.deserializeUser(function(userid, done) {
    console.log('deserealizing ' + userid);
    User.findById(userid, (err, user) => {
      const saveUser = user.toObject({versionKey : false});
      delete saveUser.passwordHash;
      done(err, saveUser);
    });
  });

  passport.use('local', local);
  
  return passport;
};
