import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, setQuantity } from "../../../redux/slices/cartSlice";

const ProductCard = ({ product }) => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);
  const cartItem = cartItems.find((item) => item.id === product.id);

  const [isHovered, setIsHovered] = useState(false);
  const [isExpanded, setIsExpanded] = useState(false);

  const adjustQuantity = (act) => {
    if (act === "+" && cartItem) {
      dispatch(setQuantity({ id: product.id, act: "+" }));
    } else if (act === "-" && cartItem && cartItem.quantity > 1) {
      dispatch(setQuantity({ id: product.id, act: "-" }));
    } else {
      dispatch(removeItem(product.id));
    }
  };

  const handleImageClick = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <div
      className={`relative w-80 h-auto p-2 mt-6 mb-6 bg-white rounded-2xl shadow-2x1 ${
        isHovered ? "hover:scale-105" : ""
      }`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className="w-full h-40 lg:h-60 overflow-hidden relative rounded-md cursor-pointer"
        onClick={handleImageClick}
      >
        <img className={`w-full h-auto`} src={product.image_secure_url} alt="Product" />
      </div>
      <div className="h-30 flex-col justify-start items-start gap-2 mt-2">
        <div className="text-sky-900 text-xs font-medium leading-snug">
          {product.title}
        </div>
        <div className="text-black text-xs font-bold leading-snug">
          {product.size}
        </div>
        <div className="text-red-500 text-base font-bold leading-tight">
          $ {product.unit_price}
        </div>
        <div className="h-10" />
      </div>
      <div className="absolute bottom-0 left-0 w-full p-2 rounded-b-2xl bg-black">
        <div className="flex justify-center items-center gap-4">
          <button
            className="w-8 h-6 bg-white text-black rounded-xl flex justify-center items-center"
            onClick={() => adjustQuantity("-")}
          >
            -
          </button>
          <div className="text-white font-bold">{product.quantity}</div>
          <button
            className="w-8 h-6 bg-white text-black rounded-xl flex justify-center items-center"
            onClick={() => adjustQuantity("+")}
          >
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
