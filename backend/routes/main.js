const express = require('express');
const router = express.Router();

// controllers
const Home = require('../controllers/main/Home');
const Login = require('../controllers/main/Login');
const Categories = require('../controllers/main/Categories');
const Lessons = require('../controllers/main/Lessons');
const Lesson = require('../controllers/main/Lesson');
const LessonBuy = require('../controllers/main/LessonBuy');
const Forum = require('../controllers/main/Forum');
const ForumPosts = require('../controllers/main/ForumPosts');
const ForumPost = require('../controllers/main/ForumPost');

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (passport, app) => {
    router.get('/', Home.index);
    router.get('/login', Login.index);
    router.post('/login', passport.authenticate('main'), Login.store);
    router.get('/logout', Login.logout);
    router.get('/categories', Categories.index);
    router.get('/lesson/data', Lesson.data);
    router.get('/lesson/:slug', Lesson.show);
    router.get('/lessons/latest', Lessons.latest);
    router.get('/lessons/category', Lessons.category);
    router.put('/lesson/buy', LessonBuy.update);
    router.get('/forum', Forum.data);
    router.get('/forum/posts', ForumPosts.data);
    router.get('/forum/posts/more', ForumPosts.more);
    router.post('/forum/post', ForumPost.store);

    return router;
};
