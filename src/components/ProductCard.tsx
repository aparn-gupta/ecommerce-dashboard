interface ProductProps {
  title: string;
  price: number;
  discountPercent: number;
  rating: number;
  thumbnail: string;
}

const ProductCard = ({
  title,
  price,
  discountPercent,
  thumbnail,
}: ProductProps) => {
  const calcOriginalPrice = (givenPrice: number, percentage: number) => {
    if (!givenPrice) return "NA";
    return ((givenPrice * 100) / (100 - percentage)).toFixed(2);
  };

  return (
    <div>
      <div className=" w-full h-auto flex justify-center items-center object-cover rounded-2xl bg-zinc-100 hover:shadow-xl">
        <img className="w-[90%] h-[90%]" src={thumbnail} />
      </div>
      <div className="text-xl text-slate-500 font-semibold mt-3"> {title}</div>
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

      {/* <div>
        {" "}
        <span> {rating}</span>
      </div> */}

      <div className="w-full capitalize p-2 text-xl"></div>
    </div>
  );
};

export default ProductCard;
