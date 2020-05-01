const express = require('express');
const router = express.Router();

// controllers
const Home = require('../controllers/dashboard/Home');
const Lesson = require('../controllers/dashboard/Lesson');

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (app) => {
    router.get('/', Home.index);
    router.get('/lessons', Lesson.index);
    router.get('/lessons/data', Lesson.data);

    router.get('*', function (req, res) {
        res.send('what???', 404);
    });

    return router;
};
