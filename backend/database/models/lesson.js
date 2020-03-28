module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define(
        'Lesson',
        {
            userId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            duration: DataTypes.STRING,
            value: DataTypes.DECIMAL,
            description: DataTypes.STRING,
        },
        {}
    );
    Lesson.associate = function(models) {
        Lesson.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        Lesson.hasMany(models.LessonBuyed, {
            foreignKey: 'lessonId',
            as: 'lessonBuyed',
        });
    };
    return Lesson;
};
