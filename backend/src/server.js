const app = require('./app');

const port =
    process.env.NODE_ENV === 'development' ? process.env.PORT || 3000 : 3333;

app.listen(port);

module.exports = app;
