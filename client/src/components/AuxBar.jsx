import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { switchSelector } from "../redux/slices/appBarSlice";
import { useDispatch } from "react-redux";

const AuxBar = ({ theme }) => {
  const dispatch = useDispatch();
  const location = useLocation();
  const currentPath = location.pathname;

  const selected = (select) => {
    dispatch(switchSelector(select));
  };


    return (  
      <div className={`font-general-sans w-full h-[80px] justify-around items-center inline-flex ${theme === "dark" ? 'dark:bg-neutral-950 border-t border-white border-opacity-20' : 'bg-white border-t border-black border-opacity-20'}`}>
          <Link to={"/"} onClick={() => selected('/')}/>
      <div className="w-full h-[80px] border-t border-black border-opacity-20 justify-around items-center inline-flex">
          <Link to={currentPath === "/" ? "/" : "/"} onClick={() => selected('/')}>
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="Home line"
              src={
                theme === "dark" && currentPath === "/"
                  ? "https://i.postimg.cc/hv6R4MtH/Active-Home.png"
                  : theme === "dark"
                  ? "https://i.postimg.cc/wjYnW1yc/Inactive-Home-Dark-Mode.png"
                  : theme !== "dark" && currentPath === "/"
                  ? "https://i.postimg.cc/hv6R4MtH/Active-Home.png"
                  : "https://i.postimg.cc/52gsD1nr/Inactive-Home-Light-Mode.png"
              }
              className="w-6 h-auto"
            />
            <div
              className={` text-xs font-medium ${
                theme === "dark" && currentPath === "/"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-300"
                  : theme !== "dark" && currentPath === "/"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Home
            </div>
          </div>
        </Link>
        <Link to="/favorites">
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="Saved"
              src={
                theme === "dark" && currentPath === "/favorites"
                  ? "https://i.postimg.cc/V6dZjT9V/Active-Heart.png"
                  : theme === "dark"
                  ? "https://i.postimg.cc/FsjWg0cN/Inactive-Heart-Dark-Mode.png"
                  : theme !== "dark" && currentPath === "/favorites"
                  ? "https://i.postimg.cc/V6dZjT9V/Active-Heart.png"
                  : "https://i.postimg.cc/vHR2V040/Inactive-Heart-Light-Mode.png"
              }
              className="w-6 h-auto"
            />
            <div
              className={`text-xs font-medium ${
                theme === "dark" && currentPath === "/favorites"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-400"
                  : theme !== "dark" && currentPath === "/favorites"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Saved
            </div>
          </div>
        </Link>
        <Link to="/cart" onClick={() => selected("cart")}>
          <div className="flex-col justify-start items-center inline-flex">
            <img
              alt="MyCart"
              src={
                theme === "dark" && currentPath === "/cart"
                  ? "https://i.postimg.cc/pV51rwL9/Active-Cart.png"
                  : theme === "dark"
                  ? "https://i.postimg.cc/K8DWFtvJ/Inactive-Cart-Dark-Mode.png"
                  : theme !== "dark" && currentPath === "/cart"
                  ? "https://i.postimg.cc/pV51rwL9/Active-Cart.png"
                  : "https://i.postimg.cc/j2f817F6/Inactive-Cart-Light-Mode.png"
              }
            />
            <div
              className={`text-xs font-medium ${
                theme === "dark" && currentPath === "/cart"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-400"
                  : theme !== "dark" && currentPath === "/cart"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Cart
            </div>
          </div>
        </Link>
        <Link to="/Account" onClick={() => selected("Account")}>
          <div className="flex-col justify-start items-center inline-flex">
            <img
              src={
                theme === "dark" && currentPath === "/Account"
                  ? "https://i.postimg.cc/BnWfdhyF/Active-Account.png"
                  : theme === "dark"
                  ? "https://i.postimg.cc/9Fwjg3xV/Inactive-Account-Dark-Mode.png"
                  : theme !== "dark" && currentPath === "/Account"
                  ? "https://i.postimg.cc/BnWfdhyF/Active-Account.png"
                  : "https://i.postimg.cc/VN7H01tt/Inactive-Account-Light-Mode.png"
              }
              className="w-4 h-auto"
              alt="Account"
            />
            <div
              className={`text-xs font-medium ${
                theme === "dark" && currentPath === "/Account"
                  ? "text-red-500"
                  : theme === "dark"
                  ? "text-gray-400"
                  : theme !== "dark" && currentPath === "/Account"
                  ? "text-red-500"
                  : "text-gray-500"
              }`}
            >
              Account
            </div>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AuxBar;
