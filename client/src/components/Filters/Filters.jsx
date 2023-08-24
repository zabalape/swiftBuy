import axios from "axios";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterProducts, getProducts } from "../../redux/slices/productSlice";
import Card from "../Cards/Card";
import FiltersSideBar from "./FiltersSideBar";
import Dropdown from "./Dropdown";

const Filters = () => {
  const dispatch = useDispatch();
  const allProducts = useSelector((state) => state.products.products);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);
  const [selectedOrder, setSelectedOrder] = useState("");
  const [genre, setGenre] = useState("");
  const [filters, setFilters] = useState({
    category: "",
    minPrice: 0,
    maxPrice: 0,
    selectedOrder: "",
    genre: "",
  });

  const buildFilterUrl = () => {
    let url = "http://localhost:3001/api/products/filters";

    console.log(`selectedCategory: ${selectedCategory}`);
    console.log(`minPrice: ${minPrice}`);
    console.log(`maxPrice: ${maxPrice}`);
    console.log(`selectedOrder: ${selectedOrder}`);
    console.log(`genre: ${genre}`);

    const filterParams = [];

    for (const key in filters) {
      if (filters[key] !== "" && filters[key] !== null) {
        filterParams.push(`${key}=${filters[key]}`);
      }
    }

    if (filterParams.length > 0) {
      url += "?" + filterParams.join("&");
    }

    return url;
  };

  const updateFilter = (filterName, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [filterName]: value,
    }));
  };

  const fetchProducts = () => {
    setFilters([]);
    setSelectedCategory("");
    setMinPrice(null);
    setMaxPrice(null);
    setSelectedOrder("");
    setGenre("");
    
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

  const fetchFilteredProducts = async () => {
    try {
      const url = buildFilterUrl();
      console.log(url);
      const json = await axios.get(url);
      const products = json.data;
      dispatch(filterProducts(products));
    } catch (error) {
      console.error("Error al obtener los productos:", error);
    }
  };

  const handleFilterCategory = async (category) => {
    setSelectedCategory(category);
    updateFilter("category", category);
  };

  const handleFilterPrice = async (minPrice, maxPrice) => {
    setMinPrice(minPrice);
    setMaxPrice(maxPrice);
    updateFilter("min", minPrice);
    updateFilter("max", maxPrice);
  };

  const handleFilterOrder = async (order) => {
    console.log(order);
    setSelectedOrder(order);
    updateFilter("order", order);
  };

  const handleFilterGenre = async (genre) => {
    setGenre(genre);
    updateFilter("genre", genre);
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    fetchFilteredProducts(); // Aplicar filtros cuando cambian las selecciones
  }, [selectedCategory, minPrice, maxPrice, selectedOrder, genre]);

  return (
    <div className="w-full h-auto flex flex-col">
      {/* <div className="flex items-center">
        <form action="#" method="GET" className="hidden md:block md:pl-[240px]">
          <label htmlFor="topbar-search" className="sr-only">
            Search
          </label>
          <div className="relative md:w-96">
            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              name="email"
              id="topbar-search"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
              placeholder="Search"
            />
          </div>
        </form>
      </div> */}
      <div className="w-full h-[85px] flex items-center justify-around bg-white">
        <h3 className="h-auto font-general-sans font-semibold text-[32px]">
          Discover
        </h3>
        <div className="font-general-sans flex gap-x-6 font-medium">
          <button
            className="bg-black text-white w-[80px] rounded-lg py-1 hover:bg-slate-700"
            onClick={() => dispatch(fetchProducts())}
          >
            All
          </button>
          <button
            className="bg-black text-white w-[80px] rounded-lg py-1 hover:bg-slate-700"
            value="Men"
            onClick={(event) => handleFilterGenre(event.target.value)}
          >
            Men
          </button>
          <button
            className="bg-black text-white w-[80px] rounded-lg py-1 hover:bg-slate-700"
            value="Women"
            onClick={(event) => handleFilterGenre(event.target.value)}
          >
            Women
          </button>
        </div>
        <div>
          <Dropdown handleFilterOrder={handleFilterOrder} />
        </div>
      </div>
      <div className="p-4 md:ml-64 h-full w-auto pt-2">
        <FiltersSideBar
          handleFilterCategory={handleFilterCategory}
          handleFilterPrice={handleFilterPrice}
        />
        <div className="flex justify-center w-full">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-2 md:gap-10 lg:grid-cols-3 lg:gap-10  xl:grid-cols-4 xl:gap-16 2xl:grid-cols-5 2xl:gap-x-28 2xl:gap-y-16">
            {allProducts.map((el) => (
              <Link to={`/detail/${el.id}`} key={el.id}>
                <Card
                  title={el.title}
                  image_secure_url={el.image_secure_url}
                  price={el.price}
                />
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;
