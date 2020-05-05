const { User } = require('../../database/models');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;

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

const findUserByEmail = async (email) => {
    try {
        return await User.findOne({
            where: {
                email,
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

const update = async (user, id) => {
    try {
        if (user.password) {
            user.password = bcrypt.hashSync(user.password, 10);
        }
        return await User.update(
            { ...user },
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

const check_email_exist_another_users = async (id, email) => {
    try {
        return await User.findOne({
            where: {
                email,
                id: {
                    [Op.not]: id,
                },
            },
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    findUser,
    store,
    update_verified,
    findUserByEmail,
    update,
    check_email_exist_another_users,
};
