const faker = require('faker');

module.exports = {
    up: (queryInterface, Sequelize) => {
        let query;
        for (let i = 0; i < 100; i++) {
            const title = faker.name.title();
            query = queryInterface.bulkInsert(
                'lessons',
                [
                    {
                        userId: Math.round(Math.random() * 5),
                        title: title,
                        slug: faker.helpers.slugify(title.toLocaleLowerCase()),
                        duration: '10:20',
                        value: faker.commerce.price(),
                        categoryId: Math.round(Math.random() * 11),
                        embed: 'd318fbyaB9I',
                        description: faker.lorem.sentences(),
                    },
                ],
                {}
            );
        }
        return query;
    },

    down: (queryInterface, Sequelize) => {
        return queryInterface.bulkDelete('lessons', null, {});
    },
};
