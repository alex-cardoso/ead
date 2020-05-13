const { LessonsFavorite, Lesson, Category, LessonBuyed } = require('../models');
const paginate = require('./paginate');

const favorites_from_user = async (userId, page = 1) => {
    try {
        const options = {
            per_page: 20,
            page,
            where: {
                userId,
            },
            distinct: true,
            include: [
                {
                    model: Lesson,
                    as: 'lesson',
                    include: [
                        {
                            attributes: ['userId', 'lessonId'],
                            model: LessonBuyed,
                            as: 'lessonBuyed',
                        },
                        {
                            model: Category,
                            as: 'category',
                        },
                        {
                            attributes: ['lessonId'],
                            model: LessonsFavorite,
                            as: 'favorites',
                        },
                    ],
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(LessonsFavorite, options);
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
    favorites_from_user,
};
