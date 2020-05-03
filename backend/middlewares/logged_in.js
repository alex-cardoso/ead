module.exports = (request, response, next) => {
    if (request.user === undefined) {
        return response.redirect('/');
    }

    next();
};
