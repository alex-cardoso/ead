const {
    findUser,
    store: create_user,
    update_verified,
} = require('../../database/services/user');
const {
    store: create_token,
    validate_token,
} = require('../../database/services/token');
const { validationResult } = require('express-validator');
const {
    errors_formatted,
    create_token: create_random_token,
} = require('../../src/helpers');
const { send_new_user } = require('../../src/email');

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

const store = async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(422).json(errors_formatted(errors));
        }

        const user = request.body;

        const token = create_random_token();

        const created = await create_user(user);

        await create_token(created['id'], token);

        await send_new_user(user, token);

        response.status(200).json(created);
    } catch (error) {
        console.log(error);
    }
};

const activate = async (request, response) => {
    try {
        let updated = false;
        const token = request.params['token'];

        const token_data = await validate_token(token);

        if (token_data['userId'] !== undefined) {
            await update_verified(token_data['userId']);
            updated = true;
        }

        response.render('../views/main/count_activated', {
            layout: 'main',
            title: process.env.PAGE_TITLE,
            updated,
        });
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    data,
    create,
    store,
    activate,
};
