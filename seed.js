const sequelize = require("./config/connection");
const Cars = require("./models/Cars");

const carSeedData = require("./carseed.json");

const seedDatabase = async () => {
  await sequelize.sync({ force: true });

  const readers = await Cars.bulkCreate(carSeedData, {
    individualHooks: true,
    returning: true,
  });

  process.exit(0);
};

seedDatabase();
