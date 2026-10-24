import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import Products from "./Products";

const dummyStore = configureStore({
  reducer: {
    cartState: (state = { value: [] }, action) => state,
  },
});

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

test("renders products properly", () => {
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
});
