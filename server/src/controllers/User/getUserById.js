const db = require("../../db");

const getUser = async (id) => {
  const user = await db.User.findByPk(id, {
    include: [
      {
        model: db.Orders,
      },
      {
        model: db.Products,
      },
    ],
  });

  if (!user) throw new Error("User not found");

  return user;
};

module.exports = getUser;
