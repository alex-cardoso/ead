const axios = require('axios');
const qs = require('qs');
const convert = require('xml-js');
const { create_token } = require('./helpers');
const {
    store: create_checkout,
    find: find_checkout,
} = require('../database/services/checkout');

const { update: update_credits } = require('../database/services/credits');

const token =
    process.env.NODE_ENV !== 'production'
        ? process.env.PAGSEGURO_TOKEN_DEVELOPMENT
        : process.env.PAGSEGURO_TOKEN_PRODUCTION;

const authotization_code = async (user, value) => {
    try {
        const reference = create_token();
        const authenticationCode = await axios({
            method: 'post',
            url: process.env.PAGSEGURO_CREATETOKENURL + token,
            data: qs.stringify({
                currency: 'BRL',
                itemId1: '001',
                itemDescription1: 'Pagamento de créditos',
                itemAmount1: parseFloat(value).toFixed(2),
                itemQuantity1: 1,
                reference,
                senderName: `${user.name} ${user.last_name}`,
                senderEmail: `${user.email}`,
                shippingAddressRequired: false,
            }),
            headers: {
                'content-type':
                    'application/x-www-form-urlencoded;charset=utf-8',
            },
        });

        await create_checkout(user['id'], reference, value);

        return convert.xml2js(authenticationCode.data, {
            compact: true,
            spaces: 4,
        });
    } catch (error) {
        console.log(error);
    }
};

const notification_code = async (notification_code) => {
    const authenticationCode = await axios({
        method: 'get',
        url:
            process.env.PAGSEGURO_RESPONSEURL +
            `${notification_code}?email=xandecar@hotmail.com&token=${token}`,
    });

    return convert.xml2js(authenticationCode.data, {
        compact: true,
        spaces: 4,
    });
};

const update_or_store_credits = async (reference) => {
    try {
        const checkout_data = await find_checkout(reference);

        const { userId, value } = checkout_data;

        await update_credits(userId, value);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    authotization_code,
    notification_code,
    update_or_store_credits,
};
