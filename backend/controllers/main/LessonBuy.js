const { check_and_remove_credits } = require('../../database/services/credits');

const update = async (request, response) => {
    try {
        if (!request.user) {
            return response.status(401).json('not_logged_in');
        }

        const { lesson: slug } = request.body;

        const check = await check_and_remove_credits(slug, request.user['id']);

        // request.user['credits']['value'] = check['value'];

        response.status(200).json(check);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    update,
};
