'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.changeColumn(
          'Usuarios',
          'avaliacao',
          {
            type: Sequelize.FLOAT
          }
        ),
        queryInterface.changeColumn(
          'Usuarios',
          'experiencia',
          {
            type: Sequelize.INTEGER,
            defaultValue: 0
          }
        ),
        
        //visibilidade dos campos
        queryInterface.changeColumn(
          'Usuarios',
          'visibilidadeEmail',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        ),
        queryInterface.changeColumn(
          'Usuarios',
          'visibilidadeNumero',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        ),
        queryInterface.changeColumn(
          'Usuarios',
          'visibilidadeMatricula',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        ),
        queryInterface.changeColumn(
          'Usuarios',
          'visibilidadeNascimento',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        ),
        queryInterface.changeColumn(
          'Usuarios',
          'visibilidadeGenero',
          {
            type: Sequelize.BOOLEAN,
            defaultValue: false
          }
        ),
      ]);
    })
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
