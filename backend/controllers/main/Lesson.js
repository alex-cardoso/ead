const { find_lesson } = require('../../database/services/lessons');

const show = async (request, response) => {
    const slug = request.params.slug;

    const user = request.user ? request.user['id'] : null;

    const lesson = await find_lesson(slug, user);

    response.render('../views/main/lesson', {
        layout: 'main',
        title: process.env.PAGE_TITLE,
        lesson: {
            title: lesson.title,
            is_authenticated: !!request.user,
            lesson_data: JSON.stringify(lesson),
        },
    });
};

const data = async (request, response) => {
    try {
        const { slug } = request.query;

        const user = request.user ? request.user['id'] : null;

        const lesson = await find_lesson(slug, user);

        response.status(200).json(lesson);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    show,
    data,
};
