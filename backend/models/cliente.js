const mongoose = require('mongoose');

const clienteSchema = mongoose.Schema({
  dni: { type: String, required: true },
  nombre: { type: String },
  apellidos: { type: String },
  telefono: { type: String },
  direccion: { type: String },
  codPostal: { type: Number },
  poblacion: { type: String },
  provincia: { type: String },
});

module.exports = mongoose.model('Cliente', clienteSchema);
