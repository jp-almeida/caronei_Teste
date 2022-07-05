'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Corridas', {
      idCorrida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        references:{
          model:"matches",
          key:"idRota"
        },
      },
      matriculaMotorista: {
        type: Sequelize.INTEGER,
        references:{
          model:"usuarios",
          key:"matricula"
        },
        allowNull: false
      },
      matriculaPassageiro: {
        type: Sequelize.INTEGER,
        references:{
          model:"usuarios",
          key:"matricula"
        },
        allowNull: false
      },
      ativa: {
        type: Sequelize.BOOLEAN,
        defaultValue: true
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
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Corridas');
  }
};