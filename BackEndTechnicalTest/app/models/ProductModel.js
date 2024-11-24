const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const ProductSchema = Schema({
  pd_id: {
    type: String, // atau Number, tergantung pada tipe data yang Anda inginkan
    required: true,
    unique: true, // Jika pd_id harus unik
  },
  pd_code: {
    type: String,
    required: true,
    unique: true, // Jika pd_code harus unik
  },
  pd_ct_id: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
  },
  pd_name: {
    type: String,
    required: true,
  },
  pd_price: {
    type: Number,
    required: true,
    min: 0, // Menjamin harga tidak negatif
  },
  pd_created_at: {
    type: Date,
    default: Date.now, // Otomatis mengisi dengan tanggal saat dokumen dibuat
  },
  pd_updated_at: {
    type: Date,
    default: Date.now, // Otomatis mengisi dengan tanggal saat dokumen dibuat
  },
});

module.exports = model('Product', ProductSchema);
