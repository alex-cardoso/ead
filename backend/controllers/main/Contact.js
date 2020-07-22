const { send_new_contact } = require('../../src/email');
const { store: create_contact } = require('../../database/services/contact');
const { repeated_letters } = require('../../src/validate');

const index = (request, response) => {
    response.render('../views/main/contact', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

const store = async (request, response) => {
    try {
        const { message, name, email } = request.body;

        repeated_letters(email);
        repeated_letters(name);
        repeated_letters(message);

        const sent = await send_new_contact(message, name, email);

        if (sent.messageId !== undefined && request.user !== undefined) {
            const created = await create_contact(request.user['id'], message);
            return response.status(200).json(created);
        }

        if (sent.messageId) {
            return response.status(200).json('sent');
        }

        throw 'error_sent';
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    index,
    store,
};
