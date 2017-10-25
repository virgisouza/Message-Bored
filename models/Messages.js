//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const messages = sequelize.define('messages', {
    body : DataTypes.TEXT
  });

  messages.associate = function (models) {
   messages.belongsTo(models.users, {
    onUpdate: "CASCADE",
    foreignKey: 'author_id'
   });

   messages.belongsTo(models.topics, {
    onUpdate: "CASCADE",
    foreignKey: 'topic_id'
   });
  };

  return messages;
};