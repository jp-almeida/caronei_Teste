'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Pedidos extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Pedidos.init({
    matriculaPedido: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      }
    },
    nomeDestino: DataTypes.STRING,
    nomePartida: DataTypes.STRING,
    latitudeDestino: DataTypes.FLOAT,
    longitudeDestino: DataTypes.FLOAT,
    latitudePartida: DataTypes.FLOAT,
    longitudePartida: DataTypes.FLOAT
  }, {
    sequelize,
    modelName: 'Pedidos',
  });
  return Pedidos;
};