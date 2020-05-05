const {
    check_password_and_update_user,
} = require('../../database/services/profile');

const {
    check_email_exist_another_users,
} = require('../../database/services/user');

const { validationResult } = require('express-validator');
const { errors_formatted } = require('../../src/helpers');

const index = (request, response) => {
    response.render('../views/main/profile', {
        layout: 'main',
        user: JSON.stringify(request.user),
        title: process.env.PAGE_TITLE,
    });
};

const update = async (request, response) => {
    try {
        const errors = validationResult(request);

        if (!errors.isEmpty()) {
            return response.status(422).json(errors_formatted(errors));
        }
        const { password_to_confirm, user } = request.body;

        const email_logged_in = request.user['email'];

        const exist_email = await check_email_exist_another_users(
            request.user['id'],
            user.email
        );

        if (exist_email) {
            throw 'email_exist';
        }

        await check_password_and_update_user(
            email_logged_in,
            password_to_confirm,
            user
        );

        response.status(200).json('updated');
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = { index, update };
