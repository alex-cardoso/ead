module.exports = (sequelize, DataTypes) => {
    const Checkout = sequelize.define(
        'Checkout',
        {
            userId: DataTypes.INTEGER,
            token: DataTypes.STRING,
            value: DataTypes.DECIMAL,
        },
        {}
    );
    Checkout.associate = function (models) {
        Checkout.belongsTo(models.User, {
            foreignKey: 'userId',
            as: 'user',
        });
    };
    return Checkout;
};
