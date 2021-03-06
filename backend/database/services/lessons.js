const { Lesson, User, LessonBuyed, Category, LessonsFavorite, Github } = require('../models');
const paginate = require('./paginate');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

const lessons = async (page = 1) => {
    try {
        const options = {
            attributes: ['id', 'title', 'slug', 'duration', 'embed', 'value', 'description', 'updatedAt'],
            per_page: 20,
            distinct: true,
            include: [
                {
                    model: Category,
                    as: 'category',
                },
            ],
            page,
            order: [['id', 'DESC']],
        };

        return paginate(Lesson, options);
    } catch (error) {
        console.log(error);
    }
};

const latest = async () => {
    try {
        return await Lesson.findAll({
            attributes: ['id', 'title', 'slug', 'duration', 'value', 'description', 'updatedAt'],
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
                },
                {
                    attributes: ['id', 'name', 'slug'],
                    model: Category,
                    as: 'category',
                },
                {
                    attributes: ['userId', 'lessonId'],
                    model: LessonsFavorite,
                    as: 'favorites',
                },
            ],
            limit: 15,
            order: [['id', 'DESC']],
        });
    } catch (error) {
        console.log(error);
    }
};

const category_for_list_in_video = async (user, categoryId) => {
    try {
        return await Lesson.findAll({
            attributes: ['id', 'title', 'slug', 'duration', 'value', 'description', 'updatedAt'],
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
        });
    } catch (error) {
        console.log(error);
    }
};

const category = async (page = 1, categoryId) => {
    try {
        const options = {
            attributes: ['id', 'title', 'slug', 'duration', 'value', 'description', 'updatedAt'],
            per_page: 20,
            page,
            where: {
                categoryId,
            },
            distinct: true,
            include: [
                {
                    attributes: ['name', 'last_name', 'avatar'],
                    model: User,
                    as: 'user',
                },
                {
                    attributes: ['id', 'name', 'slug'],
                    model: Category,
                    as: 'category',
                },
                {
                    attributes: ['userId', 'lessonId'],
                    model: LessonsFavorite,
                    as: 'favorites',
                },
                {
                    attributes: ['userId', 'lessonId'],
                    model: LessonBuyed,
                    as: 'lessonBuyed',
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
            attributes: ['id', 'title', 'slug', 'duration', 'embed', 'value', 'description'],
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
                    attributes: ['userId', 'lessonId'],
                    model: LessonBuyed,
                    as: 'lessonBuyedFromUsers',
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
                {
                    attributes: ['lessonId', 'link'],
                    model: Github,
                    as: 'github',
                },
            ],
        });
    } catch (error) {
        console.log(error);
    }
};

const my = async (page = 1, userId) => {
    try {
        const options = {
            per_page: 20,
            page,
            distinct: true,
            where: {
                userId,
            },
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

        return paginate(LessonBuyed, options);
    } catch (error) {
        console.log(error);
    }
};

const favorites = async lessonId => {
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

const update = async (id, data) => {
    try {
        return await Lesson.update(
            {
                ...data,
            },
            {
                where: {
                    id,
                },
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const destroy = async id => {
    try {
        return await Lesson.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const store = async data => {
    try {
        return await Lesson.create({
            ...data,
        });
    } catch (error) {
        throw error;
    }
};


const search = async (searched, page) => {
    try {

        const options = {
            attributes: ['id', 'title', 'slug', 'duration', 'embed', 'value', 'description', 'updatedAt'],
            per_page: 20,
            distinct: true,
            where: {
                [Op.or]: [
                    { title: { [Op.like]: `%${searched}%` } },
                    { description: { [Op.like]: `%${searched}%` } }
                ],
            },
            include: [
                {
                    model: Category,
                    as: 'category',
                },
            ],
            page,
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
    category_for_list_in_video,
    find_lesson,
    category,
    my,
    favorites,
    update,
    destroy,
    store,
    search
};
