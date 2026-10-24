import { add, remove, setItemQuantity } from "./cartSlice";
import cartReducer from "./cartSlice";

describe("cart reducer", () => {
  const initialState = {
    value: [],
  };

  const product = {
    id: 101,
  };

  test("should handle initial state", () => {
    expect(cartReducer(undefined, { type: "unknown" })).toEqual({
      value: [],
    });
  });

  test("should add a new product to cart", () => {
    const actual = cartReducer(initialState, add(product.id));

    expect(actual.value).toHaveLength(1);
    expect(actual.value[0]).toEqual({
      id: 101,
      quantity: 1,
    });
  });

  test("should increment quantity if the product is already in the cart", () => {
    const stateWithItem = {
      value: [{ id: 101, quantity: 1 }],
    };

    const actual = cartReducer(stateWithItem, add(product.id));

    expect(actual.value[0].quantity).toBe(2);
  });

  test("should set cart item quantity to a given value", () => {
    const stateWithItem = {
      value: [{ id: 101, quantity: 2 }],
    };

    const actual = cartReducer(
      stateWithItem,
      setItemQuantity({ id: 101, quantity: 5 }),
    );

    expect(actual.value[0].quantity).toBe(5);
  });

  test("should remove product from cart", () => {
    const stateWithItem = {
      value: [{ id: 101, quantity: 1 }],
    };

    const actual = cartReducer(stateWithItem, remove(101));

    expect(actual.value).toHaveLength(0);
  });
});
