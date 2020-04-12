const { LessonBuyed } = require('../models');

const add_buyed_lesson = async (user, lesson) => {
    try {
        return await LessonBuyed.findOrCreate({
            where: {
                userId: user,
                lessonId: lesson,
            },
            defaults: {
                userId: user,
                lessonId: lesson,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    add_buyed_lesson,
};
