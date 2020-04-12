'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('forumLessons', {
            id: {
                allowNull: false,
                autoIncrement: true,
                primaryKey: true,
                type: Sequelize.INTEGER,
            },
            lessonId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'lessons',
                    key: 'id',
                },
                onDelete: 'CASCADE',
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
        return queryInterface.dropTable('forumLessons');
    },
};
