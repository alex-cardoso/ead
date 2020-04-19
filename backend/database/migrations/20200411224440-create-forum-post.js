module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('forumPosts', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            forumId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'forumLessons',
                    key: 'id',
                    onDelete: 'CASCADE',
                },
            },
            lessonId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'lessons',
                    key: 'id',
                },
                onDelete: 'CASCADE',
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
                type: Sequelize.TEXT,
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
        return queryInterface.dropTable('forumPosts');
    },
};
