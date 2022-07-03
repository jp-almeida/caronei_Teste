'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Carros', {
      placa: {
        type: Sequelize.STRING,
        primaryKey: true,
        autoIncrement: false,
        allowNull: false
      },
      matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references:{
          model:"usuarios",
          key:"matricula"
        }
      },
      modelo: {
        type: Sequelize.STRING,
        allowNull: false
      },
      cor: {
        type: Sequelize.STRING
      },
      createdAt: {
        type: Sequelize.DATE,
        allowNull: false,
      },
      updatedAt: {
        type: Sequelize.DATE,
        allowNull: false,
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Carros');
  }
};