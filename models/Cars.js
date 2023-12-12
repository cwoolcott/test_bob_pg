const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");

class Cars extends Model {}

Cars.init(
  {
    make: {
      type: DataTypes.STRING,
    },
    model: {
      type: DataTypes.STRING,
    },
    image: {
      type: DataTypes.STRING,
    },
    year: {
      type: DataTypes.INTEGER,
    },
    price: {
      type: DataTypes.INTEGER,
    },
    sold: {
      type: DataTypes.BOOLEAN,
    },
  },
  {
    sequelize,
    timestamps: true,
    underscored: true,
    modelName: "cars",
  }
);

module.exports = Cars;
