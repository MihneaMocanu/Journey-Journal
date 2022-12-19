import express from "express";
import * as usersController from "../Controllers/usersController.js";

const router = express.Router();

router.get("/users", usersController.getAllUsersFromDB);
router.get("/users/:userId", usersController.getUserFromDBByID);
router.post("/newUser", usersController.insertUserIntoDB);
router.put("/users/:userId", usersController.updateUserById);
router.delete("/users/:userId", usersController.deleteUser);

export { router as usersRouter };
