import { Formik, Form, Field } from "formik";
import { useState, useEffect } from "react";
import validationSchema from "./validationSchema";
import { setUser } from "../../redux/slices/userSlice";
import axios from "axios";
import GoogleProvider from "./GoogleProvider";
import { useDispatch } from "react-redux";

const Signup = () => {
  const dispatch = useDispatch();
  const [isLogin, setLogin] = useState(false);
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    password: "",
    isAdmin: false,
  });

  useEffect(() => {
    dispatch(setUser(profile));
  }, [profile]);

  const handleSignup = async (values) => {
    try {
      const response = await axios.post(
        "https://swiftbuy-api.up.railway.app/api/user/signup",
        values
      );
      console.log(response);
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setLogin(!isLogin);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSignin = async (values) => {
    const storedToken = localStorage.getItem("jwtToken");
    if (storedToken) {
      const headers = { Authorization: `Bearer ${storedToken}` };
      try {
        const response = await axios.post(
          "https://swiftbuy-api.up.railway.app/api/user/login",
          values,
          { headers }
        );
        console.log(response.data.userToLogin);
        setProfile(() => ({ ...profile, ...response.data.userToLogin }));
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("No se encontró ningún token en el Local Storage.");
    }
  };

  return (
    <div>
      {isLogin ? (
        <Formik
          initialValues={{
            email: "",
            password: "",
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignin}
        >
          {({ errors, touched }) => (
            <Form className=" -mt-40 px-4  ">
              <div className="mb-10">
                <div className="w-full  text-black text-[32px] font-semibold leading-[49px]">
                  Entra a tu cuenta
                </div>
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-base font-medium mb-1"
                >
                  Correo electrónico
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-[53px] bg-black bg-opacity-5 rounded-[10px] px-4 placeholder-gray-400 text-black text-base font-normal focus:outline-none"
                  placeholder="Ingresa tu correo electrónico"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 mt-1">{errors.email}</div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-base font-medium mb-1"
                >
                  Contraseña
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-[53px] bg-black bg-opacity-5 rounded-[10px] px-4 placeholder-gray-400 text-black text-base font-normal focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 mt-1">{errors.password}</div>
                )}
              </div>

              <button
                type="submit"
                className="w-full h-[58px] bg-black rounded-[10px] text-white text-base font-medium py-2 px-4 mb-4"
              >
                Inicia sesión
              </button>
              <GoogleProvider isLogin={isLogin} />
            </Form>
          )}
        </Formik>
      ) : (
        <Formik
          initialValues={{
            name: "",
            email: "",
            password: "",
            isAdmin: false,
          }}
          validationSchema={validationSchema}
          onSubmit={handleSignup}
        >
          {({ errors, touched }) => (
            <Form className="px-3   ">
              <div className="mb-10">
                <div className="w-full  text-black text-[32px] font-semibold leading-[49px]">
                  Crea una cuenta
                </div>
                <div className=" text-black text-opacity-60 text-base font-normal">
                  Vamos a crear tu cuenta
                </div>
              </div>
              <div className="mb-6">
                <label
                  htmlFor="name"
                  className="block text-gray-700 text-base font-medium mb-1"
                >
                  Nombre
                </label>
                <Field
                  type="text"
                  name="name"
                  className="w-full h-[53px] bg-black bg-opacity-5 rounded-[10px] px-4 placeholder-gray-400 text-black text-base font-normal focus:outline-none"
                  placeholder="Ingresa tu nombre completo"
                />
                {touched.name && errors.name && (
                  <div className="text-red-500 mt-1">{errors.name}</div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-gray-700 text-base font-medium mb-1"
                >
                  Correo electrónico
                </label>
                <Field
                  type="email"
                  name="email"
                  className="w-full h-[53px] bg-black bg-opacity-5 rounded-[10px] px-4 placeholder-gray-400 text-black text-base font-normal focus:outline-none"
                  placeholder="Ingresa tu correo electrónico"
                />
                {touched.email && errors.email && (
                  <div className="text-red-500 mt-1">{errors.email}</div>
                )}
              </div>

              <div className="mb-6">
                <label
                  htmlFor="password"
                  className="block text-gray-700 text-base font-medium mb-1"
                >
                  Contraseña
                </label>
                <Field
                  type="password"
                  name="password"
                  className="w-full h-[53px] bg-black bg-opacity-5 rounded-[10px] px-4 placeholder-gray-400 text-black text-base font-normal focus:outline-none"
                  placeholder="Ingresa tu contraseña"
                />
                {touched.password && errors.password && (
                  <div className="text-red-500 mt-1">{errors.password}</div>
                )}
              </div>

              <div className="mb-8 flex justify-between ">
                <label
                  htmlFor="isAdmin"
                  className="text-gray-700 text-base font-medium"
                >
                  Quiero vender en esta plataforma
                </label>
                <Field type="checkbox" name="isAdmin" />
              </div>

              <button
                type="submit"
                className="w-full h-[58px] bg-black rounded-[10px] text-white text-base font-medium py-2 px-4 mb-4"
              >
                Registrarse
              </button>
              <GoogleProvider isLogin={isLogin} setLogin={setLogin} />
              <div className="text-black text-opacity-60 text-sm font-normal text-center ">
                ¿Ya eres miembro?{" "}
                <span onClick={setLogin} className="font-medium underline">
                  Inicia sesión
                </span>
              </div>
            </Form>
          )}
        </Formik>
      )}
    </div>
  );
};

export default Signup;
