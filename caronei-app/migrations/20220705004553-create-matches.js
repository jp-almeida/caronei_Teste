'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Matches', {
      idRota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
        references:{
          model:"pedidos",
          key:"id"
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
      nomeDestino: {
        type: Sequelize.STRING,
        allowNull: false
      },
      nomeOrigem: {
        type: Sequelize.STRING,
        allowNull: false
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
    await queryInterface.dropTable('Matches');
  }
};