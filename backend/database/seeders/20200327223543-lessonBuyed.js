const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        const title = faker.name.title();
        return queryInterface.bulkInsert(
            'lessonBuyeds',
            [
                {
                    userId: Math.round(Math.random() * 5),
                    lessonId: Math.round(Math.random() * 14),
                },
            ],
            {}
        );
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('lessonBuyeds', null, {});
    },
};
