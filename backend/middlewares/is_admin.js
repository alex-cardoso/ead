module.exports = (request, response, next) => {
  if (request.user === undefined) {
    return response.redirect("/admin");
  }

  if (request.user["is_admin"] !== 1) {
    return response.redirect("/admin");
  }

  next();
};
