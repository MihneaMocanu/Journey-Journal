import { DataTypes } from "sequelize";
import { sequelize } from "../sequelize.js";

const User = sequelize.define(
  "User",
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      isEmail: true,
    },
    password: {
      type: DataTypes.STRING,
      validate: {
        is: {
          args: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/i,
          msg: "Eroare"
        }
      }
    }
  },
  {
    tableName: "Users",
  }
);

export { User };
