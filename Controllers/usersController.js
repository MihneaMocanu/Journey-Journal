import { User } from "../Models/user.js";

const getAllUsersFromDB = async (req, res) => {
  try {
    const users = await User.findAll();
    return res.status(200).json(users);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getUserFromDBByID = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      return res.status(200).json(user);
    } else {
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const insertUserIntoDB = async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    return res.status(200).json(newUser);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateUserById = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      const updatedUser = await User.update(req.body);
      return res.status(200).json(updatedUser);
    } else {
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const user = await User.findByPk(req.params.userId);
    if (user) {
      await user.destroy();
      return res.status(200).json("Entity deleted successfully !");
    } else {
      return res
        .status(404)
        .json({ error: `User with id ${req.params.userId} not found` });
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

export {
  getAllUsersFromDB,
  getUserFromDBByID,
  insertUserIntoDB,
  updateUserById,
  deleteUser,
};
