const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const title = faker.name.title();
    return queryInterface.bulkInsert(
      "lessons",
      [
        {
          userId: Math.round(Math.random() * 5),
          title: title,
          slug: faker.helpers.slugify(title.toLocaleLowerCase()),
          duration: "10:20",
          value: faker.commerce.price(),
          categoryId: Math.round(Math.random() * 11),
          description: faker.lorem.sentences()
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("lessons", null, {});
  }
};
