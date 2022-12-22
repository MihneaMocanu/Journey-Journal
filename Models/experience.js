import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const Experience = sequelize.define(
  "Experience",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    start_adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    end_adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    start_date: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    duration_minutes: {
      type: DataTypes.FLOAT,
      allowNull: false,
    },
    share: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
  },
  {
    tableName: "Experiences",
  }
);

export { Experience };
