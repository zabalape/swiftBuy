import { initializeApp } from "firebase/app";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
  getBytes,
} from "firebase/storage";
import { getAuth } from "firebase/auth";
const firebaseConfig = {
  apiKey: "AIzaSyCjcJVYlh2VmQtp4KfYN_M64kBE2ZrQX1k",
  authDomain: "swiftbuy.firebaseapp.com",
  projectId: "swiftbuy",
  storageBucket: "swiftbuy.appspot.com",
  messagingSenderId: "465480121034",
  appId: "1:465480121034:web:be094d80181a0d50519233",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
export const auth = getAuth(app);
