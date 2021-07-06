const { sequelize } = require('../db');
const { Model, DataTypes } = require('sequelize');


class Usuario extends Model {
  static associate({ Role }) {
    this.belongsTo(Role, { as: 'role', foreignKey: 'roleId' });
  }
}


Usuario.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      validate: {
        isEmail: true,
      }
    },
  },
  {
    sequelize,
    modelName: 'Usuario'
  }
);

module.exports = { Usuario };
