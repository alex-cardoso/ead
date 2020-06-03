module.exports = (request, response, next) => {
    if (request.user === undefined || request.user['is_admin'] !== 1) {
        return response.redirect('/');
    }
    next();
};
