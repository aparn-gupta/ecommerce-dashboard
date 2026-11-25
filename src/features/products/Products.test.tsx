import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Products from "./Products";
import userEvent from "@testing-library/user-event";
import cartReducer from "@/lib/cartSlice";

const mockProducts = [
  {
    id: 101,
    title: "Gaming Setup",
    price: 2500,
    discountPercentage: 10,
    rating: 4.5,
    brand: "TechBrand",
    category: "electronics",
    thumbnail: "https://via.placeholder.com/150",
    meta: {
      createdAt: "2024-01-01T00:00:00.000Z",
    },
  },
  {
    id: 102,
    title: "HD Monitor",
    price: 1800,
    discountPercentage: 5,
    rating: 4.2,
    brand: "ScreenBrand",
    category: "electronics",
    thumbnail: "https://via.placeholder.com/150",
    meta: {
      createdAt: "2024-01-02T00:00:00.000Z",
    },
  },
];

test("renders products properly", async () => {
  const dummyStore = configureStore({
    reducer: {
      cartState: cartReducer,
    },
  });

  const user = userEvent.setup();
  render(
    <Provider store={dummyStore}>
      <MemoryRouter>
        {/* @ts-ignore */}
        <Products products={mockProducts} />
      </MemoryRouter>
    </Provider>,
  );

  expect(screen.getByText("Gaming Setup")).toBeInTheDocument();
  expect(screen.getByText("HD Monitor")).toBeInTheDocument();

  const addButtons = screen.getAllByRole("button", { name: /add/i });

  await user.click(addButtons[0]);

  expect(dummyStore.getState().cartState.value[0]).toEqual({
    id: 102,
    quantity: 1,
  });

  const incrementButtons = screen.getAllByRole("button", { name: "+" });

  await user.click(incrementButtons[0]);

  expect(dummyStore.getState().cartState.value[0].quantity).toBe(2);

  const decrememntButtons = screen.getAllByRole("button", { name: "-" });

  await user.click(decrememntButtons[0]);

  expect(dummyStore.getState().cartState.value[0].quantity).toBe(1);
});
