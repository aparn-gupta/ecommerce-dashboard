const CartPriceDetails = ({
  totalPrice,
  totalDiscount,
  totalAmount,
}: {
  totalPrice: number;
  totalDiscount: number;
  totalAmount: number;
}) => {
  const platformFee = 2.6;

  const totalAmt = totalAmount + platformFee;
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
          <span className="font-semibold text-green-700">{totalDiscount}%</span>
        </div>

        <div className="w-full flex justify-between my-2">
          {" "}
          <span>Platform fee: </span>{" "}
          <span className="font-semibold">${platformFee}</span>
        </div>

        <div className="border border-b border-muted my-3"></div>

        <div className="w-full flex justify-between my-2">
          {" "}
          <span>Total: </span>{" "}
          <span className="font-bold">${totalAmt.toFixed(2)}</span>
        </div>
      </div>

      <div className="w-full bg-background text-foreground p-4 mt-3">
        <div className="w-full flex justify-between my-2">
          <button className="bg-green-700 w-full text-white rounded-md p-2 text-sm hover:bg-green-600">
            Proceed to Payment ({totalAmt.toFixed(2)})
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPriceDetails;
