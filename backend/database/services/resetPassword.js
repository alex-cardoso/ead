const { ResetPasswordToken } = require('../models');

const store = async (userId, token) => {
    try {
        return await ResetPasswordToken.create({
            userId,
            token,
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const get_token = async (token) => {
    try {
        return await ResetPasswordToken.findOne({
            where: {
                token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const verify_token = async (token) => {
    try {
        const token_data = await get_token(token);

        if (!token_data) {
            throw 'token_invalid';
        }

        const date_token = new Date(token_data['createdAt']);
        date_token.setHours(date_token.getHours() + 2);

        const date_now = new Date();

        if (new Date(date_now) > new Date(date_token)) {
            throw 'token_invalid';
        }

        return token_data;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const destroy = async (userId) => {
    try {
        return await ResetPasswordToken.destroy({
            where: {
                userId,
            },
        });
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    store,
    destroy,
    verify_token,
};
