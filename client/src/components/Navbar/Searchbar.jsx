import { useState } from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";

const Searchbar = () => {
  const [search, setSearch] = useState("");
  const products = useSelector((state) => state.products.products);

  const searcher = (e) => {
    const searchTerm = e.target.value.toLowerCase();
    setSearch(searchTerm);
  };

  const filteredProducts = search
    ? products.filter((product) => product.title.toLowerCase().includes(search))
    : products;

  return (
    <div className="relative w-full lg:w-[303px] ml-2">
      <div className="w-full bg-zinc-100 rounded-[10px] p-2 flex items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="30"
          height="30"
          viewBox="0 0 48 48"
          className="ml-2 text-gray-600"
        >
          <path d="M 20.5 6 C 12.509634 6 6 12.50964 6 20.5 C 6 28.49036 12.509634 35 20.5 35 C 23.956359 35 27.133709 33.779044 29.628906 31.75 L 39.439453 41.560547 A 1.50015 1.50015 0 1 0 41.560547 39.439453 L 31.75 29.628906 C 33.779044 27.133709 35 23.956357 35 20.5 C 35 12.50964 28.490366 6 20.5 6 z M 20.5 9 C 26.869047 9 32 14.130957 32 20.5 C 32 23.602612 30.776198 26.405717 28.791016 28.470703 A 1.50015 1.50015 0 0 0 28.470703 28.791016 C 26.405717 30.776199 23.602614 32 20.5 32 C 14.130953 32 9 26.869043 9 20.5 C 9 14.130957 14.130953 9 20.5 9 z"></path>
        </svg>
        <input
          type="text"
          className="flex-1 bg-transparent text-gray-600 focus:outline-none px-2"
          placeholder="Search anything"
          value={search}
          onChange={searcher}
        />
      </div>
      {search && (
        <ul className="absolute z-10 w-full bg-white border border-gray-200 shadow-lg rounded-md mt-2">
          {filteredProducts.map((product) => (
            <li
              key={product.id}
              className="py-2 px-4 hover:bg-gray-100 flex items-center"
            >
              <NavLink
                to={`/detail/${product.id}`}
                className="flex items-center w-full"
              >
                <img
                  src={product.image_secure_url}
                  className="w-12 h-12 object-contain rounded"
                  alt=""
                />
                <p className="ml-4 text-gray-800 truncate w-[calc(100% - 60px)]">
                  {product.title}
                </p>
              </NavLink>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Searchbar;
