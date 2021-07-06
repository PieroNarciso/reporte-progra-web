const { sequelize } = require('../db');
const { Model, DataTypes } = require('sequelize');


class Role extends Model {

  static associate({ Usuario }) {
    this.hasMany(Usuario, { as: 'usuarios', foreignKey: 'roleId' });
  }

}


Role.init(
  {
    nombre: {
      type: DataTypes.STRING,
      allowNull: false,
    }
  },
  {
    sequelize,
    modelName: 'Roles',
  }
);

module.exports = { Role }
