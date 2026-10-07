interface ProductProps {
  title: string;
  price: number;
  discountPercent: number;
  rating: number;
  thumbnail: string;
}
import { Minus, Plus } from "lucide-react";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { increment, decrement, reset } from "../lib/cartSlice";

const ProductCard = ({
  title,
  price,
  discountPercent,
  thumbnail,
}: ProductProps) => {
  // const [productCount, setProductCount] = useState(0);

  const calcOriginalPrice = (givenPrice: number, percentage: number) => {
    if (!givenPrice) return "NA";
    return ((givenPrice * 100) / (100 - percentage)).toFixed(2);
  };

  const dispatch = useDispatch();

  const productCount = useSelector(
    (state: { cartState: { value: number } }) => state.cartState.value,
  );

  const addProducts = () => {
    // setProductCount((prev) => prev + 1);
    dispatch(increment());
  };

  const minusProducts = () => {
    dispatch(decrement());
    // dispatch(reset());
    // setProductCount((prev) => prev - 1);
  };

  return (
    <div className="h-106 flex-col justify-between ">
      <div>
        <div className=" w-full h-auto flex justify-center items-center object-cover rounded-2xl bg-zinc-100 hover:shadow-xl">
          <img className="w-[90%] h-[90%]" src={thumbnail} />
        </div>
        <div className="text-xl text-slate-500 font-semibold mt-3">
          {" "}
          {title}
        </div>
        <div>
          <span> ${price}</span>
          {discountPercent ? (
            <>
              <span className="text-slate-500 line-through mx-2">
                {" "}
                {calcOriginalPrice(price, discountPercent)}{" "}
              </span>

              <span className="text-green-700 font-semibold ">
                {" "}
                {discountPercent}% off{" "}
              </span>
            </>
          ) : (
            <></>
          )}
        </div>
      </div>

      {/* <div>
        {" "}
        <span> {rating}</span>
      </div> */}

      <div className="mx-2 my-4 h-9">
        {productCount ? (
          <div className="flex w-28 px-2 h-9 items-center rounded-md text-sm border shadow-sm border-slate-400 justify-between">
            {" "}
            <button className=" text-slate-500  " onClick={addProducts}>
              <Plus size={18} />
            </button>
            <span className="  flex rounded-md  text-nav font-semibold text-lg ">
              {productCount}
            </span>
            <button className="text-slate-500  " onClick={minusProducts}>
              <Minus size={18} />
            </button>
          </div>
        ) : (
          <div>
            <button
              className="w-28 px-2 rounded-md h-9 text-sm bg-nav text-white hover:bg-[#4385f0]"
              onClick={addProducts}
            >
              Add
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;
