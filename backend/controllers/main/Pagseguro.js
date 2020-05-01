const {
    authotization_code,
    notification_code,
    update_or_store_credits,
} = require('../../src/pagseguro');

const {
    send_new_approved_payment,
    send_new_reproved_payment,
    send_new_in_analysis_payment,
} = require('../../src/email');

const checkout = async (request, response) => {
    try {
        const { value } = request.query;

        if (!request.user) {
            throw 'not_logged';
        }

        const authorization = await authotization_code(request.user, value);

        if (!authorization['checkout']) {
            throw 'error_checkout';
        }

        response.status(200).json({
            code: authorization['checkout']['code']['_text'],
            link: process.env.PAGSEGURO_REDIRECT,
        });
    } catch (error) {
        console.log(error);
        response.status(400).json(error);
    }
};

const webhook = async (request, response) => {
    try {
        const { notificationCode } = request.body;

        if (!notificationCode) {
            throw 'error_response_pagseguro';
        }

        const pagseguro_response = await notification_code(notificationCode);

        if (!pagseguro_response) {
            throw 'error_resdponse.pagseguro';
        }

        const { reference, status, sender, grossAmount } = pagseguro_response[
            'transaction'
        ];

        if (status['_text'] === '3') {
            // paga
            await update_or_store_credits(reference['_text']);
            await send_new_approved_payment(
                sender['name']['_text'],
                sender['email']['_text'],
                grossAmount['_text']
            );
        }

        if (status['_text'] === '2') {
            // em analise
            await send_new_reproved_payment(
                sender['name']['_text'],
                sender['email']['_text'],
                grossAmount['_text']
            );
        }

        if (status['_text'] === '7') {
            // cancelada
            await send_new_in_analysis_payment(
                sender['name']['_text'],
                sender['email']['_text'],
                grossAmount['_text']
            );
        }

        response.status(200).json(pagseguro_response);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    checkout,
    webhook,
};
