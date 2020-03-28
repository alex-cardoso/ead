const index = (request, response) => {
    response.render('../views/main/categories', {
        layout: 'main',
        title: 'Categories - ' + process.env.PAGE_TITLE,
    });
};

module.exports = {
    index,
};
