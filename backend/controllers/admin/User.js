const { get_all, search: search_user } = require('../../database/services/user');

const index = (request, response) => {
    response.render('../views/admin/users', {
        layout: 'admin',
        title: process.env.PAGE_TITLE,
    });
};

const data = async (request, response) => {
    try {
        const { page = 1 } = request.query;

        const users = await get_all(page);

        response.status(200).json(users);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const search = async (request, response) => {
    try {
        const { searched, page = 1 } = request.query;

        console.log(request.query);

        const users = await search_user(searched, page);
        response.status(200).json(users);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = {
    index,
    data,
    search,
};
