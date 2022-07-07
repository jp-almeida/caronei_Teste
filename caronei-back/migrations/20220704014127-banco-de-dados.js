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
      numAvaliacoes: {
        type: Sequelize.INTEGER,
        allowNull: false,
        defaultValue: 0
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

    await queryInterface.createTable('Pedidos', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      matriculaPedido: {
        type: Sequelize.INTEGER,
        allowNull: false
      },
      rota: {
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
        references: {
          model: "usuarios",
          key: "matricula"
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

    await queryInterface.createTable('corridasAtivas', {
      idRota: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      matriculaMotorista: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: false
      },
      matriculaPassageiro: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: false
      },
      rota: {
        type: Sequelize.STRING,
        allowNull: false
      },
      emProgresso: {
        type: Sequelize.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.createTable('corridasNaoAtivas', {
      idCorrida: {
        type: Sequelize.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: false,
      },
      matriculaMotorista: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: false
      },
      matriculaPassageiro: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: false
      },
      rota: {
        type: Sequelize.STRING,
        allowNull: false
      },
      finalizada: {
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


    await queryInterface.createTable('Comentarios', {
      destinatario: {
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: false,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: false
      },
      remetente: {
        type: Sequelize.INTEGER,
        references: {
          model: "usuarios",
          key: "matricula"
        },
        allowNull: true
      },
      comentario: {
        type: Sequelize.STRING,
        allowNull: true
      },
      avaliacao: {
        type: Sequelize.FLOAT,
        allowNull: false
      },
      aceito: {
        type: Sequelize.BOOLEAN,
        defaultValue: false
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
    await queryInterface.dropTable('usuarios');
    await queryInterface.dropTable('pedidos');
    await queryInterface.dropTable('carros');
    await queryInterface.dropTable('corridasAtivas')
    await queryInterface.dropTable('corridasNaoAtivas')
    await queryInterface.dropTable('Comentarios');
  }
};
