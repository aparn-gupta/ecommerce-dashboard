import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import CartPriceDetails from "../components/CartPriceDetails";
import { type Product } from "../lib/types";
import { useEffect, useState } from "react";
import type { CartItemType } from "../lib/cartSlice";

const CheckoutPage = () => {
  const cartVal = useSelector((state: any) => state.cartState.value);

  // const cartVal = cartValState.filter(
  //   (item: CartItemType) => item.quantity > 0,
  // );

  const [cartProducts, setCartProducts] = useState<Product[] | []>([]);

  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<Error | null | unknown>("");

  async function fetchProductDetails() {
    setLoading(true);

    try {
      const results = await Promise.allSettled(
        cartVal.map(async (item: CartItemType) => {
          const res = await fetch(`https://dummyjson.com/products/${item.id}`);
          if (!res.ok) throw new Error(`Failed to load product ${item.id}`);
          return await res.json();
        }),
      );

      const successfulProducts = results
        .filter((item) => item.status === "fulfilled")
        .map((item) => item.value);

      const cartValMap = new Map(
        cartVal.map((item: CartItemType) => [item.id, item.quantity]),
      );

      const mergedWithCart = successfulProducts.map((product) => ({
        ...product,
        quantity: cartValMap.get(product.id) ?? 1,
      }));

      setCartProducts(mergedWithCart);
    } catch (err) {
      setError(err);
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (cartVal) {
      fetchProductDetails();
    }
  }, [cartVal]);

  console.log(cartProducts);

  const totals = cartProducts.reduce(
    (acc, curr) => {
      acc.totalPrice += Number(curr.quantity) * Number(curr.price);
      acc.totalDiscount += Number(curr.discountPercentage);
      acc.totalQuantity += Number(curr.quantity);
      return acc;
    },
    { totalPrice: 0, totalDiscount: 0, totalQuantity: 0 },
  );

  console.log(totals);

  const combinedDiscount = (
    totals.totalDiscount / totals.totalQuantity
  ).toFixed(2);

  // console.log(cartProducts);

  return (
    <div className="bg-page_bg w-screen ">
      <div className="w-[85vw] mx-auto text-foreground p-4">
        <div className="text-2xl my-2">Check out</div>

        {loading ? (
          <div>Loading...</div>
        ) : error ? (
          <div className="text-red-500">
            Error loading Cart items: {JSON.stringify(error)}
          </div>
        ) : (
          <div className="flex justify-between">
            <div className="w-[70%]">
              {" "}
              {cartProducts.map((item: Product) => (
                <CartItem item={item} />
              ))}
            </div>

            <div className="w-[28%] h-44 mt-2">
              <CartPriceDetails
                totalPrice={Number(totals.totalPrice.toFixed(2))}
                totalDiscount={Number(combinedDiscount)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
