//jshint esversion : 6
module.exports = function (sequelize, dataTypes) {

  const User = sequelize.define('users', {
    name : dataTypes.STRING
  });


  return User;
};
