const {
    create: favorites_create,
    destroy: favorites_destroy,
    favorites_from_user,
} = require('../../database/services/favorites');

const store = async (request, response) => {
    const { lessonId } = request.body;
    try {
        if (!request.user) {
            throw 'not_logged_in';
        }
        const created = await favorites_create(lessonId, request.user['id']);
        response.status(200).json(created);
    } catch (error) {
        response.status(400).json(error);
    }
};

const index = async (request, response) => {
    response.render('../views/main/favorites', {
        layout: 'main',
        title: process.env.PAGE_TITLE,
    });
};

const user = async (request, response) => {
    const { userId, page = 1 } = request.query;
    try {
        if (!request.user) {
            throw 'not_logged_in';
        }

        const user = userId === undefined ? request.user['id'] : userId;

        const favorites = await favorites_from_user(user, page);

        favorites['rows'].map((lesson_data) => {
            lesson_data['lesson']['lessonBuyed'].map((lesson) => {
                if (lesson['userId'] === user) {
                    lesson_data['lesson'].setDataValue('userHasLesson', true);
                }
                return lesson;
            });

            return lesson_data;
        });

        response.status(200).json(favorites);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const destroy = async (request, response) => {
    const { id } = request.query;
    const deleted = await favorites_destroy(id);
    response.status(200).json(deleted);
};

module.exports = {
    store,
    destroy,
    user,
    index,
};
