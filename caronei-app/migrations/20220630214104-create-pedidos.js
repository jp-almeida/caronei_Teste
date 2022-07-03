'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Pedidos', {
      matriculaPedido: {
        type: Sequelize.INTEGER,
        allowNull: false,
        autoIncrement: false,
        primaryKey: true,
        references:{
          model:"usuarios",
          key:"matricula"
        }
      },
      nomeDestino: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      nomePartida: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      latitudeDestino: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      longitudeDestino: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      latitudePartida: {
        type: Sequelize.FLOAT,
        allowNull: false,
      },
      latitudeDestino: {
        type: Sequelize.FLOAT,
        allowNull: false,
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
    await queryInterface.dropTable('Pedidos');
  }
};