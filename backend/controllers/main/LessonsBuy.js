const { add_buyed_lesson } = require('../../database/services/lessons_buyed');
const {
    subtract: subtract_credits,
    credits_user,
} = require('../../database/services/credits');

const update = async (request, response) => {
    try {
        const { lessons, total } = request.body;

        if (!request.user) {
            throw 'not_logged_in';
        }

        const have_credits = await credits_user(request['user']['id']);

        if (
            !have_credits ||
            parseFloat(have_credits['value']) < parseFloat(total)
        ) {
            throw 'no_credits';
        }

        const user = request.user;

        const lessons_in_cart = JSON.parse(lessons);

        const promises = [];

        lessons_in_cart.forEach((lesson, index) => {
            let setTimedOut = setTimeout(async () => {
                promises.push(add_buyed_lesson(user['id'], lesson));
                if (index + 1 === lessons_in_cart.length) {
                    clearTimeout(setTimedOut);

                    await Promise.all(promises);

                    await subtract_credits(user['id'], total);
                    response.status(200).json('updated');
                }
            }, index * 1000);
        });
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    update,
};
