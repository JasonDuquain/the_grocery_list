const express = require('express');
const router = express.Router()
const Item = require('../database/models/item');

const itemController = require('../controllers/itemController');


router.post('/add', itemController.create);
router.get('/', itemController.showAll);
router.post('/delete/:id', itemController.delete);
router.get('/:id', itemController.show);
router.post('/update/:id', itemController.edit);




module.exports = router;

