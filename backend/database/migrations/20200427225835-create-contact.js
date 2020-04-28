module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('contacts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            userId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'users',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            message: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
                type: 'TIMESTAMP',
            },
            updatedAt: {
                allowNull: false,
                defaultValue: Sequelize.literal(
                    'CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'
                ),
                type: 'TIMESTAMP',
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('contacts');
    },
};
