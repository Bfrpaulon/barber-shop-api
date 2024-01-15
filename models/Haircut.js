const mongoose = require('mongoose');

const haircutSchema = new mongoose.Schema({
  name: { type: String, required: true },
  price: { type: Number, required: true },
  description: { type: String, required: true },
  photos: [{ type: String }],
});

const Haircut = mongoose.model('Haircut', haircutSchema);

module.exports = Haircut;
