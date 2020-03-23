module.exports = function(request, response, next) {
  const user = request.user;
  const app = request.app;

  if (user !== undefined) {
    app.locals.username = user["name"];
    app.locals.last_name = user["last_name"];
    app.locals.avatar = user["avatar"];
    app.locals.is_authenticated = true;
    app.locals.is_admin = !!user["is_admin"];
  }

  next();
};
