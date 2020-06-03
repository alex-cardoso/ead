module.exports = (sequelize, DataTypes) => {
    const Credit = sequelize.define(
        'Credit',
        {
            userId: DataTypes.INTEGER,
            value: DataTypes.DECIMAL,
        },
        {}
    );
    Credit.associate = function(models) {
        Credit.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'credits',
        });
    };
    return Credit;
};
