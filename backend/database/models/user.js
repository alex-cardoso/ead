module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define(
        'User',
        {
            name: DataTypes.STRING,
            last_name: DataTypes.STRING,
            email: DataTypes.STRING,
            password: DataTypes.STRING,
            avatar: DataTypes.STRING,
            is_admin: DataTypes.INTEGER,
        },
        {}
    );
    User.associate = function(models) {
        User.hasOne(models.Credit, {
            foreignKey: 'userId',
            as: 'credits',
        });
    };
    return User;
};
