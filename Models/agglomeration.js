import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Agglomeration = sequelize.define(
  "Agglomeration",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
