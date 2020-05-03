const { add_buyed_lesson } = require('../../database/services/lessons_buyed');
const {
    subtract: subtract_credits,
} = require('../../database/services/credits');

const update = async (request, response) => {
    try {
        const { lessons, total } = request.body;

        if (!request.user) {
            throw 'not_logged_in';
        }

        const user = request.user;

        const lessons_in_cart = JSON.parse(lessons);

        const promises = [];

        lessons_in_cart.forEach((lesson) => {
            promises.push(add_buyed_lesson(user['id'], lesson));
        });

        await Promise.all(promises);

        await subtract_credits(user['id'], total);

        response.status(200).json('updated');
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    update,
};
