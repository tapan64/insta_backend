const express = require("express");
const UserModel = require("../models/UserModel");
const router = express.Router();

// find user by id.
const findUserById = async (req) => {
  const id = req.params.id;
  const user = await UserModel.findById(id);
  return user;
};

// create a new user.
router.post("/", async (req, res) => {
  const newUser = new UserModel({
    name: req.body.name,
    email: req.body.email,
  });
  try {
    await newUser.save();
    res.status(201).json(newUser);
  } catch (error) {
    res.status(400).json(error.message);
  }
});

// get all the users.
router.get("/", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// get one user by id.
router.get("/:id", async (req, res) => {
  try {
    const user = await findUserById(req);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// delete one user by id.
router.delete("/:id", async (req, res) => {
  const user = await findUserById(req);
  try {
    await user.delete();
    res.status(200).json("User Deleted");
  } catch (error) {
    res.status(500).json(error.message);
  }
});

// update one user by id.
router.patch("/:id", async (req, res) => {
  const user = await findUserById(req);
  if (req.body.name != null) user.name = req.body.name;
  if (req.body.email != null) user.email = req.body.email;
  try {
    const updatedUser = await user.save();
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error.message);
  }
});

module.exports = router;
