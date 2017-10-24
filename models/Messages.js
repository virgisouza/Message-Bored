//jshint esversion : 6
module.exports = function (sequelize, dataTypes) {

  const Messages = sequelize.define('messages', {
    body : dataTypes.STRING
  });

  return Messages;
};