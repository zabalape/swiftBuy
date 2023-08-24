import PricesFilter from "./PricesFilter";
import RatingFilter from "./RatingFilter";

const FiltersSideBar = ({ handleFilterCategory, handleFilterPrice }) => {
  return (
    <div
      className="fixed left-0 z-40 w-64 h-screen transition-transform -translate-x-full bg-white border-r border-gray-200 md:translate-x-0 dark:bg-gray-800 dark:border-gray-500"
      aria-label="Sidenav"
      id="drawer-navigation"
    >
      <div className="overflow-y-auto py-5 px-3 h-full bg-white dark:bg-neutral-950 flex flex-col items-start gap-y-6">
        <h2 className="font-general-sans font-bold text-xl">Categories</h2>
        <ul className="font-general-sans font-medium h-[300px] flex flex-col justify-around text-start">
          <li>
            <button
              className="ml-3"
              value="Hoodies"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Hoodies
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="Crewnecks"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Crewnecks
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="Jackets"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Jackets
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="T-Shirts"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              T-Shirts
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="Beanies/Hats"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Beanies/Hats
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="Pants"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Pants
            </button>
          </li>
          <li>
            <button
              className="ml-3"
              value="Shoes"
              onClick={(event) => {
                handleFilterCategory(event.target.value);
              }}
            >
              Shoes
            </button>
          </li>
        </ul>
        <div className="w-full h-1 border-t-[1px] border-black"></div>
        <div className="w-full">
          <RatingFilter/>
        </div>
        <div className="w-full">
        <PricesFilter handleFilterPrice={handleFilterPrice} />
        </div>
        
      </div>
    </div>
  );
};

export default FiltersSideBar;
