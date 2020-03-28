const index = (request, response) => {
  response.render("../views/dashboard/home", {
    layout: "dashboard",
    title: process.env.PAGE_TITLE_DASHBOARD
  });
};

module.exports = {
  index
};
