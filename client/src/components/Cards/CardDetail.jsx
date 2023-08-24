// We receive the image data, name, description by destructuring.
import { useState } from "react";
const CardDetail = ({
  title,
  image_secure_url,
  description,
  size,
  setSelectedSize,
}) => {
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(null);

  return (
    <div className="font-general-sans w-[300px] h-full mt-0 mb-0 m-[15px] flex-col">
      <div className="h-auto flex flex-col">
        <div className="h-[auto] border rounded-[10px] min-h-[300px] border-none flex items-center justify-center">
          <img className=" max-h-[400px] w-auto" alt="Image" src={image_secure_url} />
        </div>
        <div className="flex flex-col gap-y-3">
          <span className="text-black text-[24px] font-bold ">{title}</span>
          <div className="w-auto h-6 justify-start items-center gap-[3px] inline-flex">
            <div className="inline-block max-content">
              <img
                className="w-[20px] h-[20px]"
                src="https://generation-sessions.s3.amazonaws.com/32acdff4caa7c653a3757d94601e8d96/img/icon.svg"
              />
            </div>
            <div className="w-auto inline-block max-content">
              <span className=" text-black text-[16px] font-bold">4.5/5</span>
              <span className="text-black text-opacity-60 text-[16px] font-bold">
                {" "}
                (45 reviews)
              </span>
            </div>
          </div>
          <div className="w-full">
            <h4 className="text-black font-normal text-opacity-60">
              {description}
            </h4>
          </div>
          <div>
            <h2 className=" text-black text-xl font-bold">Choose Size</h2>
          </div>
          <div className="flex w-full justify-start gap-3 flex-wrap">
            {size?.map((sizes, index) => {
              return (
                <button
                  key={sizes}
                  onClick={() => {setSelectedSizeIndex(index)
                  setSelectedSize(sizes)}}
                  className={`min-w-[40px] min-h-[40px] p-[5px] bg-white hover:bg-black hover:text-white rounded-md border ${
                    selectedSizeIndex === index
                      ? "border-black border-opacity-100"
                      : "border-black border-opacity-20"
                  } justify-center items-center text-xl font-medium`}
                >
                  {sizes}
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardDetail;