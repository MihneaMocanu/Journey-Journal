import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";

const TransportBy = sequelize.define(
  "TransportBy",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
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
