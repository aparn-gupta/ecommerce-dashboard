const CartPriceDetails = ({
  totalPrice,
  totalDiscount,
}: {
  totalPrice: number;
  totalDiscount: number;
}) => {
  return (
    <div>
      <div className="w-full bg-background text-foreground p-4">
        <div className="w-full flex justify-between my-2">
          {" "}
          <span>Price: </span>{" "}
          <span className="font-semibold">${totalPrice}</span>
        </div>
        <div className="w-full flex justify-between my-2">
          {" "}
          <span>Discount: </span>{" "}
          <span className="font-semibold">${totalDiscount}</span>
        </div>

        <div className="w-full flex justify-between my-2">
          {" "}
          <span>Platform: </span> <span className="font-semibold">${2.6}</span>
        </div>

        <div className="border border-b border-muted my-3"></div>
      </div>

      <div className="w-full bg-background text-foreground p-4 mt-3">
        <div className="w-full flex justify-between my-2">
          <button className="bg-green-700 w-full text-white rounded-md p-2 text-sm">
            Proceed to Payment ({totalPrice})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPriceDetails;
