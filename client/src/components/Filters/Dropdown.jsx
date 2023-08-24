import { useState } from "react";

const Dropdown = ( {handleFilterOrder}) => {
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const [selectedRadio, setSelectedRadio] = useState(null);

  const handleRadioChange = (value) => {
    setSelectedRadio(value);
    handleFilterOrder(value);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="font-general-sans">
      <button
        id="dropdownBgHoverButton"
        onClick={toggleDropdown}
        data-dropdown-toggle="dropdownBgHover"
        className="text-white bg-black hover:bg-slate-700 focus:ring-none focus:outline-none focus:ring-none font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
        type="button"
      >
        Order{" "}
        <svg
          className="w-2.5 h-2.5 ml-2.5"
          aria-hidden="true"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 10 6"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="m1 1 4 4 4-4"
          />
        </svg>
      </button>

      <div
        id="dropdownBgHover"
        className={`${
          isDropdownOpen ? "block" : "hidden"
        } absolute z-10 mt-2 w-48 bg-white rounded-lg shadow dark:bg-gray-700`}
      >
        <ul
          className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
          aria-labelledby="dropdownBgHoverButton"
        >
          <li>
            <div
              className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selectedRadio === "A-Z" ? "bg-blue-100" : ""
              }`}
            >
              <input
                id="A-Z"
                type="radio"
                value="A-Z"
                name="radio-group"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                checked={selectedRadio === "A-Z"}
                onChange={() => handleRadioChange("A-Z")}
              />
              <label
                htmlFor="A-Z"
                className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                A-Z
              </label>
            </div>
          </li>
          <li>
          <div
              className={`flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600 ${
                selectedRadio === "Z-A" ? "bg-blue-100" : ""
              }`}
            >
              <input
                id="Z-A"
                type="radio"
                value="Z-A"
                className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-700 dark:focus:ring-offset-gray-700 focus:ring-2 dark:bg-gray-600 dark:border-gray-500"
                checked={selectedRadio === "Z-A"}
                onChange={() => handleRadioChange("Z-A")}
              />
              <label
                htmlFor="Z-A"
                className="w-full ml-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
              >
                Z-A
              </label>
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};
export default Dropdown;
