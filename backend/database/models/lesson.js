module.exports = (sequelize, DataTypes) => {
  const Lesson = sequelize.define(
    "Lesson",
    {
      userId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      slug: DataTypes.STRING,
      duration: DataTypes.STRING,
      value: DataTypes.DECIMAL,
      description: DataTypes.STRING
    },
    {}
  );
  Lesson.associate = function(models) {
    // associations can be defined here
  };
  return Lesson;
};
