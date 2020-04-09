'use strict';
module.exports = (sequelize, DataTypes) => {
  const Admin = sequelize.define('Admin', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    username: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  });
  return Admin;
};