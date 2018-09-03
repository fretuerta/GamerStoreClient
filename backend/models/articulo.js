const mongoose = require('mongoose');

const articuloSchema = mongoose.Schema({
  juego_id: { type: String, required: true },
  plataforma_id: { type: String, required: true },
  formato: { type: String },
  cantidad: { type: Number },
  precioAlquiler: { type: Number },
  precioVenta: { type: Number }
});

module.exports = mongoose.model('Articulo', articuloSchema);
