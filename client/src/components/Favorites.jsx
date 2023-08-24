import CardFavorite from "./Cards/CardFavorite";
import TitleSection from "./TitleSection";

const Favorites = () => {
  return (
    <div>
      <div className="w-full h-[60px]">
        <TitleSection title="My Favorites" />
      </div>
      <div className="w-full h-full flex justify-center items-center">
        <div className="w-auto grid grid-cols-2 gap-y-14 gap-x-20">
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
          <CardFavorite />
        </div>
      </div>
    </div>
  );
};

export default Favorites;
