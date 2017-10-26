//jshint esversion : 6
module.exports = function (sequelize, DataTypes) {

  const messages = sequelize.define('messages', {
    body : {type: DataTypes.TEXT, allowNull: false}
  });

  messages.associate = function (models) {
   messages.belongsTo(models.users, {
    onUpdate: "CASCADE",
    foreignKey: {
      name: 'author_id',
      allowNull: false
    },
    onDelete: 'NO ACTION'
   });

   messages.belongsTo(models.topics, {
    onUpdate: "CASCADE",
    foreignKey: {
      name: 'topic_id',
      allowNull: false
    },
    onDelete: 'NO ACTION'
   });
  };

  return messages;
};