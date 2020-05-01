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

const send_new_reply = async (to, username, response_from, link) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
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

const send_new_user = async (user, token) => {
    const config = configTemplate();
    const link = `${process.env.HOST}/user/activate/${token}`;
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: user.email,
        subject: 'Ative sua conta',
        template: 'verify_account',
        context: {
            user,
            link,
        },
    });
};

const send_new_contact = async (user, message) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${user.name} <${user.email}>`,
        to: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        subject: 'Contato pelo site',
        template: 'contact',
        context: {
            name: `${user.name} ${user.last_name}`,
            message,
        },
    });
};

const send_new_approved_payment = async (name, email, credits) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: `${email}`,
        subject: 'Pagamento Aprovado',
        template: 'payment_approved',
        context: {
            name,
            credits,
            link: process.env.HOST,
        },
    });
};

const send_new_reproved_payment = async (name, email, credits) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: `${email}`,
        subject: 'Pagamento Reprovado',
        template: 'payment_reproved',
        context: {
            name,
            credits,
            link: process.env.HOST,
        },
    });
};

const send_new_in_analysis_payment = async (name, email, credits) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: `${email}`,
        subject: 'Pagamento em análise',
        template: 'payment_in_analysis',
        context: {
            name,
            credits,
            link: process.env.HOST,
        },
    });
};

module.exports = {
    send_new_reply,
    send_new_user,
    send_new_contact,
    send_new_approved_payment,
    send_new_reproved_payment,
    send_new_in_analysis_payment,
};
