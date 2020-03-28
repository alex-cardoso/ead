const { lessons } = require("../../database/services/lessons");

const index = (request, response) => {
  response.render("../views/dashboard/lessons", {
    layout: "dashboard",
    title: process.env.PAGE_TITLE_DASHBOARD
  });
};

const data = async (request, response) => {
  try {
    const { page } = request.query;
    const lesson = await lessons(page);
    response.status(200).json(lesson);
  } catch (error) {
    response.status(400).json(error);
    console.log(error);
  }
};

module.exports = {
  index,
  data
};
