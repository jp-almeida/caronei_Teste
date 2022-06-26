'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.addColumn(
          'Usuarios',
          'telefone',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'nascimento',
          {
            type: Sequelize.STRING
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'avaliacao',
          {
            type: Sequelize.FLOAT
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'experiencia',
          {
            type: Sequelize.INTEGER
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'genero',
          {
            type: Sequelize.STRING
          }
        ),
        //visibilidade dos campos
        queryInterface.addColumn(
          'Usuarios',
          'visibilidadeEmail',
          {
            type: Sequelize.BOOLEAN
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'visibilidadeNumero',
          {
            type: Sequelize.BOOLEAN
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'visibilidadeMatricula',
          {
            type: Sequelize.BOOLEAN
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'visibilidadeNascimento',
          {
            type: Sequelize.BOOLEAN
          }
        ),
        queryInterface.addColumn(
          'Usuarios',
          'visibilidadeGenero',
          {
            type: Sequelize.BOOLEAN
          }
        ),
      ]);
    })
    },

      async down(queryInterface, Sequelize) {
      /**
       * Add reverting commands here.
       *
       * Example:
       * await queryInterface.dropTable('users');
       */
    }
};
