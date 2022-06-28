'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Usuarios', {
      matricula: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false
      },
      nomeCompleto: {
        type: Sequelize.STRING,
        allowNull: false
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emailVisib: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      senha: {
        type: Sequelize.STRING,
        allowNull: false
      },
      validado: {
        type: Sequelize.DATE,
        defaultValue: null
      },
      nascimento: {
        type: Sequelize.STRING
      },
      nascimentoVisib: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      genero: {
        type: Sequelize.STRING
      },
      generoVisib: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      telefone: {
        type: Sequelize.STRING
      },
      telefoneVisib: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
      },
      avaliacao: {
        type: Sequelize.FLOAT
      },
      experiencia: {
        type: Sequelize.INTEGER,
        defaultValue: 0
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
    await queryInterface.dropTable('Usuarios');
  }
};