const bcryptjs = require("bcryptjs");
const { Op } = require("sequelize");
const db = require("../../db");
const { tokenGenerator } = require("../../middlewares/jsonWebToken");
const { JWT_SIGN } = process.env;
const { sendRegistrationEmail } = require("../../utils/email");

const signUp = async (username, email, photoURL, password, name) => {
  // const emailExist = await db.User.findAll({
  //   where: {
  //     [Op.or]: [{ username }, { email }, { phone }],
  //   },
  // });
  // if (emailExist.length) throw new Error("Email already exists");
  // console.log(emailExist.length);

  const hashPassword = password ? await bcryptjs.hash(password, 10) : null;

  const newUser = await db.User.create({
    name,
    username,
    email,
    photoURL,
    password: hashPassword,
  });

  const token = await tokenGenerator(
    {
      id: newUser.id,
      name: newUser.name,
      username: newUser.username,
      email: newUser.email,
    },
    `${JWT_SIGN}`
  );

  sendRegistrationEmail(newUser.id);

  return token;
};

module.exports = signUp;
