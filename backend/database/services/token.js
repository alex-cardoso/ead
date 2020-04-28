const { CreateUserToken } = require('../models');

const get_token = async (token) => {
    try {
        return await CreateUserToken.findOne({
            where: {
                token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

const store = async (user, token) => {
    try {
        return CreateUserToken.create({
            userId: user,
            token,
        });
    } catch (error) {
        console.log(error);
    }
};

const validate_token = async (token) => {
    try {
        const token_data = await get_token(token);

        if (token_data) {
            const date_create_token = token_data['createdAt'];
            const date_token = new Date(date_create_token);
            date_token.setHours(date_token.getHours() + 2);

            const date_now = new Date();

            if (new Date(date_now) > new Date(date_token)) {
                throw 'token_invalid';
            }

            return token_data;
        } else {
            throw 'token_invalid';
        }
    } catch (error) {
        throw error;
    }
};

module.exports = {
    get_token,
    store,
    validate_token,
};
