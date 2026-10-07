import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
  name: "cartState",
  initialState: {
    value: 0,
  },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    reset: (state) => {
      state.value = 0;
    },
  },
});

export default cartSlice.reducer;

export const { increment, decrement, reset } = cartSlice.actions;
