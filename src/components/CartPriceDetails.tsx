import { useRef } from "react";
import { Skeleton } from "./ui/skeleton";

declare const Razorpay: any;

const CartPriceDetails = ({
  totalPrice,
  totalDiscount,
  totalAmount,
  loading,
}: {
  totalPrice?: number;
  totalDiscount?: number;
  totalAmount?: number;
  loading?: boolean;
}) => {
  const platformFee = 2.6;

  totalAmount = totalAmount ?? 0;

  const totalAmt = totalAmount + platformFee;

  const orderIdRef = useRef(null);

  const keyId = import.meta.env.VITE_RAZORPAY_KEY_ID;

  // console.log("keyId: " + keyId);

  const razorpayPaymentServer = `https://razorpay-payment-server.vercel.app`;

  const processPayment = async (e: any) => {
    const orderUrl = `${razorpayPaymentServer}/order`;

    try {
      const response = await fetch(orderUrl, {
        method: "POST",
        body: JSON.stringify({
          amount: Math.round(totalAmount),
          currency: "USD",
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });

      console.log({
        amount: Math.round(totalAmount),
        currency: "USD",
      });

      const data = await response.json();

      const orderId = data.result.id;

      orderIdRef.current = orderId;

      // console.log("orderId: " + orderIdRef.current);

      if (orderIdRef.current) {
        rzp1.open();
        e.preventDefault();
      }
    } catch (err) {
      console.error(err);
    }
  };

  let options = {
    key: keyId,
    amount: Math.round(totalAmt),
    currency: "USD",
    name: "Aparna Gupta",
    description: "Test Transaction",
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/004/753/002/small/custom-coding-icon-shadowed-detailed-custom-coding-logo-free-vector.jpg",
    order_id: orderIdRef.current,
    // handler: function (response: any) {
    //   alert(
    //     `${response.razorpay_payment_id} : ${response.razorpay_order_id} : ${response.razorpay_signature}`,
    //   );
    // },
    callback_url: `${razorpayPaymentServer}/api/payment/callback`,

    prefill: {
      name: "Arpana",
      email: "aparnagupta754@gmail.com",
      contact: "+918920168775",
    },
    notes: {
      address: "Razorpay Corporate Office",
    },
    theme: {
      color: "#3399cc",
    },
    redirect: true,
  };
  var rzp1 = new Razorpay(options);
  // rzp1.on("payment.failed", function (response: any) {
  //   alert(`${response.error.code} : ${response.error.description}`);
  //   console.log(
  //     response.error.source,
  //     response.error.step,
  //     response.error.reason,
  //     response.error.metadata.order_id,
  //     response.error.metadata.order_id,
  //     response.error.metadata.payment_id,
  //   );
  // });

  return (
    <div>
      {loading ? (
        <>
          {" "}
          <div className="w-full bg-background text-foreground p-4">
            <div className="w-full my-2">
              <Skeleton className="w-76 h-5" />
            </div>
            <div className="w-full my-2">
              {" "}
              <Skeleton className="w-76 h-5" />
            </div>

            <div className="w-full my-2">
              <Skeleton className="w-76 h-5" />
            </div>

            <div className="w-full my-2">
              {" "}
              <Skeleton className="w-76 h-5" />
            </div>
          </div>
          <div className="w-full bg-background text-foreground p-4 mt-3">
            <Skeleton className="w-76 h-8" />
          </div>
        </>
      ) : (
        <>
          {" "}
          <div className="w-full bg-background text-foreground p-4">
            <div className="w-full flex justify-between my-2">
              {" "}
              <span>Price: </span>{" "}
              <span className="font-semibold">${totalPrice}</span>
            </div>
            <div className="w-full flex justify-between my-2">
              {" "}
              <span>Discount: </span>{" "}
              <span className="font-semibold text-green-700">
                {totalDiscount}%
              </span>
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
              <button
                className="bg-green-700 w-full text-white rounded-md p-2 text-sm hover:bg-green-600"
                // onClick={(e) => {
                //   rzp1.open();
                //   e.preventDefault();
                // }}
                onClick={processPayment}
              >
                Proceed to Payment (${totalAmt.toFixed(2)})
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPriceDetails;
