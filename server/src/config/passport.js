const User = require("../models/User.js");
const passport = require(passport);

const LocalStrategy = require('passport-local').Strategy;

const local = new LocalStrategy((username, password, done) => {
  User.findOne({ username })
    .catch(err => done(err))
    .then(user => {
      if(!user){
        done(null, false, { message: "Invalid Username" });
      }else{
        user.validPassword(password).catch(err => {
          if(err){
            done(null, false, { message: "error when validating password" });
          }
        }).then(res => {
          if(!res){
            done(null, false, { message: "Invalid Password" });
          }else{
            done(null, user);
          }
        });
      }
    });
});


module.exports.init = function(app){
  app.use(passport.initialize());
  app.use(passport.session);
  
  passport.serializeUser(function(user, done) {
    done(null, user._id);
  });
  
  passport.deserializeUser(function(userId, done) {
    User.findById(userId, (err, user) => done(err, user));
  });
  
  passport.use('local', local);
};
