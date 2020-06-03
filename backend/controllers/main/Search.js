const { search_lesson } = require('../../database/services/search');

const data = async (request, response) => {
    try {
        const { search } = request.query;
        const user = request.user ? request.user['id'] : null;
        const lessons = await search_lesson(search, user);

        response.status(200).json(lessons);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    data,
};
