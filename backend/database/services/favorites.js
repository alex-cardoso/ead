const { LessonsFavorite } = require('../models');

const favorites = async (lessonId) => {
    try {
        return await LessonsFavorite.findAll({
            where: {
                lessonId,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        return await LessonsFavorite.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const create = async (lessonId, userId) => {
    try {
        return await LessonsFavorite.findOrCreate({
            defaults: {
                lessonId,
                userId,
            },
            where: {
                lessonId,
                userId,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    create,
    destroy,
    favorites,
};
