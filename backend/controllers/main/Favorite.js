const {
    favorites: favorites_data,
    create: favorites_create,
    destroy: favorites_destroy,
} = require('../../database/services/favorites');

const data = async (request, response) => {
    try {
        const { lessonId } = request.query;

        const favorites = await favorites_data(lessonId);
        return response.status(200).json({
            favorites,
            user: request.user || {},
        });
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const store = async (request, response) => {
    const { lessonId } = request.body;
    const created = await favorites_create(lessonId, request.user['id']);
    response.status(200).json(created);
};

const destroy = async (request, response) => {
    const { id } = request.query;
    const deleted = await favorites_destroy(id);
    response.status(200).json(deleted);
};

module.exports = {
    data,
    store,
    destroy,
};
