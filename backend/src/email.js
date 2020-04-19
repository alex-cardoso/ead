// require('dotenv').config();
const nodemailer = require('nodemailer');
const hbs = require('nodemailer-express-handlebars');
const path = require('path');

const configTemplate = () => {
    return transporter().use(
        'compile',
        hbs({
            viewEngine: {
                extname: '.handlebars',
                partialsDir: path.join(__dirname, '../views/emails/partials'),
                layoutsDir: path.join(__dirname, '../views/emails'),
            },

            viewPath: path.join(__dirname, '../views/emails'),
            extName: '.handlebars',
        })
    );
};

const transporter = () => {
    return nodemailer.createTransport({
        host: process.env.MAIL_HOST,
        port: 587,
        secure: false,
        auth: {
            user: process.env.MAIL_USERNAME,
            pass: process.env.MAIL_PASSWORD,
        },
    });
};

const send = async (from, to, subject, template) => {
    const config = configTemplate();
    return await config.sendMail({
        from,
        to,
        subject,
        template,
    });
};

const send_new_reply = async (to, username, response_from, link) => {
    const config = configTemplate();
    return await config.sendMail({
        from: 'contato@happycoding.com.br',
        to,
        subject: 'Mensagem respondida',
        template: 'new_reply',
        context: {
            username,
            response_from,
            link,
        },
    });
};

module.exports = {
    send_new_reply,
};
