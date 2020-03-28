const index = (request, response) => {
    response.render('../views/main/home', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

module.exports = {
    index,
};
