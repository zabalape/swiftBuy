import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { updateShippingInfo } from "../../../redux/slices/cartSlice";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

const ShippingDetail = () => {
  const dispatch = useDispatch();
  const shippingInfo = useSelector((state) => state.cart.shippingInfo);
  const [showEditForm, setShowEditForm] = useState(false);
  const [submittedShippingInfo, setSubmittedShippingInfo] = useState({});
  const shippingAttributes = [
    {
      name: "local_pickup",
      label: "Branch office pickup preference",
      type: "checkbox",
    },
    { name: "zip_code", label: "Zip Code", type: "text" },
    { name: "street_name", label: "Street", type: "text" },
    { name: "city_name", label: "City", type: "text" },
    { name: "state_name", label: "State", type: "text" },
    { name: "street_number", label: "Number", type: "number" },
    { name: "floor", label: "Floor", type: "text" },
    { name: "apartment", label: "apartament", type: "text" },
  ];
  const validationSchema = Yup.object().shape({
    zip_code: Yup.string().required("El código postal es requerido"),
    street_name: Yup.string().required("La calle es requerida"),
    city_name: Yup.string().required("La ciudad es requerida"),
    state_name: Yup.string().required("El estado es requerido"),
    street_number: Yup.number().required("El número de calle es requerido"),
  });
  const initialValues = shippingAttributes.reduce((acc, attr) => {
    acc[attr.name] = shippingInfo?.[attr.name] || "";
    return acc;
  }, {});

  const handleSubmit = (values) => {
    const formattedShippingInfo = shippingAttributes.map(
      (attr) =>
        attr.name !== "local_pickup" && `${attr.label}: ${values[attr.name]}`
    );
    setSubmittedShippingInfo(formattedShippingInfo);
    dispatch(updateShippingInfo(values));
    setShowEditForm(false);
  };

  return (
    <div className="w-5/7 p-2.5 rounded-2xl shadow justify-center bg-white items-center gap-4">
      <div className="h-10 flex px-4 py-5 justify-center items-center gap-2.5 inline-flex">
        <div className="text-center w-full items-center flex text-black text-base font-bold ml-10  leading-tight">
          Shipping Detail:
        </div>
      </div>
      <div className="px-4 flex-col justify-center items-center gap-1">
        {submittedShippingInfo &&
          Object.entries(submittedShippingInfo).map(([attrName, attrValue]) => (
            <div key={attrName}>{attrValue}</div>
          ))}
      </div>
      <button
        className="p-2 bg-black text-white rounded mt-4  ml-[80%]"
        onClick={() => setShowEditForm(true)}
      >
        Edit
      </button>
      {showEditForm && (
        <Formik
          initialValues={initialValues}
          onSubmit={handleSubmit}
          validationSchema={validationSchema}
        >
          <Form className="flex justify-between items-start ml-10 flex-col">
            {shippingAttributes.map((attr) => (
              <div key={attr.name} className="flex mb-4 gap-2">
                <label className="block text-gray-700 font-semibold">
                  {attr.label}:
                </label>
                {attr.type === "checkbox" ? (
                  <Field type="checkbox" name={attr.name} />
                ) : (
                  <div>
                    <Field
                      type="text"
                      name={attr.name}
                      className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:border-blue-500 gap-2"
                    />
                    <ErrorMessage
                      name={attr.name}
                      component="div"
                      className="text-red-500"
                    />
                  </div>
                )}
              </div>
            ))}
            <div className="w-full mb-6 mt-4 items-end">
              <button
                type="submit"
                className="p-2 bg-black text-white rounded mt-2"
              >
                Save changes
              </button>
              <button
                type="button"
                className="p-2 bg-red-400 text-white rounded mt-2 ml-2"
                onClick={() => setShowEditForm(false)}
              >
                Cancel
              </button>
            </div>
          </Form>
        </Formik>
      )}
    </div>
  );
};

export default ShippingDetail;
