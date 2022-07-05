'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Usuarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Usuarios.init({
    nomeCompleto: DataTypes.STRING,
    email: DataTypes.STRING,
    emailVisib: DataTypes.BOOLEAN,
    senha: DataTypes.STRING,
    matricula: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : false
    },
    validado: DataTypes.DATE,
    nascimento: DataTypes.STRING,
    nascimentoVisib: DataTypes.BOOLEAN,
    genero: DataTypes.STRING,
    generoVisib: DataTypes.BOOLEAN,
    telefone: DataTypes.STRING,
    telefoneVisib: DataTypes.BOOLEAN,
    avaliacao: DataTypes.FLOAT,
    experiencia: DataTypes.INTEGER,
    numAvaliacoes: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    }
  }, {
    sequelize,
    modelName: 'Usuarios',
  });
  return Usuarios;
};