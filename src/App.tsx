import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductBody from "./category/CategoryPage";
import Dashboard from "./dashboard/DashboardBody";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import ThemeProvider from "./lib/theme.jsx";
import { useEffect, useContext } from "react";
import { themeContext } from "./lib/theme.jsx";
import CheckoutPage from "./checkout/CheckoutPage.js";
import { setCart } from "./lib/cartSlice.js";
import { useDispatch } from "react-redux";

function App() {
  const { theme, setTheme } = useContext(themeContext);

  const dispatch = useDispatch();

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme == "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      // setTheme("light");
    }
  }, []);

  useEffect(() => {
    const cartFromStorage = localStorage.getItem("cartVal");

    if (cartFromStorage) {
      let cartValParsed = JSON.parse(cartFromStorage);
      dispatch(setCart(cartValParsed));
    }
  }, []);

  return (
    <div className="bg-background text-foreground">
      {/* <Provider store={store}> */}
      <ThemeProvider>
        <BrowserRouter>
          <Navbar />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/category/:name" element={<ProductBody />} />
            <Route path="/checkout" element={<CheckoutPage />} />
          </Routes>
          <Footer />
        </BrowserRouter>
      </ThemeProvider>
      {/* </Provider> */}
    </div>
  );
}

export default App;
