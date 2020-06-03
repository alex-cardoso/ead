const { ForumLesson } = require('../../database/models');

const forum = async lesson => {
    try {
        return await ForumLesson.findOrCreate({
            where: {
                lessonId: lesson,
            },
            defaults: {
                lessonId: lesson,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    forum,
};
