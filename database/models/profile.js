'use strict';
module.exports = (sequelize, DataTypes) => {
  const profile = sequelize.define('profile', {
    userId: DataTypes.INTEGER,
    handle: DataTypes.STRING,
    company: DataTypes.STRING,
    location: DataTypes.STRING,
    status: DataTypes.STRING,
    skills: DataTypes.STRING,
    bio: DataTypes.STRING,
    githubusername: DataTypes.STRING,
    experience: DataTypes.STRING
  }, {});
  profile.associate = function(models) {
    // associations can be defined here
    profile.belongsTo(models.user,{
      foreignKey : 'userId'
    });
  };
  return profile;
};