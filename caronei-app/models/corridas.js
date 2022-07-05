'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Corridas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Corridas.init({
    idCorrida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
      references:{
        model:"matches",
        key:"idRota"
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
    ativa:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    } 
  }, {
    sequelize,
    modelName: 'Corridas',
  });
  return Corridas;
};