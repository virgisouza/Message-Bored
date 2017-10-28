//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const topics = sequelize.define('topics',{
    name : {type : DataTypes.STRING, unique: true, allowNull: false}
  });

  topics.associate = function (models) {
    topics.belongsTo(models.users, {
    onUpdate : "CASCADE",
    foreignKey: {
      name: 'created_by',
      allowNull: false
    },
    onDelete: 'NO ACTION'
   });

   //topics.hasMany(models.messages);
  };


  return topics;
};