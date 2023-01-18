import express from "express";
import * as experiencesController from "../Controllers/experiencesController.js";

const router = express.Router();

router.get("/experiences", experiencesController.getAllExperiencesFromDB);
router.get(
  "/experiences/:experienceId",
  experiencesController.getExperienceFromDBById
);
router.get(
  "/experiences/UserId/:UserId",
  experiencesController.getUserExperciencesByUserId
);
router.post("/newExperience", experiencesController.insertExperienceIntoDB);
router.put(
  "/experiences/:experienceId",
  experiencesController.updateExperienceById
);
router.delete(
  "/experiences/:experienceId",
  experiencesController.deleteExperience
);
router.get(
  "/:experienceId/satisfactions/:satisfactionId",
  experiencesController.getSatisfactionFromExperience
);
router.get(
  "/:experienceId/agglomeration/:agglomerationId",
  experiencesController.getAgglomerationFromExperience
);
router.get(
  "/:experienceId/transportBy/:transportById",
  experiencesController.getTransportsByFromExperience
);

export { router as experienceRouter };
