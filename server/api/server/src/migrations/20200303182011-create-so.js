'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('SOs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      reference: {
        type: Sequelize.STRING
      },
      requestId: {
        type: Sequelize.STRING
      },
      frequency: {
        type: Sequelize.STRING
      },
      disburseDate: {
        type: Sequelize.STRING
      },
      firstname: {
        type: Sequelize.STRING
      },
      lastname: {
        type: Sequelize.STRING
      },
      startDate: {
        type: Sequelize.DATE
      },
      endDate: {
        type: Sequelize.DATE
      },
      amount: {
        type: Sequelize.STRING
      },
      repaymentAmt: {
        type: Sequelize.STRING
      },
      companyName: {
        type: Sequelize.STRING
      },
      status: {
        type: Sequelize.STRING
      },
      debits: {
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
    return queryInterface.dropTable('SOs');
  }
};