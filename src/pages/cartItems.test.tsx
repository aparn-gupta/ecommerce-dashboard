import { render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import { configureStore } from "@reduxjs/toolkit";
import { describe, test, vi, expect, afterEach } from "vitest";
import type { CartItemType } from "@/lib/cartSlice";
import cartReducer from "@/lib/cartSlice";
import CartPage from "./CartPage";
import { MemoryRouter } from "react-router";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
  (window as any).Razorpay = vi.fn().mockImplementation(function () {
    return {
      open: vi.fn(),
      on: vi.fn(),
    };
  });
});

const createTestStore = (initialCartState: CartItemType[]) =>
  configureStore({
    reducer: {
      cartState: cartReducer,
    },
    preloadedState: {
      cartState: { value: initialCartState },
    },
  });

afterEach(() => {
  vi.restoreAllMocks();
});

describe("Cart Page", () => {
  test("load cart items and check user selection", async () => {
    const user = userEvent.setup();

    const dummyStore = createTestStore([
      {
        id: 1001,
        quantity: 1,
      },
      {
        id: 1002,
        quantity: 2,
      },
    ]);

    vi.spyOn(globalThis, "fetch").mockImplementation((url) => {
      const urlStr = String(url);

      if (urlStr.includes("1001")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1001,
            title: "Apple MacBook Pro",
            description:
              "The MacBook Pro 14 Inch in Space Grey is a powerful and sleek laptop, featuring Apple's M1 Pro chip for exceptional performance and a stunning Retina display.",
            category: "laptops",
            price: 1000,
            discountPercentage: 5,
            rating: 3,
            thumbnail: "https://via.placeholder.com/151",
          }),
        });
      }

      if (urlStr.includes("1002")) {
        return Promise.resolve({
          ok: true,
          json: async () => ({
            id: 1002,
            title: "Dell Mouse",
            description:
              "Crafted for ease of use, the ZEB-Juggle is a lightweight wired mouse designed with ergonomics in mind, ensuring a usage experience free from fatigue",
            category: "Mouses",
            price: 200,
            discountPercentage: 10,
            rating: 4,
            thumbnail: "https://via.placeholder.com/151",
          }),
        });
      }

      return Promise.reject(new Error("Unknown product id"));
    });

    render(
      <Provider store={dummyStore}>
        <MemoryRouter>
          <CartPage />
        </MemoryRouter>
      </Provider>,
    );

    expect(await screen.findByText("Apple MacBook Pro")).toBeInTheDocument();
    expect(await screen.findByText("Dell Mouse")).toBeInTheDocument();
    expect(globalThis.fetch).toHaveBeenCalledTimes(2);

    const quantitySelects = screen.getAllByRole("combobox");
    await user.selectOptions(quantitySelects[0], "4");
    // expect(quantitySelects[0]).toHaveValue("4");
    expect(dummyStore.getState().cartState.value[0].quantity).toBe(4);
    expect(screen.getByText(/4000/)).toBeInTheDocument();

    const removeButtons = screen.getAllByRole("button", { name: /remove/i });
    await user.click(removeButtons[0]);

    expect(screen.queryByText("Apple MacBook Pro")).not.toBeInTheDocument();
    expect(screen.getByText("Dell Mouse")).toBeInTheDocument();
  });
});
