import { useState } from "react";
import axios from "axios";
import CardDetail from "./Cards/CardDetail";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getDetail, clearDetail } from "../redux/slices/detailSlice";
import TitleSection from "./TitleSection";
import { addItem } from "../redux/slices/cartSlice";

const Detail = () => {
  const { id } = useParams();
  const detail = useSelector((state) => state.detail.detail); // Accede a state.detail.detail
  const dispatch = useDispatch();

  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState(false);
  const fetchDetail = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get(
          `https://swiftbuy-api.up.railway.app/api/products/${id}`

        );
        const detail = json.data;
        return dispatch(getDetail(detail));
      } catch (error) {
        console.error("Error fetching detail:", error);
      }
    };
  };

  useEffect(() => {
    dispatch(fetchDetail());
    return () => {
      dispatch(clearDetail());
    };
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (selectedSize) {
      const itemToAdd = {
        id: detail.id,
        image_secure_url: detail.image_secure_url,
        inventory: detail.inventory,
        title: detail.title,
        size: selectedSize,
        unit_price: detail.price,
        description: detail.description,
        quantity: 1,
      };

      dispatch(addItem(itemToAdd));
      setSelectedSize(null);
      setError(false);
    } else {
      setError(true); // Mostrar mensaje de error si no se selecciona un tamaño
    }
  };

  const handleSizeSelection = (size) => {
    setSelectedSize(size);
    setError(false); // Ajustar el estado del error cuando se selecciona un tamaño
  };

  return (
    <div className="font-general-sans pb-[200px]">
      <div className="w-full h-[60px]">
        <TitleSection title="Detail" />
      </div>
        <div className="w-auto flex justify-center items-center pt-[50px] flex-col">
          <CardDetail
            title={detail.title}
            image_secure_url={detail.image_secure_url}
            description={detail.description}
            size={detail.size}
            setSelectedSize={handleSizeSelection}
          />
          <h2 className="mb-2 ml-[100px] text-red-500 w-[400px] h-40px">
          {error && "Please select a size."}
        </h2>
      </div>
      <div className="w-full h-[100px] fixed bottom-20 left-0 bg-white border-t border-black border-opacity-20 flex justify-around items-center">
        <div className="w-[100px] h-[50px] flex flex-col items-start justify-center">
          <span className="text-black text-opacity-60 text-[15px] font-bold">
            Price
          </span>
          <span className="text-black text-2xl font-semibold">
            {" "}
            USD {detail.price}
          </span>
        </div>
        <button
          className="w-[190px] h-[50px] bg-black rounded-[10px] justify-center items-center"
          onClick={handleAddToCart}
        >
          <div className="text-white text-base font-medium">Add to Cart</div>
        </button>
      </div>
    </div>
  );
};

export default Detail;
