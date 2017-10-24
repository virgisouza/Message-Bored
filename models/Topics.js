//jshint esversion : 6
module.exports = function (sequelize, dataTypes) {

  const Topics = sequelize.define('topics',{
    name : dataTypes.STRING
  });


  return Topics;
};