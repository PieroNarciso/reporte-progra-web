const { Schema, model } = require('mongoose');

const roleSchema = new Schema({
  nombre: String,
});

const usuarioSchema = new Schema({
  nombre: String,
  email: String,
  role: { type: Schema.Types.ObjectId, ref: 'Role' }
});


const Role = model('Role', roleSchema);
const Usuario = model('Usuario', usuarioSchema);

module.exports = {
  Role,
  Usuario
};
