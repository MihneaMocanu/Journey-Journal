import express from "express";
import * as satisfactionsController from "../Controllers/satisfactionsController.js";

const router = express.Router();

router.get("/satisfactions", satisfactionsController.getAllSatisfactionsFromDB);
router.get(
  "/satisfactions/:satisfactionId",
  satisfactionsController.getSatisfactionFromDBByID
);
router.post(
  "/newSatisfaction",
  satisfactionsController.insertSatisfactionIntoDB
);
router.put(
  "/satisfactions/:satisfactionId",
  satisfactionsController.updateSatisfactionById
);
router.delete(
  "/satisfactions/:satisfactionId",
  satisfactionsController.deleteSatisfaction
);

export { router as satisfactionsRouter };
