interface ProductProps {
  productId: number | string;
  title: string;
  price: number;
  discountPercent: number;
  rating: number;
  thumbnail: string;
}
import { Minus, Plus } from "lucide-react";
import { useSelector, useDispatch } from "react-redux";
import { add, remove } from "../lib/cartSlice";
import { themeContext } from "../lib/theme.jsx";
import { useContext } from "react";

const ProductCard = ({
  productId,
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

  // let productCount = 1;

  const cartVal = useSelector((state) => state.cartState.value);

  // console.log(cartVal);

  let productCount =
    cartVal.find((item) => item.id == productId)?.quantity ?? 0;

  const addProducts = () => {
    // setProductCount((prev) => prev + 1);
    dispatch(add(productId));
    localStorage.setItem("cartVal", JSON.stringify(cartVal));
  };

  const minusProducts = () => {
    dispatch(remove(productId));
    localStorage.setItem("cartVal", JSON.stringify(cartVal));

    // dispatch(reset());
    // setProductCount((prev) => prev - 1);
  };

  const { theme, setTheme } = useContext(themeContext);

  return (
    <div
      // className={`h-106 flex-col justify-between ${theme == "dark" ? "bg-zinc-950" : "bg-white"}`}
      className={`h-106 flex-col justify-between bg-background text-foreground`}
    >
      <div>
        <div className=" w-full h-auto flex justify-center items-center object-cover rounded-2xl bg-zinc-100 hover:shadow-xl">
          <img className="w-[90%] h-[90%]" src={thumbnail} />
        </div>
        <div className="h-24 px-3">
          {" "}
          <div className="text-xl text-muted font-semibold mt-3 "> {title}</div>
          <div>
            <span> ${price}</span>
            {discountPercent ? (
              <>
                <span className="text-muted line-through mx-2">
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
      </div>

      {/* <div>
        {" "}
        <span onClick={addProducts}> hehehehehe</span>
      </div> */}

      <div className="mx-2 my-4 h-9">
        {productCount ? (
          <div className="flex w-28 px-2 h-9 items-center rounded-md text-sm border shadow-sm border-slate-400 justify-between">
            {" "}
            <button className=" text-muted  " onClick={addProducts}>
              <Plus size={18} />
            </button>
            <span className="  flex rounded-md  text-nav font-semibold text-lg ">
              {productCount}
            </span>
            <button className="text-muted  " onClick={minusProducts}>
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
