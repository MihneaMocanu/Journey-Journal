import { sequelize } from "../sequelize.js";
import { DataTypes } from "sequelize";
import { User } from "./user.js";
import { Satisfaction } from "./satisfaction.js";
import { TransportBy } from "./transportBy.js";
import { Agglomeration } from "./agglomeration.js";

const Experience = sequelize.define(
  "Experience",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    adress: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    date_hour: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    observation: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    time: {
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

//Associations
User.hasOne(Experience);
Experience.belongsTo(User);
Satisfaction.hasOne(Experience);
Experience.belongsTo(Satisfaction);
TransportBy.hasOne(Experience);
Experience.belongsTo(TransportBy);
Agglomeration.hasOne(Experience);
Experience.belongsTo(Agglomeration);

export { Experience };
