'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Matches extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Matches.init({
    idRota: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      references:{
        model:"pedidos",
        key:"id"
      },
      allowNull: false
    },
    matriculaMotorista: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      },
      allowNull: false
    },
    matriculaPassageiro: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      },
      allowNull: false
    },
    nomeDestino: {
      type: DataTypes.STRING,
      allowNull: false
    },
    nomeOrigem:  {
      type: DataTypes.STRING,
      allowNull: false
    },
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
};