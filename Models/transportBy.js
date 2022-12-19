import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const TransportBy = sequelize.define(
  "TransportBy",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    vehicleType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    tableName: "TransportsBy",
  }
);

export { TransportBy };
