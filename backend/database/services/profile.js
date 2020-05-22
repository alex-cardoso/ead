const {
    findUserByEmail,
    update: update_user,
    update_receive_email_reply_forum: update_recevive_email,
} = require('./user');
const bcrypt = require('bcrypt');

const check_password_and_update_user = async (email, password, user) => {
    try {
        const user_data = await findUserByEmail(email);

        const password_check = bcrypt.compareSync(
            password,
            user_data['password']
        );

        if (!password_check) {
            throw 'password_not_match';
        }

        const updated = await update_user(user, user_data['id']);

        return updated;
    } catch (error) {
        throw error;
    }
};

const update_receive_email_reply_forum = async (
    id,
    receive_email_reply_forum
) => {
    try {
        const updated = await update_recevive_email(
            id,
            receive_email_reply_forum
        );

        return updated;
    } catch (error) {
        console.log(error);
        throw error;
    }
};

module.exports = {
    check_password_and_update_user,
    update_receive_email_reply_forum,
};
