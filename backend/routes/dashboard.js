const express = require("express");
const router = express.Router();

// controllers
const Home = require("../controllers/dashboard/Home");
const Lesson = require("../controllers/dashboard/Lesson");

// middlewares
const is_admin = require("../middlewares/is_admin");

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = app => {
  app.use(is_admin);

  router.get("/", Home.index);
  router.get("/lessons", Lesson.index);
  router.get("/lessons/data", Lesson.data);

  return router;
};
