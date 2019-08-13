'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    avatar: DataTypes.STRING
  }, 
  { 
    freezeTableName: true 
  });
  user.associate = function(models) {
    // associations can be defined here
    user.hasMany(models.profile,{
      foreignKey : 'userId'
    });
  };
  return user;
};