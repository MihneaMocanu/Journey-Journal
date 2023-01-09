import { Sequelize } from "sequelize";

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./sqlite/transports.db",
});

sequelize.sync({ force: true }).then(() => {
  console.log("All the models have been synchronized");
});

export { sequelize };