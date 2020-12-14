const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true },
});

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
