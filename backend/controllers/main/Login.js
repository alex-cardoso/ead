const index = (request, response) => {
  response.render("../views/main/login", {
    layout: "main",
    title: process.env.PAGE_TITLE
  });
};

const store = (request, response) => {
  try {
    response.status(200).json("logged");
  } catch (error) {
    response.status(400).json(error);
  }
};

const logout = (request, response) => {
  request.logout();
  request.user = undefined;
  request.app.locals.username = null;
  request.app.locals.last_name = null;
  request.app.locals.avatar = null;
  request.app.locals.is_admin = null;
  request.app.locals.is_authenticated = null;
  request.session.destroy(function(err) {
    response.redirect("/");
  });
};

module.exports = {
  index,
  store,
  logout
};
