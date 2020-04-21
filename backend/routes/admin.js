const express = require('express');
const router = express.Router();

// controllers
const Admin = require('../controllers/admin/Admin');

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (passport, app) => {
    router.get('/', Admin.index);
    router.post('/login', passport.authenticate('admin'), Admin.login);

    router.get('*', function (req, res) {
        res.send('what???', 404);
    });

    return router;
};
