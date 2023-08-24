import { useState } from "react";

const PricesFilter = ({ handleFilterPrice }) => {
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(0);

  const applyFilters = () => {
    handleFilterPrice(minPrice, maxPrice);
  };

  return (
    <div className="space-y-2 font-general-sans">
      <h6 className="text-base font-semibold text-black dark:text-white">
        Prices
      </h6>
      <div className="flex items-center justify-between col-span-2 space-x-3">
        <div className="w-full">
          <label
            htmlFor="min-experience-input"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            From
          </label>

          <input
            type="number"
            id="price-from"
            value={minPrice}
            min="1"
            max="10000"
            onChange={(e) => setMinPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder=""
            required
          />
        </div>

        <div className="w-full">
          <label
            htmlFor="price-to"
            className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
          >
            To
          </label>

          <input
            type="number"
            id="max-experience-input"
            value={maxPrice}
            min="1"
            max="10000"
            onChange={(e) => setMaxPrice(e.target.value)}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
            placeholder=""
            required
          />
        </div>
      </div>
      <div className="flex justify-end">
        <button
          className="px-2 py-1 bg-black text-white rounded-md hover:bg-slate-700"
          onClick={applyFilters}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default PricesFilter;
