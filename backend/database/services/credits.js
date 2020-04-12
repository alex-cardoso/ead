const { Credit } = require('../models');
const { find_lesson } = require('./lessons');
const { add_buyed_lesson } = require('./lessons_buyed');

const credits_user = async user => {
    try {
        return await Credit.findOne({
            where: {
                userId: user,
            },
        });
    } catch (error) {
        throw error;
    }
};

const check_and_remove_credits = async (slug, user) => {
    try {
        const lesson = await find_lesson(slug, user);

        const credits = await credits_user(user);

        if (!credits || credits['value'] <= 0) {
            throw 'no_credits';
        }

        if (parseFloat(credits['value']) < parseFloat(lesson['value'])) {
            throw 'no_credits';
        }

        credits.value -= parseFloat(lesson['value']);
        credits.save();

        await add_buyed_lesson(user, lesson['id']);

        return credits;
    } catch (error) {
        throw error;
    }
};

module.exports = {
    check_and_remove_credits,
};
