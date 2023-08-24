import Title from "./Title/Title";
import Header from "./Header/Header";
import Card from "./Card/Card";
import {
  account,
  order,
  payment,
  language,
  notifications,
  security,
  help,
} from "./assets/icons";
import axios from "axios";
import { useEffect, useState } from "react";
import OrderHistoryCard from "./userOrder";

const getOrders = async (id) => {
  const response = await axios.get(`http://localhost:3001/api/order/${id}`);
  const data = await response.data;
  console.log(data);
  return data;
};

const User = () => {
  const user = useState((state) => state.user);
  const [orders, setOrders] = useState([]);
  useEffect(() => {
    // Llamada a la función getOrders dentro del efecto
    getOrders(user.id)
      .then((data) => {
        setOrders(data);
      })
      .catch((error) => {
        console.error("Error:", error);
        // Manejo de errores aquí si es necesario
      });
  }, [user.id]);

  const handleLogout = () => {
    console.log("Logged out");
  };

  return (
    <div className="w-[428px] h-[926px] relative bg-white">
      <Title
        className="w-[428px] h-7 justify-center items-center gap-[225px] inline-flex"
        userName={user.username}
        handleLogout={handleLogout}
      />
      <img src={help} alt="help" /> {/* Wrap the help icon with an img tag */}
      <Header
        userName={user.username}
        userProfile={user.photoURL}
        orders={orders}
      />
      <div>
        <div className="w-[361px] h-[212px] flex-col justify-start items-start gap-2 inline-flex">
          <h2 className="text-black text-sm font-bold leading-snug">
            Personal
          </h2>
          <Card title={"Account information"} icon={account} />
          <OrderHistoryCard
            title={"Order History"}
            icon={order}
            orders={orders}
          />
          <Card title={"Payment Methods"} icon={payment} />
        </div>
        <div className="w-[361px] h-[212px] flex-col justify-start items-start gap-2 inline-flex">
          <h2 className="text-black text-sm font-bold leading-snug">
            Accessibility & Security
          </h2>
          <Card title={"Language Preference"} icon={language} />
          <Card title={"Notifications"} icon={notifications} />
          <Card title={"Security and Privacy"} icon={security} />
          <Card title={"Help and Support"} icon={help} />
        </div>
      </div>
    </div>
  );
};

export default User;
