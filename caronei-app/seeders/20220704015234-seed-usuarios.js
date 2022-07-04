'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Usuarios', [{
      nomeCompleto: 'João da Silva',
      matricula: 1,
      senha: '1',
      email: "joaosilva@email.com",
      avaliacao: 4.3,
      genero: 'M',
      nascimento: "1968-07-01T02:15:07.154Z",
      numAvaliacoes: 2,
      experiencia: 100,
      createdAt: new Date(),
      updatedAt: new Date()
    }], {});

  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
