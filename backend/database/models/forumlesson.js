module.exports = (sequelize, DataTypes) => {
    const ForumLesson = sequelize.define(
        'ForumLesson',
        {
            lessonId: DataTypes.INTEGER,
        },
        {}
    );
    ForumLesson.associate = function(models) {
        ForumLesson.hasMany(models.ForumPost, {
            foreignKey: 'forumId',
            as: 'posts',
            onDelete: 'CASACADE',
        });
    };
    return ForumLesson;
};
