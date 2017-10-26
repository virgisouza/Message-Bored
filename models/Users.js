//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const user = sequelize.define('users', {
    username : {type : DataTypes.STRING, unique : true, allowNull: false},
    password : {type: DataTypes.STRING, unique: true, allowNull: false}
  });


  return user;
};
