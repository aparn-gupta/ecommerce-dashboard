import CartItem from "../components/CartItem";
import { useSelector } from "react-redux";
import CartPriceDetails from "../components/CartPriceDetails";
import { type Product } from "../lib/types";
import { useEffect, useState } from "react";
import type { CartItemType } from "../lib/cartSlice";
import { calcOriginalPrice } from "../components/ProductCard";
import { Skeleton } from "@/components/ui/skeleton";

const CheckoutPage = () => {
  const cartVal = useSelector((state: any) => state.cartState.value);

  // const cartVal = cartValState.filter(
  //   (item: CartItemType) => item.quantity > 0,
  // );

  // useEffect(() => {
  //   localStorage.setItem("cartVal", JSON.stringify(cartVal));
  // }, [cartVal]);

  const [cartProducts, setCartProducts] = useState<Product[] | []>([]);

  const [loading, setLoading] = useState<boolean>(true);
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
      acc.originalPrice +=
        Number(calcOriginalPrice(curr.price, curr.discountPercentage)) *
        curr.quantity;
      return acc;
    },
    { totalPrice: 0, totalDiscount: 0, totalQuantity: 0, originalPrice: 0 },
  );

  console.log(totals);

  const combinedDiscount = (
    100 -
    (totals.totalPrice * 100) / totals.originalPrice
  ).toFixed(2);

  // console.log(cartProducts);

  return (
    <div className="bg-page_bg w-screen min-h-screen">
      <div className="w-[85vw] mx-auto text-foreground p-4">
        <div className="text-2xl my-2">Check out</div>

        {!cartProducts?.length && !loading ? (
          <div className="flex justify-between">
            <div className="w-[70%]">
              {" "}
              {Array(4)
                .fill(0)
                .map((item: Product) => (
                  <div className="w-full flex justify-between p-4">
                    <div className="w-[20%]">
                      {" "}
                      <Skeleton className="w-20 h-20 rounded-xl" />
                      <Skeleton className="w-20 h-5 rounded-xl mt-4" />
                    </div>

                    <div className="w-[78%]">
                      {" "}
                      <Skeleton className="w-56 h-6" />
                      <Skeleton className="w-150 h-4 mt-2" />
                      <Skeleton className="w-150 h-4 mt-2" />
                      <Skeleton className="w-28 h-6 mt-2" />
                      <Skeleton className="w-48 h-6 mt-2" />
                    </div>
                  </div>
                ))}
            </div>

            <div className="w-[28%] h-44 mt-2">
              <CartPriceDetails loading={true} />
            </div>
          </div>
        ) : loading ? (
          <div className="text-xl text-muted mt-6">
            No items in your cart! Please add something{" "}
          </div>
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
                totalPrice={Number(totals.originalPrice.toFixed(2))}
                totalDiscount={Number(combinedDiscount)}
                totalAmount={Number(totals.totalPrice)}
              />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CheckoutPage;
