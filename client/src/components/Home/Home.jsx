import axios from "axios";
import { useEffect } from "react";
import { getProducts } from "../../redux/slices/productSlice";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import "react-multi-carousel/lib/styles.css";
import HeroDiv from "./HeroDiv";
import Card from "../Cards/Card";
import Carousel from "react-multi-carousel";
import Categories from "./Categories";
import Footer from "../Footer";
// import Menu from "../Menu";
// import SearchBar from "../SearchBar/Searchbar";
const responsive = {
  desktop: {
    breakpoint: { max: 1920, min: 620 },
    items: 7,
  },
  tablet: {
    breakpoint: { max: 620, min: 428 },
    items: 4,
  },
  mobile: {
    breakpoint: { max: 428, min: 0 },
    items: 2,
  },
};
const Home = () => {
  const products = useSelector((state) => state.products.products);
  const dispatch = useDispatch();

  const fetchProducts = () => {
    return async function (dispatch) {
      try {
        const json = await axios.get(
          "https://swiftbuy-api.up.railway.app/api/products"
        );
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

  const topProducts = products.slice(0, 14);

  return (
    <div className="inline-block font-general-sans h-auto w-full pb-[100px] flex-col justify-center">
      {/* <SearchBar />
      <Menu /> */}
      <HeroDiv />
      <div className="bg-black w-auto h-[134px] relative flex justify-center items-center">
        <div className="w-auto px-2 absolute flex flex-row gap-[15px]">
          <div>
            <img
              className="w-[59px] h-10 relative"
              alt="Fa solid shipping"
              src="https://generation-sessions.s3.amazonaws.com/9adf83e9eecada6d452151f68bdff251/img/fa-solid-shipping-fast.svg"
            />
          </div>
          <div className="inline-block h-[43px] relative">
            <div className="text-white text-base font-semibold">
              Free Shipping
            </div>
            <div className="text-white text-xs font-medium">
              On purchases over $100
            </div>
          </div>
        </div>
      </div>
      <div className="w-auto h-[100px] relative flex justify-center items-center">
        <h2 className="w-auto absolute text-center text-black text-2xl font-bold leading-[49px]">
          Tops
        </h2>
      </div>
      <Carousel responsive={responsive}>
        {topProducts.map((el) => (
          <div key={el.id} className="w-300px">
            <Link to={`/detail/${el.id}`} className="w-auto">
              <Card title={el.title} image_secure_url={el.image_secure_url} price={el.price} />
            </Link>
          </div>
        ))}
      </Carousel>
      <div className="w-auto h-[100px] relative flex justify-center items-center">
        <h2 className="w-auto flex-shrink absolute text-center text-black text-2xl font-bold leading-[49px]">
          Categories
        </h2>
      </div>
      <div className="w-auto flex justify-center">
        <Categories />
      </div>
      <div className="w-auto h-[100px] relative flex justify-center items-center">
        <h2 className="w-auto flex-shrink absolute text-center text-black text-2xl font-bold leading-[49px]">
          Offers
        </h2>
      </div>
      <Carousel responsive={responsive}>
        {topProducts.map((el) => (
          <div key={el.id} className="w-300px">
            <Link to={`/detail/${el.id}`} className="w-auto">
              <Card title={el.title} image_secure_url={el.image_secure_url} price={el.price} />
            </Link>
          </div>
        ))}
      </Carousel>
      <Footer />
    </div>
  );
};
export default Home;
