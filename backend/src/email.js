require('dotenv').config();
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
        to: `${to},${process.env.EMAIL_FROM_EMAIL},alecar2007@gmail.com`,
        subject: `Mensagem respondida[${process.env.EMAIL_FROM_NAME}]`,
        template: 'new_reply',
        context: {
            username,
            response_from,
            link,
        },
    });
};

const send_new_thread = async (lesson, thread_from) => {
    const config = configTemplate();
    const link = `${process.env.HOST}/lesson/${lesson}`;
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: process.env.EMAIL_FROM_EMAIL,
        subject: 'Nova mensagem no fórm',
        template: 'new_thread',
        context: {
            thread_from,
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
        subject: `Ative sua conta[${process.env.EMAIL_FROM_NAME}]`,
        template: 'verify_account',
        context: {
            user,
            link,
        },
    });
};

const send_new_contact = async (message, name, email) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${name} <${email}>`,
        to: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        subject: `Contato pelo site[${process.env.EMAIL_FROM_NAME}]`,
        template: 'contact',
        context: {
            name,
            message,
        },
    });
};

const send_new_approved_payment = async (name, email, credits) => {
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: `${email}`,
        subject: `Pagamento Aprovado[${process.env.EMAIL_FROM_NAME}]`,
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
        subject: `Pagamento Reprovado[${process.env.EMAIL_FROM_NAME}]`,
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
        subject: `Pagamento em análise[${process.env.EMAIL_FROM_NAME}]`,
        template: 'payment_in_analysis',
        context: {
            name,
            credits,
            link: process.env.HOST,
        },
    });
};

const send_new_reset_password_link = async (user, token) => {
    const link = `${process.env.HOST}/reset/password/${token}`;
    const config = configTemplate();
    return await config.sendMail({
        from: `${process.env.EMAIL_FROM_NAME} <${process.env.EMAIL_FROM_EMAIL}>`,
        to: user.email,
        subject: `Resetar sua senha[${process.env.EMAIL_FROM_NAME}]`,
        template: 'reset_password',
        context: {
            name: `${user.name} ${user.last_name}`,
            link,
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
    send_new_reset_password_link,
    send_new_thread,
};
