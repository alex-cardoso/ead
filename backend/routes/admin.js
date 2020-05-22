const express = require('express');
const router = express.Router();

// controllers
const Category = require('../controllers/admin/Category');

// pegar dados se estiver logado, esses dados podem ser usados nos templates

router.get('/category', Category.index);
router.post('/category/store', Category.store);
router.delete('/category/destroy', Category.destroy);

router.get('*', function (req, res) {
    res.send('what???', 404);
});

module.exports = router;
