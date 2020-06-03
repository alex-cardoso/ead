const express = require('express');
const router = express.Router();

// controllers
const Category = require('../controllers/admin/Category');
const Lessons = require('../controllers/admin/Lessons');
const User = require('../controllers/admin/User');

const is_admin = require('../middlewares/is_admin');

router.get('/category', is_admin, Category.index);
router.post('/category/store', Category.store);
router.delete('/category/destroy', Category.destroy);
router.put('/category/update', Category.update);
router.get('/lessons', is_admin, Lessons.index);
router.put('/lesson/update', Lessons.update);
router.delete('/lesson', Lessons.destroy);
router.post('/lesson', Lessons.store);
router.get('/users', is_admin, User.index);
router.get('/users/data', User.data);
router.get('/users/search', User.search);
router.get('/lessons/search', Lessons.search);

router.get('*', function (request, response) {
    response.status(200).send('what???');
});

module.exports = router;
