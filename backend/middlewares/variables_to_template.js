module.exports = (request, response, next) => {
    const app = request.app;
    const user = request.user;
    if (user !== undefined) {
        app.locals.username = user['name'];
        app.locals.last_name = user['last_name'];
        app.locals.avatar = user['avatar'];
        app.locals.is_authenticated = true;
        app.locals.is_admin = !!user['is_admin'];
        app.locals.credits = user['credits'] ? user['credits']['value'] : 0.0;
    }
    next();
};