const index = (request, response) => {
  response.render("../views/main/home", {
    layout: "main",
    title: process.env.PAGE_TITLE
  });
};

module.exports = {
  index
};
