import React from "react";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import axios from "axios";

const EditInfoForm = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const userId = user.id;

  const formik = useFormik({
    initialValues: {
      username: user.username,
      name: user.name,
      email: user.email,
      image_secure_url: null,
    },
    onSubmit: async (values) => {
      try {
        await axios.put(
          `https://swiftbuy-api.up.railway.app/api/user/${userId}`,
          values
        );
        dispatch(setUser({ ...user, ...values }));
        alert("Información actualizada con éxito");
      } catch (error) {
        console.error("Error al actualizar información:", error);
        alert("Ocurrió un error al actualizar la información");
      }
    },
  });

  const handleImageChange = (event) => {
    formik.setFieldValue("image_secure_url", event.currentTarget.files[0]);
  };

  return (
    <form onSubmit={formik.handleSubmit} className="p-6 bg-white rounded">
      <div className="mb-4">
        <label
          htmlFor="username"
          className="block text-sm font-medium text-gray-600"
        >
          Username
        </label>
        <input
          type="text"
          id="username"
          name="username"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.username}
          className="mt-1 p-2 w-full border focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="name"
          className="block text-sm font-medium text-gray-600"
        >
          Name
        </label>
        <input
          type="text"
          id="name"
          name="name"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          className="mt-1 p-2 w-full border focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="email"
          className="block text-sm font-medium text-gray-600"
        >
          Email
        </label>
        <input
          type="email"
          id="email"
          name="email"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          className="mt-1 p-2 w-full border focus:ring focus:ring-blue-200"
        />
      </div>
      <div className="mb-4">
        <label
          htmlFor="image_secure_url"
          className="block text-sm font-medium text-gray-600"
        >
          Profile image
        </label>
        <input
          type="file"
          id="image_secure_url"
          name="image_secure_url"
          onChange={handleImageChange}
          className="mt-1"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
      >
        Save
      </button>
    </form>
  );
};

export default EditInfoForm;
