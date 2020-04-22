const { category: lessons } = require('../../database/services/lessons');
const { get_category } = require('../../database/services/category');

const index = (request, response) => {
    const slug = request.params['slug'];

    response.render('../views/main/categories', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
        slug: JSON.stringify(slug),
    });
};

const data = async (request, response) => {
    try {
        const { slug, page } = request.query;

        const category = await get_category(slug);

        const user = request.user !== undefined ? request.user['id'] : null;

        const lessons_category = await lessons(page, user, category['id']);

        return response.status(200).json(lessons_category);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { index, data };
