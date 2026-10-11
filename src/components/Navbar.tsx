import { Sun, Moon, ShoppingCart } from "lucide-react";
import { useContext } from "react";
import { useSelector } from "react-redux";
import { themeContext } from "../lib/theme.jsx";
import { Link } from "react-router";
import type { CartItemType } from "../lib/cartSlice.js";

const Navbar = () => {
  // const [mode, setMode] = useState("light");

  const { theme, setTheme } = useContext(themeContext);

  const cartVal = useSelector((state: any) => state.cartState.value);

  const totalQuantity = cartVal.reduce((acc: number, curr: CartItemType) => {
    return acc + curr.quantity;
  }, 0);

  return (
    <div>
      <div className="w-screen  mx-auto h-18 shadow-md flex justify-between px-8 bg-nav items-center ">
        <Link to="/">
          {" "}
          <div className="text-yellow-300 font-bold">LOGO</div>
        </Link>
        <div className=""></div>
        <div className="text-white flex h-full items-center gap-x-5">
          <div
            onClick={() =>
              setTheme((prev) => {
                if (prev == "light") {
                  document.documentElement.classList.add("dark");
                  localStorage.setItem("theme", "dark");
                  return "dark";
                } else {
                  document.documentElement.classList.remove("dark");
                  localStorage.setItem("theme", "light");
                  return "light";
                }
              })
            }
          >
            {theme == "light" ? <Sun /> : <Moon />}
          </div>

          <Link to={"/checkout"}>
            <div className="relative h-18 flex justify-center items-center  w-6">
              <span className="absolute top-4 -right-4  text-white rounded-full w-5 h-5 text-xs z-10 flex justify-center items-center bg-green-600">
                {totalQuantity}
              </span>

              <span className="absolute z-0  left-0">
                {" "}
                <ShoppingCart color="white" />
              </span>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
