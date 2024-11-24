const router = require('express').Router();
const OrderController = require('../app/controllers/OrderController');
// Mendapatkan semua order
router.get('/order', OrderController.index);

// Membuat order baru
router.post('/order', OrderController.store);

// Memperbarui order berdasarkan or_id
router.put('/order/:id', OrderController.update);

// Menghapus order berdasarkan or_id
router.delete('/order/:id', OrderController.destroy);
module.exports = router;
