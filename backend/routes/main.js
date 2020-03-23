const express = require("express");
const router = express.Router();

// controllers
const Home = require("../controllers/main/Home");
const Login = require("../controllers/main/Login");

// middlewares
const local_variables_to_template = require("../middlewares/variables-locals-to-template");

// pegar dados se estiver logado, esses dados podem ser usados nos templates
module.exports = (passport, app) => {
  app.use(local_variables_to_template);

  router.get("/", Home.index);
  router.get("/login", Login.index);
  router.post("/login", passport.authenticate("main"), Login.store);
  router.get("/logout", Login.logout);

  return router;
};
