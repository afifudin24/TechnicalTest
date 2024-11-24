const User = require('../models/UserModel');
const bcrypt = require('bcrypt');

const destroy = async function (req, res, next) {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).json({
        // Mengembalikan status 404 Not Found jika produk tidak ditemukan
        error: 1,
        message: 'User not found',
      });
    }
    return res.json({ message: 'Product user successfully', product });
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
  destroy,
};
