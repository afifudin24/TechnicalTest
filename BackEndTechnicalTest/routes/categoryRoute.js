const router = require('express').Router();
const os = require('os');
const CategoryController = require('../app/controllers/CategoriesController');

router.get('/categories', CategoryController.index);
router.post('/categories', CategoryController.store);
router.put('/categories/:id', CategoryController.update);
router.delete('/categories/:id', CategoryController.destroy);
module.exports = router;
