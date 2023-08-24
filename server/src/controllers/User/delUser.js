const db = require("../../db");

const deleteUser = async (id) => {
  let user = await db.User.findByPk(id);

  if (!user) throw new Error("User not found");

  if (user.isDisable) throw new Error("User is already disable");

  user.isDisable = true;

  await user.save();
};

module.exports = deleteUser;
