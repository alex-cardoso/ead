module.exports = (sequelize, DataTypes) => {
    const LessonsFavorite = sequelize.define(
        'LessonsFavorite',
        {
            lessonId: DataTypes.INTEGER,
            userId: DataTypes.INTEGER,
        },
        {}
    );
    LessonsFavorite.associate = function(models) {
        // associations can be defined here
    };
    return LessonsFavorite;
};
