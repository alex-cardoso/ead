const { store: create_category, destroy: delete_category } = require('../../database/services/category');

const index = (request, response) => {
    response.render('../views/admin/category', {
        layout: 'admin',
        title: process.env.PAGE_TITLE,
    });
};

const store = async (request, response) => {
    try {
        const { name, slug } = request.body['category'];
        const created = await create_category({ name, slug });

        response.status(200).json(created);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const destroy = async (request, response) => {
    try {
        const { id } = request.query;
        const deleted = await delete_category(id);

        response.status(200).json(deleted);
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

module.exports = { index, store, destroy };
