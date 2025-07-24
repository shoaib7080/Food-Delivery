import React, { useContext } from "react";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import { Route, Routes, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import Footer from "./components/Footer.jsx";
import { AppContext, useAppContext } from "./context/AppContext.jsx";
import Login from "./components/Login.jsx";
import AllProducts from "./pages/AllProducts.jsx";
import ProductCategory from "./pages/ProductCategory.jsx";
import ProductDetails from "./pages/ProductDetails.jsx";

const App = () => {
  const isSellerPath = useLocation().pathname.includes("seller");
  const { showUserLogin } = useAppContext();

  return (
    <div>
      {isSellerPath ? "" : <Navbar />}
      {showUserLogin && <Login />}
      <Toaster />
      <div className={`${isSellerPath ? "" : "px-6 md:px-16 lg:px24 xl:32"}`}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<AllProducts />} />
          <Route path="/products/:category" element={<ProductCategory />} />
          <Route path="/products/:category/:id" element={<ProductDetails />} />
        </Routes>
      </div>
      {!isSellerPath && <Footer />}
    </div>
  );
};

export default App;
