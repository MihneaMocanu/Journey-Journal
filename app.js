import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./sequelize.js";
import { usersRouter } from "./Routes/usersRouter.js";
import { transportsByRouter } from "./Routes/trasnsportsByRouter.js";
import { satisfactionsRouter } from "./Routes/satisfactionsRouter.js";
import { agglomerationsRouter } from "./Routes/agglomerationsRouter.js";
import { experienceRouter } from "./Routes/experiencesRouter.js";
import { User } from "./Models/user.js";
import { TransportBy } from "./Models/transportBy.js";
import { Agglomeration } from "./Models/agglomeration.js";
import { Satisfaction } from "./Models/satisfaction.js";
import { Experience } from "./Models/experience.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

//Associations

// un user poate avea mai multe experiente

User.hasMany(Experience);

Experience.hasOne(Satisfaction);

Experience.hasOne(TransportBy);

Experience.hasOne(Agglomeration);

app.use("/project", usersRouter);
app.use("/project", transportsByRouter);
app.use("/project", satisfactionsRouter);
app.use("/project", agglomerationsRouter);
app.use("/project", experienceRouter);

app.listen(5001, async () => {
  console.log("Express web server running on port 5001");
  try {
    await sequelize.authenticate();
    console.log("Connection has been established!");
  } catch (err) {
    console.err("Unable to connect to the database !", err);
  }
});
