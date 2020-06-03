const { get_all, get_all_no_agination } = require('../../database/services/category');

const index = (request, response) => {
    response.render('../views/main/categories_list', {
        layout: 'main',
        title: 'Categories - ' + process.env.PAGE_TITLE,
    });
};

const data = async (request, response) => {
    const { page } = request.query;

    const categories = await get_all(page);

    response.status(200).json(categories);
};

const noPagination = async (request, response) => {
    const categories = await get_all_no_agination();

    response.status(200).json(categories);
};

module.exports = {
    index,
    data,
    noPagination,
};
