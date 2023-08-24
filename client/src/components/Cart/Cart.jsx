import { useState } from "react";
import Title from "../Title";
import ProductCard from "./Product Card/ProductCard";
import ShippingDetail from "./ShippingDetail/ShippingDetail";
import Summary from "./Summary/Summary";
import { useSelector } from "react-redux";
import WalletPayment from "./Payment/WalletBrick";
import { initMercadoPago } from "@mercadopago/sdk-react";

const token = import.meta.env.VITE_PUBLIC_KEY;
initMercadoPago(typeof token === "string" && token);

const Cart = () => {
  const cart = useSelector((state) => state.cart.items);
  const [showPaymentMethods, setShowPaymentMethods] = useState(false);
  const [clickedBuyButton, setClickedBuyButton] = useState(false);

  const handleBuyClick = () => {
    if (cart) {
      setShowPaymentMethods(true);
      setClickedBuyButton(true);
    } else {
      // Mostrar un mensaje o notificación indicando que no hay items en el carrito
    }
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="bg-white shadow">
        <div className="mx-auto py-4 px-6">
          <Title title={"My Cart"} onBack={"/"} />
        </div>
      </div>
      <div className="">
        <div className="mt-6 md:mt-0 md:ml-4 sm:flex-col lg:flex">
          <div className="w-full mx-auto grid grid-cols-1 gap-2 lg:grid-cols-2 xl:grid-cols-4 md:ml-4">
            {cart &&
              cart.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
          </div>
          <div className="mt-6 md:mt-0 md:ml-4 sm:flex sm:flex-col lg:flex-row gap-4">
            <div className="w-full md:w-1/2 lg:w-1/2">
              {/* Contenido del primer componente */}
              <div className="md:w-full lg:h-1/2 p-4">
                <ShippingDetail />
              </div>
            </div>

            <div className="w-full md:w-1/2 lg:w-1/2">
              {/* Contenido del segundo componente */}
              <div className="md:w-full lg:h-1/2 p-4 items-start">
                <Summary className="mb-20" />
                <div className="mt-6 md:mt-2 md:ml-4">
                  {showPaymentMethods && (
                    <div className="md:flex md:gap-4 flex flex-col flex-end ml-auto">
                      {/* Contenido del tercer componente */}
                      <div className="md:w-auto lg:w-auto mx-auto my-auto align-center bg-white p-4 rounded shadow-md">
                        <WalletPayment />
                      </div>
                    </div>
                  )}
                  {/* Botón "Buy" */}
                  <div className="flex mt-4 items-end">
                    {cart.length > 0 && !clickedBuyButton && (
                      <button
                        className="w-40 px-4 py-2 ml-auto bg-black text-white rounded"
                        onClick={handleBuyClick}
                      >
                        Buy
                      </button>
                    )}
                    {cart.length === 0 && (
                      <div className="bg-gray-100 p-4 justify-center items-center rounded-md mt-6 md:mt-0 md:ml-4 sm:flex sm:flex-col">
                        <p>No items in the cart. Add products to buy!</p>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div style={{ height: "100px" }} />
    </div>
  );
};

export default Cart;
