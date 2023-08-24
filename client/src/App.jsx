import { Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import Home from "./components/Home/Home";
import Detail from "./components/Detail";
import Account from "./components/Account/Account";
import Cart from "./components/Cart/Cart";
import User from "./components/User";
import AuxBar from "./components/AuxBar";
import Filters from "./components/Filters/Filters";
import DashBoardAdmin from "./components/DashBoardAdmin/DashBoardAdmin";
import CreateProduct from "./components/CreateProduct/CreateProduct";
import ProductsToModify from "./components/DashBoardAdmin/ProductToModify";
import PurchaseHistory from "./components/DashBoardAdmin/PurchaseHistory";
import ManageStock from "./components/DashBoardAdmin/ManageStock";
import ManageUser from "./components/DashBoardAdmin/ManageUser";
import PurchaseHistoryCard from "./components/PurchaseHistoryCard/PurchaseHistoryCard";
import RedirectComponent from "./components/PaymentStatus/RedirectComponent";
import EditedProduct from "./components/DashBoardAdmin/EditedProduct"

import Favorites from "./components/Favorites"
import Sidebar from "./components/Navbar/Sidebar";

const App = () => {
  const [theme, setTheme] = useState("light");
  const [Desktop, setDesktop] = useState(window.innerWidth > 1024);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    const handleResize = () => {
      setDesktop(window.innerWidth > 1024);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleThemeSwitch = () => {
    setTheme(theme === "dark" ? "light" : "dark");
  };

  return (
    <div>
      <Sidebar />
      <Routes>
        {/* <Route path="/login" element={<Login />} /> */}
        <Route path="/admin" element={<DashBoardAdmin />}>
          <Route path="purchaseHistory" element={<PurchaseHistory />} />
          <Route path="createProduct" element={<CreateProduct />} />
          <Route path="productsToModify" element={<ProductsToModify />} />
          <Route path="productsTomodify/:id" element={<EditedProduct />} />
          <Route path="manageStock" element={<ManageStock />} />
          <Route path="manageUser" element={<ManageUser />} />
        </Route>
        <Route path="/account" element={<Account />} />
        <Route path="/order" element={<PurchaseHistoryCard />} />
        <Route path="/" element={<Home />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/user" element={<User />} />
        <Route path="/products" element={<Filters />} />
        <Route path="/favorites" element={<Favorites/>} />
        <Route
          path="/success"
          element={<RedirectComponent status="success" />}
        />
        <Route
          path="/failure"
          element={<RedirectComponent status="failure" />}
        />
        <Route
          path="/pending"
          element={<RedirectComponent status="pending" />}
        />
      </Routes>
      {/* <div className="fixed bottom-[300px] left-[400px] w-full bg-none dark:bg-none">
        <button
          className="bg-green-200 p-2 rounded-xl"
          onClick={handleThemeSwitch}
        >
          🌞
        </button>
      </div> */}
      {!Desktop && (
        <div className="fixed bottom-0 left-0 w-full z-[1000]">
          <AuxBar theme={theme} handleThemeSwitch={handleThemeSwitch} />
        </div>
      )}
    </div>
  );
};

export default App;
