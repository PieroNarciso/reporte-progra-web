const { performance } = require('perf_hooks');
const { mongoConnect } = require('./db');
const { Usuario, Role } = require('./models/mongo');

const data = {
  role: [
    { nombre: 'admin' },
    { nombre: 'organizador' },
    { nombre: 'lider' },
  ],
  usuario: [
    {
      nombre: 'Piero',
      email: 'piero@gmail.com',
    },
    {
      nombre: 'Sebastian',
      email: 'sebastian@gmail.com',
    },
    {
      nombre: 'Alessandra',
      email: 'alessandra@gmail.com',
    }
  ]
}
const TIMES = [10, 100, 1000, 10000]

const roles = [];


const iterMongo = async (numTime) => {
  mongoConnect();

  Usuario.deleteMany();
  Role.deleteMany();
  data.role.forEach(async (role) => {
    const newRole = new Role({ ...role});
    await newRole.save();
    roles.push(newRole._id);
  });

  let t0 = performance.now();
  for (let i = 0; i < numTime; ++i) {
    const randomId = Math.floor(Math.random()*data.usuario.length);
    const usr = new Usuario({ ...data.usuario[randomId], role: roles[randomId]});
    await usr.save();
  }
  let t1 = performance.now();
  console.log('INSERT', numTime, t1-t0);

  t0 = performance.now();
  await Usuario.find();
  t1 = performance.now();
  console.log('READ', numTime, t1-t0);


  t0 = performance.now();
  await Usuario.deleteMany();
  t1 = performance.now();
  console.log('DELETE', numTime, t1-t0);
}


const main = async () => {
  for (let i = 0; i < 10; ++i) {
    for (let time of TIMES) {
      await iterMongo(time);
    }
  }
}

main();
