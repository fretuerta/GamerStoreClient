const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
  nombre: { type: String, required: true }
});
