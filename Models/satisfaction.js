import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Satisfaction = sequelize.define(
  "Satisfaction",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    level: {
      type: DataTypes.STRING
    },
  },
  {
    tableName: "Satisfactions",
  }
);

export { Satisfaction };
