'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('DFs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      reference: {
        type: Sequelize.STRING
      },
      authCode: {
        type: Sequelize.STRING
      },
      disburseDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.STRING
      },
      repaymentAmt: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      companyName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      noOfRepayments: {
        type: Sequelize.STRING
      },
      repayments: {
        type: Sequelize.ARRAY(Sequelize.STRING)
      },
      UserId: {
        type: Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('DFs');
  }
};