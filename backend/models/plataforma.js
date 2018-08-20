const mongoose = require('mongoose');

const plataformaSchema = mongoose.Schema({
  nombre: { type: String, required: true }
});

module.exports = mongoose.model('Plataforma', plataformaSchema);
