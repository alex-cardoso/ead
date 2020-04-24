const { check } = require('express-validator');

const store = [
    check('name').not().isEmpty().trim().withMessage('Nome é obrigatório'),
    check('last_name')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Sobrenome é obrigatório'),
    check('email').isEmail().withMessage('Email inválido'),
    check('password').not().isEmpty().trim().withMessage('Senha é obrigatório'),
];

module.exports = {
    store,
};
