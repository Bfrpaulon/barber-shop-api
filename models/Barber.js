const mongoose = require('mongoose');

const barberSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  photo: { type: String, required: true },
  socialMedia: {
    instagram: { type: String },
    facebook: { type: String },
    twitter: { type: String },
  },
});

const Barber = mongoose.model('Barber', barberSchema);

module.exports = Barber;
