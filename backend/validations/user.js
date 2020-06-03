const { check } = require('express-validator');
const { User } = require('../database/models');

const store = [
    check('name').custom((value, { request }) => {
        if (!/^[A-Z][a-z\u00C0-\u024F\u1E00-\u1EFF]*$/.test(value)) {
            throw new Error('Somente a primeira letra maiúscula');
        }

        if (/([a-zA-Z]).*?\1{2,}/.test(value)) {
            throw new Error('Muitas letras repetidas');
        }

        return true;
    }),
    check('name').not().isEmpty().trim().withMessage('Nome é obrigatório'),
    check('last_name').custom((value, { request }) => {
        if (/([a-zA-Z\u00C0-\u024F\u1E00-\u1EFF]).*?\1{2,}/.test(value)) {
            throw new Error('Muitas letras repetidas');
        }

        return true;
    }),
    check('last_name')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Sobrenome é obrigatório'),
    check('email').isEmail().withMessage('Email inválido'),
    check('email').custom(async (value, { request }) => {
        const user = await User.findOne({ where: { email: value } });
        if (user) {
            throw new Error('Email já está sendo usado.');
        }
    }),

    check('password').not().isEmpty().trim().withMessage('Senha é obrigatório'),
];

const update = [
    check('user.name').custom((value, { request }) => {
        if (!/^[A-Z][a-z]*$/.test(value)) {
            throw new Error('Somente a primeira letra maiúscula');
        }

        if (/([a-zA-Z]).*?\1{2,}/.test(value)) {
            throw new Error('Muitas letras repetidas');
        }

        return true;
    }),
    check('user.name').not().isEmpty().trim().withMessage('Nome é obrigatório'),
    check('user.last_name').custom((value, { request }) => {
        if (/([a-zA-Z]).*?\1{2,}/.test(value)) {
            throw new Error('Muitas letras repetidas');
        }

        return true;
    }),
    check('user.last_name')
        .not()
        .isEmpty()
        .trim()
        .withMessage('Sobrenome é obrigatório'),
    check('user.email').isEmail().withMessage('Email inválido'),
    check('user.email').not().isEmpty().trim().withMessage('Digite um email'),
];

module.exports = {
    store,
    update,
};
