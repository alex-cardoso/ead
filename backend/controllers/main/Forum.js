const { forum } = require('../../database/services/forum_lesson');

const data = async (request, response) => {
    try {
        const { lesson } = request.query;

        if (!lesson || lesson === '') {
            throw 'lesson_not_found';
        }

        const forum_data = await forum(lesson);

        response.status(200).json(forum_data);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    data,
};
