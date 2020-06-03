const index = (request, response) => {
    response.render('../views/main/user_lessons', {
        layout: 'main',
        title: process.env.PAGE_TITLE,
    });
};

module.exports = { index };
