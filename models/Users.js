//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const user = sequelize.define('users', {
    name : {type : DataTypes.STRING, unique : true}
  });


  return user;
};
