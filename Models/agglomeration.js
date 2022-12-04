import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Agglomeration = sequelize.define(
  "Agglomeration",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    description: {
      type: DataTypes.STRING,
    },
  },
  {
    tableName: "Agglomerations",
  }
);

export { Agglomeration };
