module.exports = (sequelize, DataTypes) => {
    const CreateUserToken = sequelize.define(
        'CreateUserToken',
        {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING,
        },
        {}
    );
    CreateUserToken.associate = function (models) {
        CreateUserToken.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return CreateUserToken;
};
