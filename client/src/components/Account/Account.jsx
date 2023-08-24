import { useSelector } from "react-redux";
import User from "../User";
import Signup from "./Signup";

const Account = () => {
  const user = useSelector((state) => state.user);
  // console.warn(user);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center pb-40">
      <div className="w-full max-w-md p-6 rounded-lg ">
        {user.name ? <User user={user} /> : <Signup />}
      </div>
    </div>
  );
};

export default Account;
