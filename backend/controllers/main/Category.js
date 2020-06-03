const { category: lessons } = require('../../database/services/lessons');
const { get_category } = require('../../database/services/category');
const Cache = require('../../src/cache');

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

        let list_lessons_category;

        const category = await get_category(slug);

        const user = request.user !== undefined ? request.user['id'] : null;

        const lessons_category = await lessons(page, category['id']);

        lessons_category['rows'].map((lesson_data) => {
            lesson_data['lessonBuyed'].map((lesson) => {
                lesson_data.setDataValue('userHasLesson', false);
                if (lesson['userId'] === user) {
                    lesson_data.setDataValue('userHasLesson', true);
                }
                return lesson;
            });

            return lesson_data;
        });

        list_lessons_category = {
            lessons: lessons_category,
            category: category['name'],
        };

        return response.status(200).json(list_lessons_category);
    } catch (error) {
        console.log(error);
    }
};

module.exports = { index, data };
