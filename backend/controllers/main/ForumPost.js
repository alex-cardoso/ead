const axios = require('axios');
const {
    create,
    update: update_post,
    destroy: destroy_post,
} = require('../../database/services/forum_post');
const { getUser } = require('../../src/user');

const { send_new_thread } = require('../../src/email');

const store = async (request, response) => {
    try {
        const { token, post, forumId, lessonId, lessonSlug } = request.body;

        const user = getUser(request);

        const response_recaptcha = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
        );

        if (token === '') {
            throw 'error_recaptcha';
        }

        if (!response_recaptcha.data['success']) {
            throw 'error_recaptcha';
        }

        if (response_recaptcha.data['score'] <= 0.4) {
            throw 'error_recaptcha';
        }

        const created = await create(user['id'], lessonId, forumId, post);

        const user_name = user['name'] + ' ' + user['last_name'];
        await send_new_thread(lessonSlug, user_name);

        response.status(200).json(created);
    } catch (error) {
        response.status(400).json(error);
    }
};

const update = async (request, response) => {
    try {
        const { id, message } = request.body['data'];

        const update = await update_post(id, message);

        response.status(200).json(update);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const destroy = async (request, response) => {
    try {
        const { id } = request.query;

        const deleted = await destroy_post(id);

        response.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    store,
    update,
    destroy,
};
