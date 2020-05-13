const { currency } = require('../src/helpers');

module.exports = (request, response, next) => {
    const app = request.app;
    const user = request.user;

    app.locals.is_authenticated = request.isAuthenticated();
    if (user !== undefined) {
        app.locals.username = user['name'];
        app.locals.last_name = user['last_name'];
        app.locals.avatar =
            user['avatar'] === '' || user['avatar'] === null
                ? '/uploads/avatar_resized/default.png'
                : user['avatar'];
        app.locals.is_admin = !!user['is_admin'];
        app.locals.credits = user['credits']
            ? currency(user['credits']['value'])
            : 'R$ 0.00';
    } else {
        app.locals.avatar = '/uploads/avatar_resized/default.png';
        app.locals.credits = 'R$ 0.00';
    }

    next();
};
