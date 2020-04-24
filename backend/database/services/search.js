const { Lesson, User, LessonBuyed, Category } = require('../models');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const search_lesson = async (searched, user) => {
    try {
        return await Lesson.findAll({
            attributes: ['id', 'title', 'slug', 'description', 'createdAt'],
            where: {
                [Op.or]: [
                    {
                        title: {
                            [Op.like]: `%${searched}%`,
                        },
                    },
                    {
                        description: {
                            [Op.like]: `%${searched}%`,
                        },
                    },
                ],
            },
            order: [['id', 'DESC']],
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    search_lesson,
};
