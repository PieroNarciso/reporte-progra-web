const { performance } = require('perf_hooks');
const { sequelize } = require('./db');
const { Usuario, Role } = require('./models');

const data = {
  role: [{ nombre: 'admin' }, { nombre: 'organizador' }, { nombre: 'lider' }],
  usuario: [
    {
      nombre: 'Piero',
      email: 'piero@gmail.com',
      roleId: 1,
    },
    {
      nombre: 'Sebastian',
      email: 'sebastian@gmail.com',
      roleId: 2,
    },
    {
      nombre: 'Alessandra',
      email: 'alessandra@gmail.com',
      roleId: 3,
    },
  ],
};
const TIMES = [10, 100, 1000, 10000];

/**
 * @param {number} numTime
 */
const sqlIter = async (numTime, logging = false) => {
  await sequelize.sync({ force: true, logging });

  await Role.bulkCreate(data.role, { logging });

  let t0 = performance.now();
  for (let i = 0; i < numTime; ++i) {
    const randomId = Math.floor(Math.random() * data.usuario.length);
    await Usuario.create({ ...data.usuario[randomId] }, { logging });
  }
  let t1 = performance.now();
  console.log('INSERT', numTime, t1 - t0);

  t0 = performance.now();
  await Usuario.findAll({ include: 'role', logging });
  t1 = performance.now();
  console.log('READ', numTime, t1 - t0);

  t0 = performance.now();
  await Usuario.destroy({ truncate: true, logging });
  t1 = performance.now();
  console.log('DELETE', numTime, t1 - t0);
};

const main = async () => {
  for (let i = 0; i < 10; ++i) {
    for (let time of TIMES) {
      await sqlIter(time);
    }
  }
};

main();
