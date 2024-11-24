const mongoose = require('mongoose');
const { model, Schema } = mongoose;
const UserSchema = Schema({
  us_id: {
    type: String,
    required: true,
    unique: true,
  },
  us_name: {
    type: String,
    required: true,
  },
  us_password: {
    type: String,
    required: true,
  },
  us_email: {
    type: String,
    required: true,
    unique: true,
    match: /.+\@.+\..+/, // Validasi email
  },
  us_phone_number: {
    type: String,
    required: true,
    match: /^\d{10,15}$/, // Validasi nomor telepon (10-15 digit)
  },
  us_address: {
    type: String,
    required: true,
  },
  us_created_at: {
    type: Date,
    default: Date.now,
  },
  us_updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('User', UserSchema);
