import { TransportBy } from "../Models/transportBy.js";

const getAllTransportsByFromDB = async (req, res) => {
  try {
    const transports = await TransportBy.findAll();
    return res.status(200).json(transports);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getTransportsByFromDBByID = async (req, res) => {
  try {
    const transportBy = await TransportBy.findByPk(req.params.transportById);
    if (transportBy) {
      return res.status(200).json(transportBy);
    } else {
      return res.status(404).json({
        error: `TransportBy with id ${req.params.transportById} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertTransportByIntoDB = async (req, res) => {
  try {
    const newTransportBy = await TransportBy.create(req.body);
    return res.status(200).json(newTransportBy);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateTransportById = async (req, res) => {
  try {
    const transportBy = await TransportBy.findByPk(req.params.transportById);
    if (transportBy) {
      const updatedTransportBy = await TransportBy.update(req.body);
      return res.status(200).json(updatedTransportBy);
    } else {
      return res.status(404).json({
        error: `TransportBy with id ${req.params.transportById} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteTransportBy = async (req, res) => {
  try {
    const transportBy = await TransportBy.findByPk(req.params.transportById);
    if (transportBy) {
      await transportBy.destroy();
      return res.status(200).json("Entity deleted successfully");
    } else {
      return res.status(404).json({
        error: `TransportBy with id ${req.params.transportById} not found`,
      });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getAllTransportsByFromDB,
  getTransportsByFromDBByID,
  insertTransportByIntoDB,
  deleteTransportBy,
  updateTransportById,
};
