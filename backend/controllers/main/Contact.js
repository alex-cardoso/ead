const { send_new_contact } = require('../../src/email');
const { store: create_contact } = require('../../database/services/contact');

const index = (request, response) => {
    response.render('../views/main/contact', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

const store = async (request, response) => {
    try {
        const { message } = request.body;
        const sent = await send_new_contact(request.user, message);

        if (sent.messageId !== undefined) {
            const created = await create_contact(request.user['id'], message);
            return response.status(200).json(created);
        }

        throw 'error_sent';
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    index,
    store,
};
