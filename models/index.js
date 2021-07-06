const { sequelize } = require('../db');

const db = {
  Sequelize: sequelize,
  sequelize,
  ...require('./Role'),
  ...require('./Usuario'),
};

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});


module.exports = {
  ...db,
};
