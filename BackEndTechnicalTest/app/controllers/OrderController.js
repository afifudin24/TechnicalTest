const Orders = require('../models/OrderModel'); // Pastikan path ini sesuai dengan lokasi model Order Anda

// Fungsi untuk menyimpan order baru
const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let order = new Orders(payload);
    await order.save();
    return res.status(201).json(order); // Mengembalikan status 201 Created
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err); // Untuk kesalahan lainnya, teruskan ke middleware penanganan kesalahan
  }
};

// Fungsi untuk memperbarui order
const update = async (req, res, next) => {
  try {
    console.log(req.params.id);
    let payload = req.body;
    let order = await Orders.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!order) {
      return res.status(404).json({
        error: 1,
        message: 'Order not found',
      });
    }

    return res.json(order);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

// Fungsi untuk menghapus order
const destroy = async (req, res, next) => {
  try {
    let order = await Orders.findByIdAndDelete(req.params.id);
    if (!order) {
      return res.status(404).json({
        error: 1,
        message: 'Order not found',
      });
    }

    return res.json({ message: 'Order deleted successfully', order });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

// Fungsi untuk mendapatkan semua order
const index = async (req, res, next) => {
  try {
    let orders = await Orders.find().populate('or_pd_id');
    console.log(orders);
    return res.json(orders);
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  store,
  update,
  destroy,
  index,
};
