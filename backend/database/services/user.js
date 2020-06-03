const { User, LessonBuyed } = require('../../database/models');
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const paginate = require('./paginate');

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

const update_receive_email_reply_forum = async (id, receive_email_reply_forum) => {
    try {
        return await User.update(
            { receive_email_reply_forum },
            {
                where: {
                    id,
                },
            }
        );
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const get_all = (page) => {
    try {
        const options = {
            attributes: ['id', 'name', 'last_name', 'email'],
            per_page: 50,
            page,
            distinct: true,
            include: [
                {
                    attributes: ['id'],
                    model: LessonBuyed,
                    as: 'buyed',
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(User, options);
    } catch (error) {
        console.log(error);
        throw error;
    }
};

const search = async (searched, page) => {
    try {
        const options = {
            attributes: ['id', 'name', 'last_name', 'email'],
            per_page: 50,
            page,
            distinct: true,
            where: {
                [Op.or]: [
                    { name: { [Op.like]: `%${searched}%` } },
                    { last_name: { [Op.like]: `%${searched}%` } },
                    { email: { [Op.like]: `%${searched}%` } },
                ],
            },
            include: [
                {
                    attributes: ['id'],
                    model: LessonBuyed,
                    as: 'buyed',
                },
            ],
            order: [['id', 'DESC']],
        };

        return paginate(User, options);
    } catch (error) {
        console.log(error);
    }
};

module.exports = {
    findUser,
    store,
    update_verified,
    findUserByEmail,
    update,
    check_email_exist_another_users,
    update_receive_email_reply_forum,
    get_all,
    search,
};
