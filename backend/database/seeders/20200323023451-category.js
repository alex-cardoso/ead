const faker = require("faker");

module.exports = {
  up: (queryInterface, Sequelize) => {
    const category = faker.commerce.department();
    return queryInterface.bulkInsert(
      "categories",
      [
        {
          name: category,
          slug: faker.helpers.slugify(category.toLocaleLowerCase())
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete("categories", null, {});
  }
};
