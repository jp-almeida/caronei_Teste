'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CorridasNaoAtivas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  CorridasNaoAtivas.init({
    idCorrida: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
      autoIncrement: false,
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
    finalizada:{
      type: DataTypes.BOOLEAN,
      defaultValue: true
    } 
  }, {
    sequelize,
    modelName: 'CorridasNaoAtivas',
  });
  return CorridasNaoAtivas;
};