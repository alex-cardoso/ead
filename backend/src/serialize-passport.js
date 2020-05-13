const { User, Credit } = require('../database/models');

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });

    passport.deserializeUser(async function (id, done) {
        const user = await User.findOne({
            attributes: [
                'id',
                'name',
                'email',
                'last_name',
                'is_admin',
                'avatar',
                'createdAt',
            ],
            where: {
                id,
            },
            include: [
                {
                    model: Credit,
                    as: 'credits',
                },
            ],
        });

        user ? done(null, user) : done(null, null);
    });
};
