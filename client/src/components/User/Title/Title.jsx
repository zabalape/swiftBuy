const Title = ({ userName, handleLogout }) => {
    return (
      <div >
        <div className="text-black text-xl font-bold leading-7">{userName}</div>
        <div className="text-center text-green-950 text-[10px] font-medium leading-snug" onClick={handleLogout}>
          Log Out
        </div>
      </div>
    );
  };
  
  export default Title;
  