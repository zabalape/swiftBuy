import CardProduct from "../Cards/CardProduct";
import axios from "axios";
import { useEffect } from "react";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

const ProductsToModify = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get("http://localhost:3001/api/products");
        const products = json.data;
        return dispatch(getProducts(products));
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  return (
    <div className="flex justify-center">
      <div className="w-auto h-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5 gap-16 mb-4">
        {products
        ?.slice()
        .sort((a, b) => a.title.localeCompare(b.title))
        .map((el) => (
          <div key={el.id}>
            <Link to={`/admin/productsTomodify/${el.id}`}>
              <CardProduct title={el.title} image_secure_url={el.image_secure_url} />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductsToModify;
