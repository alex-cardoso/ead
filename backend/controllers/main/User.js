const { findUser } = require('../../database/services/user');
const { validationResult } = require('express-validator');
const { errors_formatted } = require('../../src/helpers');

const data = async (request, response) => {
    try {
        const id = request.params['id'];

        const user = await findUser(id);

        response.status(200).json(user);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const create = (request, response) => {
    try {
        response.render('../views/main/signup', {
            layout: 'main',
            is_authenticated: !!request.user,
            title: process.env.PAGE_TITLE,
        });
    } catch (error) {
        response.status(400).json(error);
    }
};

const store = (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(401).json(errors_formatted(errors));
        }

        const { name, last_name, email, password } = request.body;

        response.status(200).json(name);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    data,
    create,
    store,
};
