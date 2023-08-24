import { Link } from "react-router-dom";
const TitleSection = ({title}) => {
    return (
       <div className="w-full h-auto ">
        <div className="w-full h-[50px] flex justify-start absolute z-10 items-center">
          <Link to={"/"} className="inline max-w-max ml-6 ">
            <img
              className="icon w-[14px] h-[14px]"
              src="https://static-00.iconduck.com/assets.00/arrow-left-icon-256x256-cbiils0a.png"
            />
          </Link>
        </div>

        <div className="w-full h-[50px] absolute bg-white flex justify-center">
          <div className="inline-block max-content relative text-center text-black text-2xl font-semibold leading-[49px]">
            {title}
          </div>
        </div>
      </div> 
    )
}

export default TitleSection;