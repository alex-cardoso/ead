const {
    findUserByEmail,
    update: update_user,
} = require('../../database/services/user');
const {
    verify_token,
    destroy: remove_token,
} = require('../../database/services/resetPassword');
const {
    store: createResetPassword,
} = require('../../database/services/resetPassword');
const { create_token } = require('../../src/helpers');
const { send_new_reset_password_link } = require('../../src/email');

const sendLink = async (request, response) => {
    try {
        const { email } = request.body;

        const user = await findUserByEmail(email);

        if (!user) {
            throw 'email_not_stored';
        }

        const token = create_token();

        const created = await createResetPassword(user['id'], token);

        await send_new_reset_password_link(user, token);

        response.status(200).json(created);
    } catch (error) {
        response.status(400).json(error);
    }
};

const edit = async (request, response) => {
    try {
        const { token } = request.params;

        const token_data = await verify_token(token);

        response.render('../views/main/can_change_password', {
            layout: 'main',
            user: token_data['userId'],
            title: process.env.PAGE_TITLE,
        });
    } catch (error) {
        response.render('../views/main/can_not_change_password', {
            layout: 'main',
            title: process.env.PAGE_TITLE,
        });
    }
};

const update = async (request, response) => {
    try {
        const { password, user } = request.body;

        const updated = await update_user({ password }, user);

        await remove_token(user);

        response.status(200).json(updated);
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    sendLink,
    edit,
    update,
};
