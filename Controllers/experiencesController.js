import { Agglomeration } from "../Models/agglomeration.js";
import { Experience } from "../Models/experience.js";
import { Satisfaction } from "../Models/satisfaction.js";

const getAllExperiencesFromDB = async (req, res) => {
  try {
    const experiences = await Experience.findAll();
    return res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserExperciencesByUserId = async (req, res) => {
  try {
    const experiences = await Experience.findAll({
      where: { UserId: req.params.UserId },
    });
    return res.status(200).json(experiences);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getExperienceFromDBById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.experienceId);
    if (experience) {
      return res.status(200).json(experience);
    } else {
      return res.status(404).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    req.status(500).json(err);
  }
};

const getSatisfactionFromExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.experienceId);
    if (experience) {
      if (experience.SatisfactionId === req.params.satisfactionId) {
        const satisfaction = await Satisfaction.findOne({
          where: { id: req.params.satisfactionId },
        });
        if (satisfaction) {
          res.status(200).json(satisfaction);
        }
      }
      res.status(404);
    } else {
      return res.status(404).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAgglomerationFromExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.experienceId);
    if (experience) {
      if (experience.AgglomerationId === req.params.agglomerationId) {
        const agglomeration = await Agglomeration.findOne({
          where: { id: req.params.agglomerationId },
        });
        if (agglomeration) {
          res.status(200).json(agglomeration);
        }
      }
      res.status(404);
    } else {
      return res.status(404).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTransportsByFromExperience = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.experienceId);
    if (experience) {
      if (experience.TransportById === req.params.transportById) {
        const transportBy = await Experience.findOne({
          where: { id: req.params.transportById },
        });
        if (transportBy) {
          res.status(200).json(transportBy);
        }
      }
      res.status(404);
    } else {
      return res.status(404).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertExperienceIntoDB = async (req, res) => {
  try {
    const experience = await Experience.create(req.body);
    return res.status(200).json(experience);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateExperienceById = async (req, res) => {
  try {
    const experience = await Experience.findByPk(req.params.experienceId);
    if (experience) {
      const updatedExperience = await experience.update(req.body);
      return res.status(200).json(updatedExperience);
    } else {
      return res.status(404).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteExperience = async (req, res) => {
  try {
    const deletedExperience = await Experience.findByPk(
      req.params.experienceId
    );
    if (deletedExperience) {
      await deletedExperience.destroy();
      return res.status(200).json({
        error: `Experience with id ${req.params.experienceId} not found !`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getAllExperiencesFromDB,
  getExperienceFromDBById,
  insertExperienceIntoDB,
  updateExperienceById,
  deleteExperience,
  getUserExperciencesByUserId,
  getSatisfactionFromExperience,
};
