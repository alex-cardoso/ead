const {
    latest: latest_lessons,
    category_for_list_in_video: category_lessons,
    my: user_lessons,
    favorites: favorites_data,
    lessons,
} = require('../../database/services/lessons');

const latest = async (request, response) => {
    try {
        const user = request.user ? request.user['id'] : null;
        const lessons = await latest_lessons();

        lessons.map(lesson_data => {
            lesson_data['lessonBuyed'].map(lesson => {
                if (lesson['userId'] === user) {
                    // console.log(lesson['userId'], user, lesson['lessonId']);
                    lesson_data.setDataValue('userHasLesson', true);
                }
                return lesson;
            });

            return lesson_data;
        });

        response.status(200).json(lessons);
    } catch (error) {
        console.log(error);
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

const user = async (request, response) => {
    try {
        const { page } = request.query;
        const user = request.user ? request.user['id'] : null;
        const lessons = await user_lessons(page, user);
        response.status(200).json(lessons);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const favorites = async (request, response) => {
    try {
        const { lessonId } = request.query;

        const favorites = await favorites_data(lessonId);
        return response.status(200).json({
            favorites,
            user: request.user || {},
        });
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const data = async (request, response) => {
    try {
        const { page = 1 } = request.query;

        const lessons_data = await lessons(page);

        return response.status(200).json(lessons_data);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    latest,
    category,
    user,
    favorites,
    data,
};
