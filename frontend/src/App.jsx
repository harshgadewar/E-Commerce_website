import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { AddtoCart } from "./pages/AddtoCart";
import { AddressTakingPage } from "./pages/AddressPage";
import { PaymentPage } from "./pages/PaymentPage";
import { MyOrder } from "./pages/MyOrder";
import { AdminDashboard } from "../AdminPages/AdminDashboard";
import { Allorders } from "../AdminPages/Allorders";
import { AddProductPage } from "../AdminPages/AddProductPage";
import { AdminAllProduct } from "../AdminPages/AdminAllProduct";
import { AdminEditProduct } from "../AdminPages/AdminEditProduct";
import { SearchPage } from "./pages/SearchPage";
import { CategoryProductPage } from "./pages/CategoryProductPage";

function App() {
  return (
    <>
      <Routes>
        {/* User Routes */}
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/cart" element={<AddtoCart />} />
        <Route path="/address" element={<AddressTakingPage />} />
        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/myorder" element={<MyOrder />} />
        <Route path="/search" element={<SearchPage />} />
        <Route path="/category/:category" element={<CategoryProductPage />} />

        {/* Admin Routes */}
        <Route path="/admindashboard" element={<AdminDashboard />} />
        <Route path="/adminallorderlist" element={<Allorders />} />
        <Route path="/addproduct" element={<AddProductPage />} />
        <Route path="/adminallproduct" element={<AdminAllProduct />} />
        <Route path="/editproduct/:id" element={<AdminEditProduct />} />
      </Routes>
    </>
  );
}

export default App;
