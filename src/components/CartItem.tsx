import { useFetch } from "../hooks/useFetch";
import type { Product } from "../lib/types";
import { type CartItemType } from "../lib/cartSlice";
import { calcOriginalPrice } from "./ProductCard";
// import { CRating } from "@coreui/react-pro";
// import { RatingReadOnlyExample } from "./Rating";
interface cartItemProps {
  //   imageSrc: string;
  //   name: string;
  //   description: string;
  //   rating: number;
  //   discountPercent: number;
  //   price: number;
  // quantity: number;
  // id: number;
}

const CartItem = ({ item }: { item: Product }) => {
  // const productsUrl = `https://dummyjson.com/products/${item?.id}`;
  // const {
  //   data,
  //   loading,
  //   error,
  // }: { data: Product | null; loading: boolean; error: Error | null | unknown } =
  //   useFetch(productsUrl);
  // console.log(item);

  const originalPrice = calcOriginalPrice(
    item?.price,
    item?.discountPercentage,
  );

  return (
    <div className="bg-background text-foreground p-4 border border-custom_border mt-2 rounded-sm w-full">
      {/* {loading ? (
        <div>Loading...</div>
      ) : error ? (
        <div> Error loading cart items</div>
      ) : ( */}
      <div>
        <div className="bg-background text-foreground ">
          <div className="flex h-48 gap-4">
            <div className="w-20 h-20 border border-zinc-300 rounded-md">
              <img src={item?.thumbnail} alt="" className="rounded-md" />
              <div className="w-20 h-6 mt-3  text-xs border border-muted rounded-sm flex justify-center items-center text-slate-600 ">
                Quantity: {item?.quantity}{" "}
              </div>
            </div>

            <div className="w-full  object-cover">
              <div className="text-xl">{item?.title}</div>
              <div className="text-xs text-muted w-[95%]">
                {item?.description}
              </div>
              <div className="my-2">
                {" "}
                {/* <CRating
                    readOnly
                    value={item?.rating}
                    size="sm"
                    className="text-green-600"
                  />{" "} */}
                {/* <RatingReadOnlyExample ratingVal={3} /> */}
              </div>

              <div className="my-1.5">
                <span> ${item?.quantity * item?.price}</span>
                {item?.discountPercentage ? (
                  <>
                    <span className="text-muted line-through mx-2">
                      {" "}
                      {(item?.quantity * originalPrice).toFixed(2)}
                    </span>

                    <span className="text-green-700 font-semibold ">
                      {" "}
                      {item?.discountPercentage}% off{" "}
                    </span>
                  </>
                ) : (
                  <></>
                )}
              </div>

              {/* <div>{data?.rating}</div> */}
            </div>
          </div>
        </div>
      </div>
      {/* )} */}
    </div>
  );
};

export default CartItem;
