module.exports = (sequelize, DataTypes) => {
    const LessonsFavorite = sequelize.define(
        'LessonsFavorite',
        {
            lessonId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {}
    );
    LessonsFavorite.associate = function (models) {
        LessonsFavorite.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        LessonsFavorite.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            as: 'lesson',
        });
    };
    return LessonsFavorite;
};
