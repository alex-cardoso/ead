module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define(
        'Contact',
        {
            userId: DataTypes.INTEGER,
            message: DataTypes.STRING,
        },
        {}
    );
    Contact.associate = function (models) {
        // associations can be defined here
    };
    return Contact;
};
