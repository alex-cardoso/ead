const LocalStrategy = require('passport-local').Strategy;
const { User } = require('../database/models');
const bcrypt = require('bcrypt');

module.exports = passport => {
    passport.use(
        'main',
        new LocalStrategy(async function(username, password, done) {
            const user = await User.findOne({
                attributes: [
                    'id',
                    'name',
                    'last_name',
                    'avatar',
                    'password',
                    'is_admin',
                ],
                where: {
                    email: username,
                },
            });

            if (!user) {
                return done(null, false);
            }

            const password_check = bcrypt.compareSync(password, user.password);

            if (!password_check) {
                return done(null, false);
            }

            return done(null, {
                id: user.id,
            });
        })
    );
};
