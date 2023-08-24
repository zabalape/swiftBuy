const { body } = require("express-validator");

const userValidations = [
  body("name")
    .notEmpty()
    .withMessage("*Tienes que escribir un nombre"),
  body("email")
    .notEmpty()
    .withMessage("*Escribe un correo electrónico")
    .bail()
    .isEmail()
    .withMessage("*Mail invalido"),
  body("password")
    .notEmpty()
    .withMessage("*Escribe una contraseña")
    .bail()
    .isLength({ min: 6 })
    .withMessage("Igrese una clave entre 8 y 16 caracteres"),
  body("confirmPassword")
    .notEmpty()
    .withMessage("*Confirma tu contraseña"),
  body("role")
    .notEmpty()
    .withMessage("*Tienes que asignar un rol"),
];

const productsValidations = [
    // falta el formulario de parte del front
]

module.exports = { userValidations, productsValidations };
