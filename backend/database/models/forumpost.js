module.exports = (sequelize, DataTypes) => {
    const ForumPost = sequelize.define(
        'ForumPost',
        {
            forumId: DataTypes.INTEGER,
            lessonId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            message: DataTypes.STRING,
        },
        {}
    );
    ForumPost.associate = function(models) {
        ForumPost.hasMany(models.ForumReply, {
            foreignKey: 'forumPostId',
            as: 'replies',
            onDelete: 'CASCADE',
        });

        ForumPost.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return ForumPost;
};
