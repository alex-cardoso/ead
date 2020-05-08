const {
    latest: latest_lessons,
    category_for_list_in_video: category_lessons,
} = require('../../database/services/lessons');

const latest = async (request, response) => {
    try {
        const user = request.user ? request.user['id'] : null;
        const lessons = await latest_lessons();

        lessons
            .map((lesson) => {
                lesson.setDataValue('userHasLesson', false);

                return lesson;
            })
            .map((lesson, index) => {
                if (lesson['lessonBuyed'][index] !== undefined) {
                    if (lesson['lessonBuyed'][index]['userId'] === user) {
                        lesson.setDataValue('userHasLesson', true);
                    }
                }

                return lesson;
            });

        response.status(200).json(lessons);
    } catch (error) {
        response.status(400).json(error);
    }
};

const category = async (request, response) => {
    try {
        const { category } = request.query;
        const user = request.user ? request.user['id'] : null;
        const lessons = await category_lessons(user, category);
        response.status(200).json(lessons);
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    latest,
    category,
};
