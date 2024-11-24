const mongoose = require('mongoose');
const { model, Schema } = mongoose;

const OrderSchema = Schema({
  or_id: {
    type: String,
    required: true,
    unique: true,
  },
  or_pd_id: {
    type: Schema.Types.ObjectId,
    ref: 'Product',
  },
  or_amount: {
    type: Number,
    required: true,
  },
  or_created_at: {
    type: Date,
    default: Date.now,
  },
  or_updated_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = model('Order', OrderSchema);
