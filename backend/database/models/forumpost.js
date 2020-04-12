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
        // associations can be defined here
    };
    return ForumPost;
};
