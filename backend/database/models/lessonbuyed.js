module.exports = (sequelize, DataTypes) => {
    const LessonBuyed = sequelize.define(
        'LessonBuyed',
        {
            userId: DataTypes.INTEGER,
            lessonId: DataTypes.INTEGER,
        },
        {}
    );
    LessonBuyed.associate = function(models) {
        // associations can be defined here
    };
    return LessonBuyed;
};
