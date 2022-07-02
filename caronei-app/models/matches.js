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
    matriculaMotorista: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      }
    },
    matriculaPassageiro: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      }
    },
    nomeDestino: DataTypes.STRING,
    latitudeDestino: DataTypes.FLOAT,
    longitudeDestino: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Matches',
  });
  return Matches;
};