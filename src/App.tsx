import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import { useEffect, useContext } from "react";
import { themeContext } from "./lib/theme.jsx";
import CategoryPage from "./pages/CategoryPage.js";
import CartPage from "./pages/CartPage.js";
import ProductsPage from "./pages/ProductPage.js";

// import { setCart } from "./lib/cartSlice.js";
// import { useDispatch } from "react-redux";

function App() {
  const { setTheme } = useContext(themeContext);

  // const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    console.log(storedTheme);

    if (storedTheme == "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      setTheme("light");
    }
  }, []);

  return (
    <div className="bg-background text-foreground">
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CategoryPage />} />
          <Route path="/category/:name?" element={<ProductsPage />} />
          <Route path="/checkout" element={<CartPage />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
