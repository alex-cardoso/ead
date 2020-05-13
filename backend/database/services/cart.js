const { Lesson, Category } = require('../models');

const lessons = async (lessons) => {
    try {
        return await Lesson.findAll({
            where: {
                id: lessons,
            },
            include: [
                {
                    attributes: ['id', 'name', 'slug'],
                    model: Category,
                    as: 'category',
                },
            ],
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    lessons,
};
