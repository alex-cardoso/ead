module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            is_admin: DataTypes.INTEGER,
            is_verified: DataTypes.INTEGER,
            receive_email_reply_forum: DataTypes.INTEGER,
        },
        {}
    );
    User.associate = function (models) {
        User.hasOne(models.Credit, {
            foreignKey: 'userId',
            as: 'credits',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.ForumPost, {
            foreignKey: 'userId',
            as: 'posts',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.ForumReply, {
            foreignKey: 'userId',
            as: 'replies',
            onDelete: 'CASCADE',
        });

        User.hasMany(models.LessonsFavorite, {
            foreignKey: 'lessonId',
            as: 'favoriteLessons',
            onDelete: 'CASCADE',
        });
    };
    return User;
};
