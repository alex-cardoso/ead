'use strict';
module.exports = {
    up: (queryInterface, Sequelize) => {
        return queryInterface.createTable('forumReplies', {
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
            lessonId: {
                references: {
                    model: 'lessons',
                    key: 'id',
                },
                onDelete: 'CASCADE',
                type: Sequelize.INTEGER,
            },
            forumPostId: {
                type: Sequelize.INTEGER,
                references: {
                    model: 'forumPosts',
                    key: 'id',
                },
                onDelete: 'CASCADE',
            },
            reply: {
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
        return queryInterface.dropTable('forumReplies');
    },
};
