import { calculateTotalCartVal } from "@/pages/CartPage";
describe("cart calculation utilities", () => {
  const sampleCart = [
    {
      id: 101,
      title: "Gaming Setup",
      discountPercentage: 10,
      price: 2000,
      quantity: 2,
    },
    {
      id: 102,
      title: "HD Monitor",
      discountPercentage: 20,
      price: 1000,
      quantity: 1,
    },
  ];

  test("correctly calculates total amount and total discount", () => {
    const { originalPrice, totalQuantity, totalPrice } = calculateTotalCartVal(
      sampleCart as any,
    );

    expect(totalQuantity).toBe(3);
    expect(totalPrice).toBe(5000);
    expect(Math.round(originalPrice)).toBe(5694);
  });
});
