"use strict";
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("lessons", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userId: {
        type: Sequelize.INTEGER,
        references: {
          model: "users",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      title: {
        type: Sequelize.STRING
      },
      slug: {
        type: Sequelize.STRING
      },
      duration: {
        type: Sequelize.TIME
      },
      value: {
        type: Sequelize.DECIMAL(10, 2)
      },
      description: {
        type: Sequelize.TEXT
      },
      categoryId: {
        type: Sequelize.INTEGER,
        references: {
          model: "categories",
          key: "id"
        },
        onDelete: "CASCADE"
      },
      createdAt: {
        allowNull: false,
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP"),
        type: "TIMESTAMP"
      },
      updatedAt: {
        allowNull: false,
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP"
        ),
        type: "TIMESTAMP"
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("lessons");
  }
};
