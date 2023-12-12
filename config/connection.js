const Sequelize = require("sequelize");
require("dotenv").config();
const sequelize = new Sequelize(
  "postgres://bobs_cars_user:owdmWvgqTv3vOxV9aTHYTaVGwud9owGY@dpg-clrsvffqd2ns73dt0ub0-a.ohio-postgres.render.com/bobs_cars?ssl=true"
);
//?ssl=true

// const sequelize = new Sequelize(
//   process.env.DB_NAME,
//   process.env.DB_USER,
//   process.env.DB_PASSWORD,
//   {
//     host: "dpg-clrsvffqd2ns73dt0ub0-a",
//     dialect: "postgres",
//     port: 5432,
//   }
// );

module.exports = sequelize;
