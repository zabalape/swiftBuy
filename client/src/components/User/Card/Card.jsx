const Card = ({ title, icon: Icon }) => {
  return (
    <div className="w-[361px] h-11 p-2.5 bg-white rounded-[5px] border border-red-500 border-opacity-60 justify-start items-center gap-2.5 inline-flex">
      {Icon && <Icon className="w-6 h-6" alt="icon" />}
      <div className="text-black text-[13px] font-normal leading-snug">{title}</div>
    </div>
  );
};

export default Card;
