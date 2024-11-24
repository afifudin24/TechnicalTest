const mongoose = require('mongoose');
const { model, Schema } = mongoose;

let CategorySchema = Schema({
  ct_id: {
    type: String, // atau Number, tergantung pada tipe data yang Anda inginkan
    required: true,
    unique: true, // Jika ct_id harus unik
  },
  ct_code: {
    type: String,
    required: true,
    unique: true, // Jika ct_code harus unik
  },
  ct_name: {
    type: String,
    required: true,
  },
  ct_created_at: {
    type: Date,
    default: Date.now, // Otomatis mengisi dengan tanggal saat dokumen dibuat
  },
  ct_updated_at: {
    type: Date,
    default: Date.now, // Otomatis mengisi dengan tanggal saat dokumen dibuat
  },
});

module.exports = model('Category', CategorySchema);
