// src/redux/reducers.js
import { combineReducers } from "redux";
import productsReducer from "./slices/productSlice";
import userReducer from "./slices/userSlice";
import cartReducer from "./slices/cartSlice";
import appBarSlice from "./slices/appBarSlice";
import detailReducer from "./slices/detailSlice";

const rootReducer = combineReducers({
  appbar: appBarSlice,
  products: productsReducer,
  user: userReducer,
  cart: cartReducer,
  detail: detailReducer
});

export default rootReducer;
