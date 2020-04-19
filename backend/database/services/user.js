const { User } = require('../../database/models');

const findUser = async id => {
    try {
        return await User.findOne({
            where: {
                id,
            },
        });
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    findUser,
};
