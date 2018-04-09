const methods = {
  isValidPassword : (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[\d$@$!%*?&])[A-Za-z\d$@$!%*?&]/;
    return regex.test(password) && (password.length >= 8 && password.length <= 48);
  },
  makeUserSave : (user) => {
    const saveUser = user.toObject({versionKey : false});
    delete saveUser.passwordHash;
    return saveUser;
  }
};

module.exports = methods; 