//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const topics = sequelize.define('topics',{
    name : {type : DataTypes.STRING, unique: true}
  });

  topics.associate = function (models) {
    topics.belongsTo(models.users, {
    onUpdate : "CASCADE",
    foreignKey: 'created_by'
   });

  //   topics.hasMany(models.messages);
  };


  return topics;
};