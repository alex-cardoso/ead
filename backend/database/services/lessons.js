const {
    Lesson,
    User,
    LessonBuyed,
    Category,
    LessonsFavorite,
} = require('../models');
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
            per_page: 12,
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
                {
                    attributes: ['id', 'name', 'slug'],
                    model: Category,
                    as: 'category',
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(Lesson, options);
    } catch (error) {
        console.log(error);
    }
};

const category = async (page = 1, user, categoryId) => {
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
            per_page: 12,
            page,
            where: {
                categoryId,
            },
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

const find_lesson = async (slug, user) => {
    try {
        return await Lesson.findOne({
            attributes: [
                'id',
                'title',
                'slug',
                'duration',
                'embed',
                'value',
                'description',
            ],
            where: {
                slug,
            },
            include: [
                {
                    attributes: ['userId', 'lessonId'],
                    model: LessonBuyed,
                    as: 'lessonBuyed',
                    required: false,
                    where: {
                        userId: user,
                    },
                },
                {
                    attributes: ['id', 'name', 'slug'],
                    model: Category,
                    as: 'category',
                },
                {
                    attributes: ['id', 'userId'],
                    model: LessonsFavorite,
                    as: 'favorites',
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    lessons,
    latest,
    category,
    find_lesson,
};
