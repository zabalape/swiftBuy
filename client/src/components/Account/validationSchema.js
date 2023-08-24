import * as Yup from "yup";

const validationSchema = Yup.object().shape({
  name: Yup.string()
    .min(2, "El nombre debe ser de al menos dos caracteres")
    .required("Campo obligatorio"),
  email: Yup.string()
    .email("Correo electrónico no válido")
    .required("Campo obligatorio"),
  password: Yup.string()
    .min(6, "La contraseña debe tener al menos 6 caracteres")
    .required("Campo obligatorio"),
});

export default validationSchema;
