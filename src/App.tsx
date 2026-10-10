import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductBody from "./category/CategoryPage";
import Dashboard from "./dashboard/DashboardBody";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import CheckoutPage from "./category/CheckoutPage.js";
import ThemeProvider from "./lib/theme.jsx";
import { useEffect, useContext } from "react";
import { themeContext } from "./lib/theme.jsx";

function App() {
  const { theme, setTheme } = useContext(themeContext);

  useEffect(() => {
    const storedTheme = localStorage.getItem("theme") || "light";

    if (storedTheme == "dark") {
      document.documentElement.classList.add("dark");
      setTheme("dark");
    } else {
      document.documentElement.classList.remove("dark");
      // setTheme("light");
    }
  });

  return (
    <div className="bg-background text-foreground">
      <Provider store={store}>
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
      </Provider>
    </div>
  );
}

export default App;
