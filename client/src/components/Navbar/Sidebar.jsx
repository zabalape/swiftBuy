import { useState } from "react";
import { Link } from "react-router-dom";
import Searchbar from "./Searchbar";

function Sidebar() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className={`bg-gray-100 ${isSidebarOpen ? "overflow-hidden" : ""}`}>
      <nav className="bg-white p-4 ">
        <div className="flex items-center justify-between">
          <button
            onClick={toggleSidebar}
            className=" text-gray-600 hover:text-gray-800"
          >
            {isSidebarOpen ? (
              <svg
                className="w-6 h-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M6 18L18 6M6 6l12 12"></path>
              </svg>
            ) : (
              <svg
                className="w-8 h-8"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M4 6h16M4 12h16M4 18h16"></path>
              </svg>
            )}
          </button>
          <Searchbar />
        </div>
      </nav>

      <aside
        className={`fixed top-0 left-0 h-full w-80 bg-zinc-100 shadow transform ${
          isSidebarOpen ? "" : "-translate-x-full"
        }  transition-transform duration-300 ease-in-out`}
        style={{ zIndex: isSidebarOpen ? "10" : "-1" }}
      >
        <div className="mt-3 p-4 flex justify-between items-center">
          <button
            onClick={toggleSidebar}
            className="text-gray-600 hover:text-gray-800"
          >
            <svg
              className="w-9 h-9"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>

          <div></div>
        </div>
        <ul className="py-6 px-6 space-y-2 ml-8">
          <li>
            <Link to="/" className="text-black text-xl font-normal block mb-6">
              INICIO
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className="text-black text-xl font-normal block mb-6"
            >
              PRODUCTOS
            </Link>
          </li>
          <li>
            <Link
              to="/categories"
              className="text-black text-xl font-normal block mb-6"
            >
              CATEORÍAS
            </Link>
          </li>
          <li>
            <Link
              to="/cart"
              className="text-black text-xl font-normal block mb-6"
            >
              CARRITO
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className="text-black text-xl font-normal block mb-6"
            >
              CONTACTO
            </Link>
          </li>
        </ul>
      </aside>
    </div>
  );
}

export default Sidebar;
