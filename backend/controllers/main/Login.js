const index = (request, response) => {
    response.render('../views/main/login', {
        layout: 'main',
        title: process.env.PAGE_TITLE,
    });
};

const store = (request, response) => {
    try {
        response.status(200).json('logged');
    } catch (error) {
        response.status(400).json(error);
    }
};

const logout = (request, response) => {
    if (request.isAuthenticated()) {
        request.logout();
        request.session.destroy(function(error) {
            request.user = null;
            response.redirect('/');
        });
    }
};

module.exports = {
    index,
    store,
    logout,
};
