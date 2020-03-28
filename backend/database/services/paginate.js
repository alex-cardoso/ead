const paginate = async (Model, options) => {
    try {
        const limit_and_offset = get_limit_offset(
            options['page'],
            options['per_page']
        );
        const data = await Model.findAndCountAll({
            ...limit_and_offset,
            ...options,
        });

        const total_pages = pages(data['count'], options['per_page']);

        return {
            ...data,
            pages: total_pages,
            per_page: options['per_page'],
        };
    } catch (error) {
        console.log(error);
    }
};

const get_limit_offset = (page, per_page) => {
    return {
        limit: per_page,
        offset: (parseInt(page) - 1) * per_page,
    };
};

const pages = (count, per_page) => {
    return Math.ceil(count / per_page);
};

module.exports = paginate;
