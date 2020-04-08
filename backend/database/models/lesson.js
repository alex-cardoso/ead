module.exports = (sequelize, DataTypes) => {
    const Lesson = sequelize.define(
        'Lesson',
        {
            userId: DataTypes.INTEGER,
            title: DataTypes.STRING,
            slug: DataTypes.STRING,
            duration: DataTypes.STRING,
            value: DataTypes.DECIMAL,
            embed: DataTypes.STRING,
            description: DataTypes.STRING,
        },
        {}
    );
    Lesson.associate = function(models) {
        Lesson.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });

        Lesson.belongsTo(models.Category, {
            foreignKey: 'categoryId',
            as: 'category',
        });

        Lesson.hasMany(models.LessonBuyed, {
            foreignKey: 'lessonId',
            as: 'lessonBuyed',
        });
    };
    return Lesson;
};
