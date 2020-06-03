const { Contact } = require('../models');
const store = async (userId, message) => {
    try {
        return await Contact.create({
            userId,
            message,
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    store,
};
