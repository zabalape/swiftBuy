const Header = ({ userName, userProfile, orders }) => {
    const orderCount = orders.length;
    return (
      <div className="w-28 h-[146px] flex-col justify-start items-center inline-flex">
        <img className="w-[102px] h-[102px] relative rounded-[100px]" src={userProfile} />
        <div className="text-center text-black text-base font-bold leading-snug">{userName}</div>
        <div className="text-center text-black text-[10px] font-medium underline leading-snug">{orderCount + ' Orders'}</div>
      </div>
    );
  };
  
  export default Header;
  