const Card = ({ title, image_secure_url, price }) => {
  return (
    <div className=" w-[161px] mt-0 mb-0 m-[15px] flex-column">
      <div className="h-auto">
        <div className="h-[174px] border rounded-[10px] overflow-hidden border-none flex items-center">
          <img className="w-auto h-auto" alt="Image" src={image_secure_url} />
        </div>
        <div>
          <div className="text-black text-[16px] font-bold max-w-[100%] max-h-[70px]  line-clamp-2">
            {title}
          </div>
          <div className=" text-black text-opacity-60 text-s font-semibold">
            USD {price}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;