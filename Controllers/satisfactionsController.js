import { Satisfaction } from "../Models/satisfaction.js";

const getAllSatisfactionsFromDB = async (req, res) => {
  try {
    const satisfactions = await Satisfaction.findAll();
    return res.status(200).json(satisfactions);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getSatisfactionFromDBByID = async (req, res) => {
  try {
    const satisfaction = await Satisfaction.findByPk(req.params.satisfactionId);
    if (satisfaction) {
      return res.status(200).json(satisfaction);
    } else {
      return res.status(404).json({
        error: `Satisfaction with id ${req.params.satisfactionId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertSatisfactionIntoDB = async (req, res) => {
  try {
    const newSatisfaction = await Satisfaction.create(req.body);
    return res.status(200).json(newSatisfaction);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateSatisfactionById = async (req, res) => {
  try {
    const satisfaction = await Satisfaction.findByPk(req.params.satisfactionId);
    if (satisfaction) {
      const updatedSatisfaction = await Satisfaction.update(req.body);
      return res.status(200).json(updatedSatisfaction);
    } else {
      return res.status(404).json({
        error: `Satisfaction with id ${req.params.satisfactionId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteSatisfaction = async (req, res) => {
  try {
    const deletedSatisfaction = await Satisfaction.findByPk(
      req.params.satisfactionId
    );
    if (deletedSatisfaction) {
      await deletedSatisfaction.destroy();
      return res.status(200).json("Enitity deleted successfully!");
    } else {
      res.status(404).json({
        error: `Satisfaction with id ${req.params.satisfactionId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getAllSatisfactionsFromDB,
  getSatisfactionFromDBByID,
  insertSatisfactionIntoDB,
  updateSatisfactionById,
  deleteSatisfaction,
};
