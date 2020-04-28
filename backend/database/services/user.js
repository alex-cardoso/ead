const { User } = require('../../database/models');
const bcrypt = require('bcrypt');

const findUser = async (id) => {
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

const store = async (user) => {
    try {
        user.password = bcrypt.hashSync(user.password, 10);
        return await User.create({ ...user });
    } catch (error) {
        console.log(error);
    }
};

const update_verified = async (id) => {
    try {
        return await User.update(
            {
                is_verified: 1,
            },
            {
                where: {
                    id,
                },
            }
        );
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    findUser,
    store,
    update_verified,
};
