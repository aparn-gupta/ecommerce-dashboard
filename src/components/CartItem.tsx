import type { Product } from "../lib/types";
import { calcOriginalPrice } from "./ProductCard";
import { useDispatch } from "react-redux";
import { setItemQuantity } from "../lib/cartSlice";
import Rating from "react-rating";
import { Star } from "lucide-react";

const CartItem = ({ item }: { item: Product }) => {
  const originalPrice: number | string = calcOriginalPrice(
    item?.price,
    item?.discountPercentage,
  );

  const dispatch = useDispatch();

  // const cartVal = useSelector((state: any) => state.cartState.value);

  // const currentItem

  return (
    <div className="bg-background text-foreground p-4 border border-custom_border mt-2 rounded-sm w-full">
      <div>
        <div className="bg-background text-foreground ">
          <div className="flex h-36 gap-4">
            <div className="w-20 h-20 border border-zinc-300 rounded-md">
              <img src={item?.thumbnail} alt="" className="rounded-md" />

              <select
                className="appearance-none w-20 h-6 mt-3  text-center text-xs border border-muted rounded-sm text-muted "
                value={item?.quantity}
                onChange={(e) => {
                  dispatch(
                    setItemQuantity({
                      id: item?.id,
                      quantity: Number(e.currentTarget.value),
                    }),
                  );
                }}
              >
                <option value={1} className="text-xs">
                  {" "}
                  Quantity: 1
                </option>
                <option value={2} className="text-xs">
                  {" "}
                  Quantity: 2
                </option>

                <option value={3} className="text-xs">
                  {" "}
                  Quantity: 3
                </option>

                <option value={4} className="text-xs">
                  {" "}
                  Quantity: 4
                </option>

                <option value={5} className="text-xs">
                  {" "}
                  Quantity: 5
                </option>
              </select>
              {/* </div> */}
            </div>

            <div className="w-full  ">
              <div className="w-full flex justify-between">
                {" "}
                <div className="text-xl">{item?.title}</div>
                <button
                  className="border border-red-400 text-red-500 rounded-md  px-2 text-xs"
                  onClick={() => {
                    dispatch(setItemQuantity({ id: item?.id, quantity: 0 }));
                  }}
                >
                  Remove
                </button>
              </div>
              <div className="text-xs text-muted w-[95%]">
                {item?.description}
              </div>
              <div className="my-2">
                {" "}
                <Rating
                  initialRating={3}
                  readonly
                  fullSymbol={
                    <>
                      <Star color="goldenrod" fill="goldenrod" size={18} />
                    </>
                  }
                  emptySymbol={
                    <>
                      {" "}
                      <Star color="gainsboro" size={18} />
                    </>
                  }
                />
              </div>

              <div className="my-1.5">
                <span> ${item?.quantity * item?.price}</span>
                {item?.discountPercentage ? (
                  <>
                    <span className="text-muted line-through mx-2">
                      {" "}
                      {(item?.quantity * Number(originalPrice)).toFixed(2)}
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
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
