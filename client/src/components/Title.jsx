import { Link } from "react-router-dom";

export const ArrowRightScreen = () => {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="35"
      height="35"
      fill="none"
      viewBox="0 0 24 24"
    >
      <path
        stroke="#000"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M19 12H5m0 0 7-7m-7 7 7 7"
      />
    </svg>
  );
};

const Title = ({ title, onBack }) => {
  return (
    <div className="w-75 h-12 relative flex flex-row bg-white">
      <Link to={onBack} className="w-6 h-6 absolute left-2 top-3">
        <ArrowRightScreen />
      </Link>
      <h1 className="left-[171px] top-0 absolute text-center text-black text-2xl font-semibold leading-100">
        {title}
      </h1>
    </div>
  );
};

export default Title;
