const Categories = require('../models/CategoryModel');

const store = async (req, res, next) => {
  try {
    let payload = req.body;
    let category = new Categories(payload);
    await category.save();
    return res.status(201).json(category); // Mengembalikan status 201 Created
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
    let category = await Categories.findByIdAndUpdate(req.params.id, payload, {
      new: true,
      runValidators: true,
    });

    if (!category) {
      return res.status(404).json({
        // Mengembalikan status 404 Not Found jika kategori tidak ditemukan
        error: 1,
        message: 'Category not found',
      });
    }

    return res.json(category);
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
    let category = await Categories.findByIdAndDelete(req.params.id);

    if (!category) {
      return res.status(404).json({
        // Mengembalikan status 404 Not Found jika kategori tidak ditemukan
        error: 1,
        message: 'Category not found',
      });
    }

    return res.json({ message: 'Category deleted successfully', category });
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
  console.log(req.user);
  try {
    let categories = await Categories.find();
    console.log(categories.length);
    return res.json(categories);
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
