import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartState",
  initialState: {
    value: [],
  },
  reducers: {
    increment: (state, action) => {
      const current = state.value.find((item) => item.id == action.payload);
      if (!current) {
        state.value.push({ id: action.payload, quantity: 1 });
      } else {
        const newCart = state.value.filter((item) => item.id != action.payload);
        current.quantity++;
        newCart.push(current);
        state.value = newCart;
      }
    },
    decrement: (state, action) => {
      const current = state.value.find((item) => item.id == action.payload);
      if (current?.quantity > 0) {
        const newCart = state.value.filter((item) => item.id != action.payload);
        current.quantity--;
        newCart.push(current);
        state.value = newCart;
      }
    },
    reset: (state) => {
      state.value = [];
    },
  },
});

export default cartSlice.reducer;

export const { increment, decrement, reset } = cartSlice.actions;
