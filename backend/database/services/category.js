const { Category } = require('../models');
const paginate = require('./paginate');

const get_category = async (slug) => {
    try {
        return await Category.findOne({
            attributes: ['id'],
            where: {
                slug,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const get_all = async (page = 1) => {
    try {
        const options = {
            attributes: ['id', 'name', 'slug'],
            per_page: 20,
            page,
            order: [['id', 'DESC']],
        };

        return paginate(Category, options);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    get_category,
    get_all,
};
