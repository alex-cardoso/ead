module.exports = (sequelize, DataTypes) => {
    const Github = sequelize.define(
        'Github',
        {
            lessonId: DataTypes.INTEGER,
            link: DataTypes.STRING,
        },
        {}
    );
    Github.associate = function (models) {};
    return Github;
};
