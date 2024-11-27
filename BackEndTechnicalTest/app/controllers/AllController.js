const Categories = require('../models/CategoryModel');
const Product = require('../models/ProductModel');
const User = require('../models/UserModel');
const Order = require('../models/OrderModel');

const getCount = async (req, res, next) => {
  try {
    let categories = await Categories.find();
    let products = await Product.find();
    let users = await User.find();
    let orders = await Order.find();
    return res.json({
      categoriesCount: categories.length,
      productsCount: products.length,
      userCount: users.length,
      orderCount: orders.length,
    });
  } catch (err) {
    if (err && err.name === 'ValidationError') {
      return res.status(400).json({
        // Mengembalikan status 400 Bad Request
        error: 1,
        message: err.message,
        fields: err.errors,
      });
    }
    next(err);
  }
};

module.exports = {
  getCount,
};
