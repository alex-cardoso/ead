const { Lesson, User, LessonBuyed } = require('../models');
const paginate = require('./paginate');

const lessons = async (page = 1) => {
    try {
        const options = {
            attributes: [
                'id',
                'title',
                'slug',
                'duration',
                'value',
                'description',
                'updatedAt',
            ],
            per_page: 10,
            page,
            order: [['id', 'DESC']],
        };

        return paginate(Lesson, options);
    } catch (error) {
        console.log(error);
    }
};

const latest = async (page = 1, user) => {
    try {
        const options = {
            attributes: [
                'id',
                'title',
                'slug',
                'duration',
                'value',
                'description',
                'updatedAt',
            ],
            per_page: 10,
            page,
            include: [
                {
                    attributes: ['name', 'last_name', 'avatar'],
                    model: User,
                    as: 'user',
                },
                {
                    attributes: ['userId', 'lessonId'],
                    model: LessonBuyed,
                    as: 'lessonBuyed',
                    required: false,
                    where: {
                        userId: user,
                    },
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(Lesson, options);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    lessons,
    latest,
};
