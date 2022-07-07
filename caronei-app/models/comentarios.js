'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Comentarios extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Comentarios.init({
    destinatario: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: false,
      references:{
        model:"usuarios",
        key:"matricula"
      },
      allowNull: false
    },
    remetente: {
      type: DataTypes.INTEGER,
      references:{
        model:"usuarios",
        key:"matricula"
      },
      allowNull: true
    },
    aceito:{
      type: DataTypes.BOOLEAN,
      defaultValue: false
    },
    comentario: {
      type: DataTypes.STRING,
      allowNull: true
    },
    avaliacao: {
      type: DataTypes.FLOAT,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: 'Comentarios',
  });
  return Comentarios;
};