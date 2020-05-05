const { findUserByEmail, update: update_user } = require('./user');
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

module.exports = {
    check_password_and_update_user,
};
