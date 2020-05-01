const { Credit } = require('../models');
const { find_lesson } = require('./lessons');
const { add_buyed_lesson } = require('./lessons_buyed');

const credits_user = async (user) => {
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

const update = async (user, credits) => {
    try {
        const credits_on_database = await credits_user(user);

        const new_credits =
            credits_on_database['value'] <= 0
                ? credits
                : parseFloat(
                      Number(credits_on_database['value']) + Number(credits)
                  );

        return await Credit.update(
            {
                value: new_credits,
            },
            {
                where: {
                    userId: user,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
};

const store = async (user, credits) => {
    try {
        return await Credit.findOrCreate({
            where: {
                userId: user,
            },

            defaults: {
                userId: user,
                value: credits,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    check_and_remove_credits,
    credits_user,
    update,
    store,
};
