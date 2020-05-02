const { Lesson } = require('../models');

const lessons = async (lessons) => {
    try {
        console.log(lessons);
        return await Lesson.findAll({
            where: {
                id: lessons,
            },
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    lessons,
};
