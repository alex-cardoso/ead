const {
    update: update_lesson,
    destroy: delete_lesson,
    store: create_lesson,
} = require('../../database/services/lessons');

const { getUser } = require('../../src/user');

const index = (request, response) => {
    response.render('../views/admin/lessons', {
        layout: 'admin',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

const update = async (request, response) => {
    try {
        const { lesson } = request.body;
        const updated = await update_lesson(lesson['id'], lesson);

        response.status(200).json(updated);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const destroy = async (request, response) => {
    try {
        const { id } = request.query;

        const deleted = await delete_lesson(id);

        response.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const store = async (request, response) => {
    try {
        const { lesson } = request.body;

        const user = getUser(request);

        lesson['userId'] = user['id'];

        const created = await create_lesson(lesson);

        response.status(200).json(created);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    index,
    update,
    destroy,
    store,
};
