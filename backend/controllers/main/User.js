const { findUser } = require('../../database/services/user');

const data = async (request, response) => {
    try {
        const id = request.params['id'];

        const user = await findUser(id);

        response.status(200).json(user);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    data,
};
