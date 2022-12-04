import express from "express";
import * as transportsByController from "../Controllers/transportsbyController.js";

const router = express.Router();

router.get("/transportsBy", transportsByController.getAllTransportsByFromDB);
router.get(
  "/transportsBy/:transportById",
  transportsByController.getTransportsByFromDBByID
);
router.post("/newTransportBy", transportsByController.insertTransportByIntoDB);
router.put(
  "/transportsBy/:transportById",
  transportsByController.updateTransportById
);
router.delete(
  "/transportsBy/:transportById",
  transportsByController.deleteTransportBy
);

export { router as transportsByRouter };
