import { createSlice } from "@reduxjs/toolkit";

export type CartItem = {
  id: number;
  quantity: number;
};

export interface CartState {
  value: CartItem[];
}

const cartState: CartState = {
  value: [],
};

const cartSlice = createSlice({
  name: "cartState",
  initialState: cartState,
  reducers: {
    add: (state, action) => {
      const current = state.value.find((item) => item.id == action.payload);
      if (!current) {
        state.value.push({ id: action.payload, quantity: 1 });
      } else {
        current.quantity++;
      }
    },
    remove: (state, action) => {
      const current = state.value.find((item) => item.id == action.payload);
      if (current && current.quantity > 0) {
        current.quantity--;
      }
    },
    reset: (state) => {
      state.value = [];
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },
  },
});

export default cartSlice.reducer;

export const { add, remove, setCart, reset } = cartSlice.actions;
