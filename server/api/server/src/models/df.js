'use strict';
module.exports = (sequelize, DataTypes) => {
  const DF = sequelize.define('DF', {
    firstname: DataTypes.STRING,
    lastname: DataTypes.STRING,
    reference: DataTypes.STRING,
    authCode: DataTypes.ARRAY(DataTypes.STRING),
    disburseDate: DataTypes.DATE,
    amount: DataTypes.STRING,
    repaymentAmt: DataTypes.STRING,
    startDate: DataTypes.DATE,
    companyName: DataTypes.STRING,
    status: DataTypes.STRING,
    noOfRepayments: DataTypes.INTEGER,
    repayments: DataTypes.ARRAY(DataTypes.STRING)
  });
  DF.associate = function (models) {
    DF.belongsTo(models.User)
  };
  return DF;
};