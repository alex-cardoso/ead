const express = require('express');
const router = express.Router();

// controllers
const Home = require('../controllers/main/Home');
const Login = require('../controllers/main/Login');
const Categories = require('../controllers/main/Categories');
const Lessons = require('../controllers/main/Lessons');

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (passport, app) => {
    router.get('/', Home.index);
    router.get('/login', Login.index);
    router.post('/login', passport.authenticate('main'), Login.store);
    router.get('/logout', Login.logout);
    router.get('/categories', Categories.index);
    router.get('/lessons/latest', Lessons.latest);
    router.get('/lesson/:slug', Lessons.show);

    return router;
};
