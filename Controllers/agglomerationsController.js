import { Agglomeration } from "../Models/agglomeration.js";

const getAllAgglomerationFromDB = async (req, res) => {
  try {
    const agglomerations = await Agglomeration.findAll();
    return res.status(200).json(agglomerations);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getAgglomerationFromBDByID = async (req, res) => {
  try {
    const agglomeration = await Agglomeration.findByPk(
      req.params.agglomerationId
    );
    if (agglomeration) {
      return res.status(200).json(agglomeration);
    } else {
      return res.status(404).json({
        error: `Agglomeration with id ${req.params.agglomerationId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertAgglomerationIntoDB = async (req, res) => {
  try {
    const newAgglomeration = await Agglomeration.create(req.body);
    return res.status(200).json(newAgglomeration);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateAgglomerationById = async (req, res) => {
  try {
    const agglomeration = await Agglomeration.findByPk(
      req.params.agglomerationId
    );
    if (agglomeration) {
      const updatedAgglomeration = await agglomeration.update(req.body);
      return res.status(200).json(updatedAgglomeration);
    } else {
      return res.status(404).json({
        error: `Agglomeration with id ${req.params.agglomerationId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteAgglomeration = async (req, res) => {
  try {
    const agglomeration = await Agglomeration.findByPk(
      req.params.agglomerationId
    );
    if (agglomeration) {
      await agglomeration.destroy();
      return res.status(200).json("Entity deleted successfully !");
    } else {
      return res.status(404).json({
        error: `Agglomeration with id ${req.params.agglomerationId} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getAllAgglomerationFromDB,
  getAgglomerationFromBDByID,
  insertAgglomerationIntoDB,
  updateAgglomerationById,
  deleteAgglomeration,
};
