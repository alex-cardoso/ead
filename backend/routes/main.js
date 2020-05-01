const express = require('express');
const bodyParser = require('body-parser');
const router = express.Router();

// validations
const { store: user_store_validation } = require('../validations/user');

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
const ForumReply = require('../controllers/main/ForumReply');
const User = require('../controllers/main/User');
const Favorite = require('../controllers/main/Favorite');
const Category = require('../controllers/main/Category');
const Search = require('../controllers/main/Search');
const Contact = require('../controllers/main/Contact');
const Credits = require('../controllers/main/Credits');
const Pagseguro = require('../controllers/main/Pagseguro');

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (passport) => {
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
    router.put('/forum/post/update', ForumPost.update);
    router.delete('/forum/post/destroy', ForumPost.destroy);
    router.delete('/forum/reply/destroy', ForumReply.destroy);
    router.put('/forum/reply/update', ForumReply.update);
    router.post('/forum/reply', ForumReply.store);
    router.get('/user/:id', User.data);
    router.get('/favorites', Favorite.data);
    router.post('/favorites', Favorite.store);
    router.delete('/favorites', Favorite.destroy);
    router.get('/category/lessons', Category.data);
    router.get('/category/:slug', Category.index);
    router.get('/categories/data', Categories.data);
    router.get('/lessons/search', Search.data);
    router.get('/signup', User.create);
    router.post('/signup', user_store_validation, User.store);
    router.get('/user/activate/:token', User.activate);
    router.get('/contact', Contact.index);
    router.post('/contact', Contact.store);
    router.get('/buy/credits', Credits.index);
    router.get('/pagseguro/checkout', Pagseguro.checkout);
    router.post(
        '/pagseguro/webhook',
        bodyParser.urlencoded({
            extended: true,
        }),
        Pagseguro.webhook
    );

    router.get('*', function (request, response) {
        response.status(400).send('what???');
    });

    return router;
};
