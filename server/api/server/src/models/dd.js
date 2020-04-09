'use strict';
module.exports = (sequelize, DataTypes) => {
  const DD = sequelize.define('DD', {
    reference: DataTypes.STRING,
    requestId: DataTypes.STRING,
    maxNoDebits: DataTypes.STRING,
    disburseDate: DataTypes.STRING,
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE,
    amount: DataTypes.STRING,
    repaymentAmt: DataTypes.STRING,
    companyName: DataTypes.STRING,
    status: DataTypes.STRING,
    debits: DataTypes.ARRAY(DataTypes.STRING)
  })
  DD.associate = function(models) {
    DD.belongsTo(models.User)
  };
  return DD;
};