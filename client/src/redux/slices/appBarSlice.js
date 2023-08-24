import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  home: "0.6",
  save: "0,6",
  cart: "0.6",
  user: "0.6",
};

const selector = { selected: "1", noSelected: "0.6" };

const appBarSlice = createSlice({
  name: "appBar",
  initialState,
  reducers: {
    switchSelector: (state, action) => {
      const selected = action.payload;

      switch (selected) {
        case "home":
          state.home = selector.selected;
          state.save = selector.noSelected;
          state.cart = selector.noSelected;
          state.user = selector.noSelected;
          break;
        case "save":
          state.home = selector.noSelected;
          state.save = selector.selected;
          state.cart = selector.noSelected;
          state.user = selector.noSelected;
          break;
        case "cart":
          state.home = selector.noSelected;
          state.save = selector.noSelected;
          state.cart = selector.selected;
          state.user = selector.noSelected;
          break;
        case "user":
          state.home = selector.noSelected;
          state.save = selector.noSelected;
          state.cart = selector.noSelected;
          state.user = selector.selected;
          break;
        default:
          // No hagas nada si no coincide con ningún caso
          break;
      }
    },
  },
});

export const { switchSelector } = appBarSlice.actions;
export default appBarSlice.reducer;
