import React, { useState } from "react";

const InputField = ({ label, value, onChange }) => {
  return (
    <div className="mb-4">
      <div className="flex items-center">
        <div className="mr-2 block text-gray-700 text-sm font-bold mb-1">
          {label}
        </div>
        <input
          type="text"
          className="grow basis-0 text-gray-500 text-base font-normal leading-normal relative bg-white rounded border border-gray-100"
          style={{
            flexGrow: 1,
            padding: "0.5rem 0.75rem",
            border: "1px solid #d1d5db",
            borderRadius: "0.375rem",
          }}
          value={value}
          onChange={onChange}
        />
      </div>
    </div>
  );
};

const Payment = () => {
  const [cardNumber, setCardNumber] = useState("");
  const [cvv, setCvv] = useState("");
  const [cardHolder, setCardHolder] = useState("");
  const [expirationDate, setExpirationDate] = useState("");

  const handlePlaceOrder = () => {
    console.log("Pago completado");
  };

  return (
    <div>
      <div className="p-2.5 justify-start items-start gap-2.5 inline-flex">
        <div className="text-center text-black text-base font-bold leading-tight">
          Payment Methods
        </div>
      </div>
      <div className="flex-col-reverse justify-center items-end gap-4 flex">
        <InputField
          label="Card Number"
          value={cardNumber}
          onChange={(e) => setCardNumber(e.target.value)}
        />
        <InputField
          label="CVV"
          value={cvv}
          onChange={(e) => setCvv(e.target.value)}
        />
        <InputField
          label="Card Holder"
          value={cardHolder}
          onChange={(e) => setCardHolder(e.target.value)}
        />
        <InputField
          label="Expiration Date"
          value={expirationDate}
          onChange={(e) => setExpirationDate(e.target.value)}
        />
      </div>
      <div className="w-96 h-24 relative bg-white border-t border-black border-opacity-20">
        <div className="w-80 px-24 py-4 left-[8px] top-[22px] absolute bg-black rounded-lg justify-center items-center gap-2.5 inline-flex">
          {/* Botón Place Order */}
          <button
            onClick={handlePlaceOrder}
            className="text-white text-base font-medium"
          >
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default Payment;
