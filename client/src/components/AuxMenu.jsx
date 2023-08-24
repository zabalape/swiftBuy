import { Link } from "react-router-dom";
import close from "../assets/close.png";
import hamburger from "../assets/hamburger.png";
import { useState } from "react";

const Comp1 = ( { toggleMenu } ) => {


  return (
    <div className="z-20">
      <div className="w-[349px] h-[797px] left-0 top-0 absolute bg-zinc-100 z-20" />
      <div
        onClick={() => {
          toggleMenu();
        }}
      >
        <img
          className="w-[23px] h-[23px] left-[19px] top-[25px] absolute cursor-pointer z-20"
          src={close}
          alt="Cerrar menú"
        />
      </div>
      <div className="w-[23px] h-[23px] left-[19px] top-[25px] absolute" />
      <div className="w-[130px] h-[168px] left-[42px] top-[82px] absolute z-20">
        <div className="left-0 top-[47px] absolute text-black text-xl font-medium">
          <Link to="/Store">PRODUCTS</Link>
        </div>
        <div className="left-0 top-[141px] absolute text-black text-xl font-medium">
          <Link to="/About">ABOUT US</Link>
        </div>
        <div className="left-0 top-[94px] absolute text-black text-xl font-medium">
          <Link to="/Contact">CONTACT US</Link>
        </div>
      </div>
    </div>
  );
};

const X = ( { toggleMenu } ) => {

  return (
    <div
      onClick={() => {
        toggleMenu();
      }}
    >
      <img
        className="w-[23px] h-[23px] left-[19px] top-[25px] absolute cursor-pointer -z-21"
        src={hamburger}
        alt="Cerrar menú"
      />
    </div>
  );
};



const Menu = () => {
  const [menuVisible, setMenuVisible] = useState(false);

  const toggleMenu = () => {
    setMenuVisible(!menuVisible);
  };

  return (
    <div className="w-[349px] h-[797px] relative">
      {menuVisible && <Comp1 toggleMenu={toggleMenu} />}
      <X toggleMenu={toggleMenu} />
      {console.log(menuVisible)}
    </div>
  );
};

export default Menu;
