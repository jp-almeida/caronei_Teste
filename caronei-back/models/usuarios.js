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
    nomeCompleto: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    emailVisib: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    senha:  {
      type: DataTypes.STRING,
      allowNull: false,
    },
    matricula: {
      type : DataTypes.INTEGER,
      primaryKey : true,
      autoIncrement : false
    },
    validado: DataTypes.DATE,
    nascimento: DataTypes.STRING,
    nascimentoVisib: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    genero: DataTypes.STRING,
    generoVisib: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    telefone: DataTypes.STRING,
    telefoneVisib: {
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    avaliacao: DataTypes.FLOAT,
    experiencia: {
      type: DataTypes.INTEGER,
      defaultValue: 0
    },
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