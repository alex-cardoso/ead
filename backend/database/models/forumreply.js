module.exports = (sequelize, DataTypes) => {
    const ForumReply = sequelize.define(
        'ForumReply',
        {
            userId: DataTypes.INTEGER,
            lessonId: DataTypes.INTEGER,
            forumPostId: DataTypes.INTEGER,
            reply: DataTypes.TEXT,
        },
        {}
    );
    ForumReply.associate = function(models) {
        ForumReply.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return ForumReply;
};
