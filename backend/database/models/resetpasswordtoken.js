module.exports = (sequelize, DataTypes) => {
    const ResetPasswordToken = sequelize.define(
        'ResetPasswordToken',
        {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING,
        },
        {}
    );
    ResetPasswordToken.associate = function (models) {
        // associations can be defined here
    };
    return ResetPasswordToken;
};
