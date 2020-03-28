const { latest: latest_lessons } = require('../../database/services/lessons');

const latest = async (request, response) => {
    try {
        const user = request.user ? request.user['id'] : null;
        const lessons = await latest_lessons(1, user);
        response.status(200).json(lessons);
    } catch (error) {
        response.status(400).json(error);
    }
};

const show = async (request, response) => {
    response.render('../views/main/lesson', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

module.exports = {
    latest,
    show,
};
