const index = (request, response) => {
    response.render('../views/main/buy_credits', {
        layout: 'main',
        is_authenticated: !!request.user,
        title: process.env.PAGE_TITLE,
    });
};

module.exports = {
    index,
};
