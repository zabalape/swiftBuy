import { useState, useEffect } from "react";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { auth } from "../../firebase/config";
import { useDispatch } from "react-redux";
import { setUser } from "../../redux/slices/userSlice";
import google from "./icons/google.svg";
import axios from "axios";

const GoogleProvider = ({ isLogin, setLogin }) => {
  const dispatch = useDispatch();
  const [profile, setProfile] = useState({
    name: "",
    email: "",
    image_secure_url: "",
  });

  useEffect(() => {
    dispatch(setUser(profile));
  }, [profile]);

  const handleSignup = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const credentials = await signInWithPopup(auth, provider);
      const values = {
        name: credentials.user.displayName,
        email: credentials.user.email,
        photoURL: credentials.user.photoURL,
      };

      const response = await axios.post(
        "https://swiftbuy-api.up.railway.app/api/user/signup",
        values
      );
      const token = response.data.token;
      localStorage.setItem("jwtToken", token);
      setLogin(!isLogin);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSignin = async () => {
    const provider = new GoogleAuthProvider();
    const credentials = await signInWithPopup(auth, provider);
    const values = {
      email: credentials.user.email,
    };
    const storedToken = localStorage.getItem("jwtToken");

    if (storedToken) {
      const headers = { Authorization: `Bearer ${storedToken}` };
      try {
        const response = await axios.post(
          "https://swiftbuy-api.up.railway.app/api/user/login",
          values,
          { headers }
        );
        setProfile(() => ({ ...profile, ...response.data.userToLogin }));
      } catch (error) {
        console.error(error);
      }
    } else {
      console.log("No se encontró ningún token en el Local Storage.");
    }
  };

  return (
    <button
      type="button"
      onClick={isLogin ? handleSignin : handleSignup}
      className="w-full h-[58px] bg-white border border-gray-300 rounded-[10px] flex items-center justify-center text-black text-base font-medium mb-8"
    >
      <div className="w-6 h-6 mr-2">
        <img src={google} />
      </div>
      {isLogin ? "Log In with Google" : "Sign Up with Google"}
    </button>
  );
};

export default GoogleProvider;
