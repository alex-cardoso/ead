const index = (request, response) => {
  response.render("../views/admin/login", {
    layout: "admin",
    title: process.env.PAGE_TITLE
  });
};

const login = (request, response) => {
  try {
    response.status(200).json("logged");
  } catch (error) {
    console.log(error);
    response.status(400).json(error);
  }
};

module.exports = {
  index,
  login
};
