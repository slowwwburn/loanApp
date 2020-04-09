'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    account: DataTypes.STRING,
    companyName: DataTypes.STRING,
    bvn: DataTypes.STRING,
    bankCode: DataTypes.STRING,
    consent: DataTypes.BOOLEAN
  });
  User.associate = function (models) {
    User.hasMany(models.DD)
    User.hasMany(models.DF)
    User.hasMany(models.SO)
  };
  return User;
};
