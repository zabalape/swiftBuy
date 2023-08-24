import { createSlice } from "@reduxjs/toolkit";

const calcularTotal = (cost1, cost2, impuestoPorcentaje) =>
  cost1 + cost2 + (cost1 + cost2) * (impuestoPorcentaje / 100);

const initialState = {
  items: [],
  shippingInfo: [],
  subtotalPrice: 0,
  shippingPrice: 50,
  tax: 20,
  quantity: 0,
  totalPrice: 0,
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addItem(state, action) {
      const product = action.payload;
      const existingItem = state.items.find((item) => item.id === product.id);

      if (existingItem) {
        existingItem.quantity++;
      } else {
        state.items.push({ ...product, quantity: 1 });
      }

      state.subtotalPrice = state.items.reduce(
        (subtotal, item) => subtotal + item.unit_price * item.quantity,
        0
      );

      state.totalPrice = calcularTotal(
        state.subtotalPrice,
        state.shippingPrice,
        state.tax
      );

      state.quantity = state.items.reduce(
        (total, item) => total + item.quantity,
        0
      );
    },
    removeItem(state, action) {
      const productId = action.payload;
      const itemIndex = state.items.findIndex((item) => item.id === productId);

      if (itemIndex !== -1) {
        const item = state.items[itemIndex];
        if (item.quantity > 1) {
          item.quantity--;
        } else {
          state.items.splice(itemIndex, 1);
        }

        state.subtotalPrice = state.items.reduce(
          (subtotal, item) => subtotal + item.unit_price * item.quantity,
          0
        );

        state.quantity = state.items.reduce(
          (total, item) => total + item.quantity,
          0
        );
      }
    },

    setQuantity(state, action) {
      const { id, act } = action.payload;

      const itemToAdjust = state.items.find((item) => item.id === id);

      if (itemToAdjust) {
        if (act === "+") {
          itemToAdjust.quantity++;
        } else if (act === "-") {
          itemToAdjust.quantity = Math.max(itemToAdjust.quantity - 1, 0);
          if (itemToAdjust.quantity === 0) {
            state.items = state.items.filter((item) => item.id !== id);
          }
        }
      }
    },

    clearCart(state) {
      state.items = [];
      state.subtotalPrice = 0;
      state.totalPrice = 0;
      state.quantity = 0;
    },
    setShippingInfo(state, action) {
      state.shippingInfo.push(action.payload);
    },
    updateShippingInfo(state, action) {
      state.shippingInfo = action.payload;
    },
  },
});

export const {
  setQuantity,
  addItem,
  removeItem,
  clearCart,
  setShippingInfo,
  updateShippingInfo,
} = cartSlice.actions;

export default cartSlice.reducer;
