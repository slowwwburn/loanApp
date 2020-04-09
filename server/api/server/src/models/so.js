'use strict';
module.exports = (sequelize, DataTypes) => {
  const SO = sequelize.define('SO', {
    reference: DataTypes.STRING,
    requestId: DataTypes.STRING,
    frequency: DataTypes.STRING,
    disburseDate: DataTypes.DATE,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    amount: DataTypes.STRING,
    repaymentAmt: DataTypes.STRING,
    companyName: DataTypes.STRING,
    status: DataTypes.STRING,
    debits: DataTypes.ARRAY(DataTypes.STRING)
  });
  SO.associate = function (models) {
    SO.belongsTo(models.User)
  };
  return SO;
};