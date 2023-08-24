const bcryptjs = require("bcryptjs");
const db = require("../../db");

const userLogin = async (username, password, email, token) => {
  let userToLogin;

  if (email) {
    const user = await db.User.findOne({
      where: {
        email,
      },
    });
    userToLogin = user;
  } else if (username) {
    const user = await db.User.findOne({
      where: {
        username,
      },
    });
    userToLogin = user;
  }

  if (!userToLogin) throw new Error("The user isn't registered");

  if (password) {
    const validPassword = await bcryptjs.compare(
      password,
      userToLogin.password
    );

    if (!validPassword)
      throw new Error("The password or username/email/phone are incorrect");
  }

  return { token, userToLogin };
};

module.exports = userLogin;
