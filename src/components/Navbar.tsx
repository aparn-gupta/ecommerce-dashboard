import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useState } from "react";

const Navbar = () => {
  const [mode, setMode] = useState("light");

  return (
    <div>
      <div className="w-screen  mx-auto h-18 shadow-md flex justify-between px-8 bg-nav items-center ">
        <div className="text-yellow-300 font-bold">LOGO</div>
        <div className=""></div>
        <div className="text-white flex h-full items-center gap-x-5">
          <div>{mode == "light" ? <Sun /> : <Moon />}</div>

          <ShoppingCart />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
