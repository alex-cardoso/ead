module.exports = (sequelize, DataTypes) => {
    const LessonBuyed = sequelize.define(
        'LessonBuyed',
        {
            userId: DataTypes.INTEGER,
            lessonId: DataTypes.INTEGER,
        },
        {}
    );
    LessonBuyed.associate = function (models) {
        LessonBuyed.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        LessonBuyed.belongsTo(models.Lesson, {
            foreignKey: 'lessonId',
            as: 'lesson',
        });
    };
    return LessonBuyed;
};
