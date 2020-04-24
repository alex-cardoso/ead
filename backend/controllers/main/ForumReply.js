const {
    update: update_reply,
    destroy: destroy_reply,
    create: create_reply,
} = require('../../database/services/forum_reply');
const { send_new_reply } = require('../../src/email');

const destroy = async (request, response) => {
    try {
        const { id } = request.query;

        const deleted = await destroy_reply(id);

        response.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const update = async (request, response) => {
    try {
        const { id, reply } = request.body['data'];

        const updated = await update_reply(id, reply);

        return response.status(200).json(updated);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const store = async (request, response) => {
    try {
        const { postUser, forumPostId, lesson, message } = request.body;

        const name = request.user['name'];
        const last_name = request.user['last_name'];
        const slug = lesson['slug'].replace(/\"/g, '');

        const created = await create_reply(
            request.user['id'],
            forumPostId,
            lesson['id'],
            message
        );

        if (postUser['receive_email_reply_forum'] === 1) {
            const post_name = `${postUser['name']} ${postUser['last_name']}`;
            const reply_name = `${name} ${last_name}`;
            const link = `http://${process.env.HOST}/lesson/${slug}`;

            await send_new_reply(
                postUser['email'],
                post_name,
                reply_name,
                link
            );
        }

        response.status(200).json(created);
    } catch (error) {
        response.status(400).json(error);
        console.log(error);
    }
};

module.exports = {
    destroy,
    update,
    store,
};
