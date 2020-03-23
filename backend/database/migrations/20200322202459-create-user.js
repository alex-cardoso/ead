module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        type: Sequelize.STRING
      },
      last_name: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING,
        unique: true
      },
      password: {
        type: Sequelize.STRING
      },
      avatar: {
        type: Sequelize.STRING
      },
      is_admin: {
        type: Sequelize.INTEGER,
        defaultValue: 2
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
    return queryInterface.dropTable("users");
  }
};
