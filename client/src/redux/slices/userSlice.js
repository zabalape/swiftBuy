import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  name: "",
  username: "",
  email: "",
  password: "",
  photoURL: "",
  address: "",
  whishlist: "",
  payment: "",
  order: "",
  isDisable: "",
  isAdmin: "",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser(state, action) {
      const {
        id,
        name,
        username,
        email,
        password,
        photoURL,
        address,
        whishlist,
        payment,
        order,
        isDisable,
        isAdmin,
      } = action.payload;
      state.id = id;
      state.name = name;
      state.username = username;
      state.email = email;
      state.password = password;
      state.photoURL = photoURL;
      state.address = address;
      state.whishlist = whishlist;
      state.payment = payment;
      state.order = order;
      state.isDisable = isDisable;
      state.isAdmin = isAdmin;
    },
    clearUser(state) {
      state.id = "";
      state.name = "";
      state.username = "";
      state.email = "";
      state.password = "";
      state.photoURL = "";
      state.address = "";
      state.whishlist = "";
      state.payment = "";
      state.order = "";
      state.isDisable = "";
      state.isAdmin = "";
    },
  },
});

export const { setUser, clearUser } = userSlice.actions;
export default userSlice.reducer;
