const { Checkout } = require('../models');

const store = async (userId, token, value) => {
    try {
        return await Checkout.create({
            userId,
            token,
            value,
        });
    } catch (error) {
        console.log(error);
    }
};

const find = async (token) => {
    try {
        return await Checkout.findOne({
            where: {
                token,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    find,
    store,
};
