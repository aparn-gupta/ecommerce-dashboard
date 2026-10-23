import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "./cartSlice";

const preloadedCart = (() => {
  try {
    const saved = localStorage.getItem("cartVal");
    return saved ? JSON.parse(saved) : undefined;
  } catch {
    return undefined;
  }
})();

export const store = configureStore({
  reducer: {
    // @ts-ignore
    cartState: cartReducer,
  },

  preloadedState: {
    cartState: preloadedCart ? { value: preloadedCart } : undefined,
  },
});

let previousCart = store.getState().cartState.value;

store.subscribe(() => {
  const currentCart = store.getState().cartState.value;

  if (previousCart !== currentCart) {
    previousCart = currentCart;
    try {
      localStorage.setItem("cartVal", JSON.stringify(currentCart));
    } catch (e) {
      console.error("Failed to sync cart:", e);
    }
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
