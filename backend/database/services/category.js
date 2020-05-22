const { Category, Lesson } = require('../models');
const paginate = require('./paginate');

const get_category = async (slug) => {
    try {
        return await Category.findOne({
            attributes: ['id', 'name'],
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
            per_page: 50,
            page,
            distinct: true,
            include: [
                {
                    attributes: ['id', 'title'],
                    model: Lesson,
                    as: 'lessons',
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(Category, options);
    } catch (error) {
        console.log(error);
    }
};

const store = async (category) => {
    try {
        return await Category.create({
            ...category,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const destroy = async (id) => {
    try {
        return await Category.destroy({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    get_category,
    get_all,
    store,
    destroy,
};
