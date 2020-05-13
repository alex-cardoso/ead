const { get_all } = require('../../database/services/category');

const Cache = require('../../src/cache');

const index = (request, response) => {
    response.render('../views/main/categories_list', {
        layout: 'main',
        title: 'Categories - ' + process.env.PAGE_TITLE,
    });
};

const data = async (request, response) => {
    const { page } = request.query;

    let categories;

    if (!Cache.has('categories_menu')) {
        categories = await get_all(page);
        Cache.set('categories_menu', categories);
    } else {
        categories = Cache.get('categories_menu');
    }

    response.status(200).json(categories);
};

module.exports = {
    index,
    data,
};
