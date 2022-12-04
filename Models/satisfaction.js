import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Satisfaction = sequelize.define(
  "Satisfaction",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    level: {
      type: DataTypes.INTEGER,
      validate: {
        min: 1,
        max: 5,
      },
    },
  },
  {
    tableName: "Satisfactions",
  }
);

export { Satisfaction };
