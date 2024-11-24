const router = require('express').Router();
const ProductController = require('../app/controllers/ProductController');

router.get('/product', ProductController.index);
router.post('/product', ProductController.store);
router.put('/product/:id', ProductController.update);
router.delete('/product/:id', ProductController.destroy);
module.exports = router;
