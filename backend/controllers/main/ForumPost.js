const axios = require('axios');

const store = async (request, response) => {
    try {
        const { token } = request.body;

        // console.log(request.body);

        const response_recaptcha = await axios.post(
            `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET}&response=${token}`
        );

        if (token === '') {
            throw 'error_recaptcha';
        }

        if (!response_recaptcha.data['success']) {
            throw 'error_recaptcha';
        }

        if (response_recaptcha.data['score'] <= 0.4) {
            throw 'error_recaptcha';
        }

        response.status(200).json(response_recaptcha.data['success']);
    } catch (error) {
        response.status(400).json(error);
    }
};

module.exports = {
    store,
};
