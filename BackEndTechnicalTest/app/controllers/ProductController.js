const Products = require('../models/ProductModel'); // Pastikan ini mengarah ke model produk Anda

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let product = new Products(payload);
    await product.save();
    return res.status(201).json(product); // Mengembalikan status 201 Created
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        // Mengembalikan status 400 Bad Request
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err); // Untuk kesalahan lainnya, teruskan ke middleware penanganan kesalahan
  }
};

const update = async (req, res, next) => {
  try {
    let payload = req.body;
    let product = await Products.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!product) {
      return res.status(404).json({
        // Mengembalikan status 404 Not Found jika produk tidak ditemukan
        error: 1,
        message: 'Product not found',
      });
    }

    return res.json(product);
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

const destroy = async (req, res, next) => {
  try {
    let product = await Products.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({
        // Mengembalikan status 404 Not Found jika produk tidak ditemukan
        error: 1,
        message: 'Product not found',
      });
    }

    return res.json({ message: 'Product deleted successfully', product });
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

const index = async (req, res, next) => {
  try {
    let products = await Products.find().populate('pd_ct_id'); // Menggunakan populate untuk mendapatkan data kategori
    return res.json(products);
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
