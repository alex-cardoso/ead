require('dotenv').config();

if (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === 'test') {
    module.exports = {
        username: process.env.DATABASE_USERNAME,
        password: process.env.DATABASE_PASSWORD,
        database: process.env.DATABASE_DATABASE,
        host: process.env.DATABASE_HOST,
        dialect: 'mysql',
    };
}

if (process.env.NODE_ENV === 'production') {
    module.exports = {
        username: 'root',
        password: null,
        database: 'database_development',
        host: '127.0.0.1',
        dialect: 'mysql',
    };
}
