require("dotenv").config();

const express = require("express");

const helmet = require("helmet");
const cors = require("cors");
const express_handlebars = require("express-handlebars");
const session = require("express-session");
const app = express();
const passport = require("passport");
const passport_main = require("./passport-main");
const passport_admin = require("./passport-admin");
const serialize_passport = require("./serialize-passport");
const path = require("path");

app.use(helmet());
app.use(cors());
app.use(express.json());

const hbs = express_handlebars.create({
  defaultLayout: "main",
  helpers: {
    date: function() {
      return new Date().getFullYear();
    }
  }
});

app.use(express.static(path.join(__dirname, "../../", "dist/")));
app.engine("handlebars", hbs.engine);
app.set("view engine", "handlebars");
app.set("views", path.join(__dirname, "../", "views"));

serialize_passport(passport);
passport_admin(passport);
passport_main(passport);

app.use(
  session({
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 10800000,
      sameSite: true,
      secure: false // quando tiver com ssl coloca true
    }
  })
);

// quando faz logout e clica em back no navegador
app.use(function(req, res, next) {
  res.set(
    "Cache-Control",
    "no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0"
  );
  next();
});

app.use(passport.initialize());
app.use(passport.session());

app.use("/", require("../routes/main")(passport, app));

app.listen(process.env.PORT || 3000);
