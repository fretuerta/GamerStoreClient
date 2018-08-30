const mongoose = require('mongoose');

const juegoSchema = mongoose.Schema({
  nombre: { type: String, required: true },
  codigo: { type: String, required: false },
  caratula: { type: String, required: false }
});

module.exports = mongoose.model('Juego', juegoSchema);
