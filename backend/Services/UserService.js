const User = require("../Models/User").model;

function listUsers() {
  return User.find({}).sort({ updatedAt: -1 }).select("-password");
}

function getUserByEmail(email) {
  return User.findOne({ email: email });
}

function addUser(userBody) {
  return User.create(userBody);
}

function getUserById(id) {
  return User.findById(id).select("-password");
}

function updateUser(id, reqBody) {
  return User.findByIdAndUpdate(id, { $set: reqBody }, { new: true }).select(
    "-password"
  );
}

module.exports = {
  getUserByEmail: getUserByEmail,
  addUser: addUser,
  getUserById: getUserById,
  updateUser: updateUser,
  listUsers: listUsers,
};
