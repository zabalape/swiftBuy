const db = require("../../db");

const getUsers = async () => {
  const allUsers = await db.User.findAll();

  if (!allUsers.length) throw new Error("Users not found");

  return allUsers;
};

module.exports = getUsers;
