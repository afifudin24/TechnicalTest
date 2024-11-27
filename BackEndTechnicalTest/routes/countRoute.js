const router = require('express').Router();
const AllController = require('../app/controllers/AllController');

router.get('/countAll', AllController.getCount);
module.exports = router;
