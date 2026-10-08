import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router";
import ProductBody from "./category/CategoryPage";
import Dashboard from "./dashboard/DashboardBody";
import { Provider } from "react-redux";
import { store } from "./lib/store";
import ThemeProvider from "./lib/theme.jsx";

function App() {
  return (
    <>
      <Provider store={store}>
        <ThemeProvider>
          <BrowserRouter>
            <Navbar />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/category/:name" element={<ProductBody />} />
            </Routes>
            <Footer />
          </BrowserRouter>
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default App;
