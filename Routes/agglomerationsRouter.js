import express from "express";
import * as agglomerationsController from "../Controllers/agglomerationsController.js";

const router = express.Router();

router.get(
  "/agglomerations",
  agglomerationsController.getAllAgglomerationFromDB
);
router.get(
  "/agglomerations/:agglomerationId",
  agglomerationsController.getAgglomerationFromBDByID
);
router.post(
  "/newAgglomeration",
  agglomerationsController.insertAgglomerationIntoDB
);
router.put(
  "/agglomerations/:agglomerationId",
  agglomerationsController.updateAgglomerationById
);
router.delete(
  "/agglomerations/:agglomerationId",
  agglomerationsController.deleteAgglomeration
);

export { router as agglomerationsRouter };
