import { createSlice } from "@reduxjs/toolkit";

export type CartItemType = {
  id: number;
  quantity: number;
};

export interface CartState {
  value: CartItemType[];
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

      if (current) {
        if (current.quantity > 1) {
          current.quantity--;
        } else {
          const itemRemovedArray = state.value.filter(
            (item) => item.id != current.id,
          );
          state.value = itemRemovedArray;
        }
      }
    },
    reset: (state) => {
      state.value = [];
    },
    setCart: (state, action) => {
      state.value = action.payload;
    },

    setItemQuantity: (state, action) => {
      const { id, quantity } = action.payload;

      if (quantity == 0) {
        const itemRemovedArray = state.value.filter((item) => item.id != id);
        state.value = itemRemovedArray;
      }

      const current = state.value.find((item) => item.id == id);
      if (current) {
        current.quantity = quantity;
      }
    },
  },
});

export default cartSlice.reducer;

export const { add, remove, setCart, reset, setItemQuantity } =
  cartSlice.actions;
