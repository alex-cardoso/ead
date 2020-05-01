require('dotenv').config();

const express = require('express');

const helmet = require('helmet');
const cors = require('cors');
const express_handlebars = require('express-handlebars');
const session = require('express-session');
const passport = require('passport');
const passport_main = require('./passport_main.js');
const passport_admin = require('./passport_admin');
const serialize_passport = require('./serialize-passport');
const path = require('path');
const variables_to_template = require('../middlewares/variables_to_template');

const app = express();

app.use(helmet());
app.use(
    cors({
        origin: process.env.CORS_ORIGIN,
    })
);
app.use(express.json());

const handlebars = express_handlebars.create({
    partialsDir: path.join(__dirname, '../', 'views/partials'),
    helpers: {
        date: function () {
            return new Date().getFullYear();
        },
        currency: function (value) {
            const formatter = new Intl.NumberFormat('pt-BR', {
                style: 'currency',
                currency: 'BRL',
                minimumFractionDigits: 2,
            });
            return formatter.format(value);
        },
    },
});

app.use(express.static(path.join(__dirname, '../../frontend/', 'dist/')));
app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');

app.use(
    session({
        secret: process.env.SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
            maxAge: 10800000,
            sameSite: true,
            secure: false, // quando tiver com ssl coloca true
        },
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport_main(passport);
passport_admin(passport);
serialize_passport(passport);

// quando faz logout e clica em back no navegador
app.use(function (req, res, next) {
    res.set(
        'Cache-Control',
        'no-cache, private, no-store, must-revalidate, max-stale=0, post-check=0, pre-check=0'
    );
    next();
});

// carregar variaveis para o template
app.use(variables_to_template);

app.use('/', require('../routes/main')(passport));
app.use('/admin', require('../routes/admin')(passport));
app.use('/dashboard', require('../routes/dashboard')(app));

module.exports = app;
