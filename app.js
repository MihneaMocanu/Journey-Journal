import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { sequelize } from "./sequelize.js";
import { usersRouter } from "./Routes/usersRouter.js";
import { transportsByRouter } from "./Routes/trasnsportsByRouter.js";
import { satisfactionsRouter } from "./Routes/satisfactionsRouter.js";
import { agglomerationsRouter } from "./Routes/agglomerationsRouter.js";
import { experienceRouter } from "./Routes/experiencesRouter.js";

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(cors());

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
