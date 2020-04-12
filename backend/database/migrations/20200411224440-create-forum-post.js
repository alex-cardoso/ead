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
            title: {
                type: Sequelize.STRING,
            },
            message: {
                type: Sequelize.STRING,
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE,
            },
        });
    },
    down: (queryInterface, Sequelize) => {
        return queryInterface.dropTable('forumPosts');
    },
};
