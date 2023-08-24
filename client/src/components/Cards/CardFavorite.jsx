const CardFavorite = () => {
  return (
    <div className="font-general-sans h-auto w-[420px] lg:flex lg:flex-row bg-zinc-200 p-2 rounded-lg">
      <div className="h-[auto] border rounded-[10px] overflow-hidden border-none flex items-center">
        <img
          className="w-[95px] h-[85px]"
          alt="Image"
          src="https://techwear-outfits.com/cdn/shop/products/techwear-jacket-men-techwear-288.webp?v=1674831299"
        />
      </div>
      <div className="ml-4">
        <div className="text-black text-[12px] font-medium max-w-[100%] max-h-[70px] line-clamp-2">
          Daily Paper x Dreamville Bordeaux Cream Varsity Jacket
        </div>
        <div className="font-bold">XL</div>
        <div className="text-red-500 text-[16px] font-semibold flex justify-between">
          USD 1.390
          <div>
            <svg
              className={`icon-heart`}
              fill="none"
              height="21"
              viewBox="0 0 20 21"
              width="20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                className="path"
                d="M10.0005 18.0003C9.89079 18.0009 9.78207 17.9799 9.68054 17.9384C9.57901 17.8969 9.48666 17.8358 9.4088 17.7586L2.9338 11.2753C2.1216 10.4546 1.66602 9.34656 1.66602 8.19192C1.66602 7.03728 2.1216 5.92928 2.9338 5.10859C3.75235 4.29235 4.86116 3.83398 6.01713 3.83398C7.1731 3.83398 8.28191 4.29235 9.10046 5.10859L10.0005 6.00859L10.9005 5.10859C11.719 4.29235 12.8278 3.83398 13.9838 3.83398C15.1398 3.83398 16.2486 4.29235 17.0671 5.10859C17.8793 5.92928 18.3349 7.03728 18.3349 8.19192C18.3349 9.34656 17.8793 10.4546 17.0671 11.2753L10.5921 17.7586C10.5143 17.8358 10.4219 17.8969 10.3204 17.9384C10.2189 17.9799 10.1101 18.0009 10.0005 18.0003Z"
                fill="#FF5823"
              />
            </svg>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardFavorite;
