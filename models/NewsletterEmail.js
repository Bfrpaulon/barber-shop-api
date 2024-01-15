const mongoose = require('mongoose');

const newsletterEmailSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
});

const NewsletterEmail = mongoose.model('NewsletterEmail', newsletterEmailSchema);

module.exports = NewsletterEmail;
