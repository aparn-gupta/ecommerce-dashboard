import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useState } from "react";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [mode, setMode] = useState("light");

  const cartVal = useSelector((state) => state.cartState.value);

  const totalQuantity = cartVal.reduce((acc, curr) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <div>
      <div className="w-screen  mx-auto h-18 shadow-md flex justify-between px-8 bg-nav items-center ">
        <div className="text-yellow-300 font-bold">LOGO</div>
        <div className=""></div>
        <div className="text-white flex h-full items-center gap-x-5">
          <div>{mode == "light" ? <Sun /> : <Moon />}</div>

          <span>{totalQuantity}</span>

          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
