// function App() {
//   return (
//     <>
//       <Routes>
//         {/* User Routes */}
//         <Route path="/" element={<HomePage />} />
//         <Route path="/register" element={<Register />} />
//         <Route path="/login" element={<Login />} />
//         <Route path="/productpage/:id" element={<ProductPage />} />
//         <Route path="/cart" element={<AddtoCart />} />
//         <Route path="/address" element={<AddressTakingPage />} />
//         <Route path="/payment" element={<PaymentPage />} />
//         <Route path="/myorder" element={<MyOrder />} />
//         <Route path="/search" element={<SearchPage />} />
//         <Route path="/category/:category" element={<CategoryProductPage />} />

//         {/* Admin Routes */}
//         <Route path="/admindashboard" element={<AdminDashboard />} />
//         <Route path="/adminallorderlist" element={<Allorders />} />
//         <Route path="/addproduct" element={<AddProductPage />} />
//         <Route path="/adminallproduct" element={<AdminAllProduct />} />
//         <Route path="/editproduct/:id" element={<AdminEditProduct />} />
//       </Routes>
//     </>
//   );
// }

// export default App;

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
import { ProtectedRoute } from "./pages/ProtectedRoute";
import { AdminRoute } from "./pages/AdminRoute";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      {/* ================= USER ROUTES ================= */}

      <Route path="/" element={<HomePage />} />

      <Route path="/register" element={<Register />} />

      <Route path="/login" element={<Login />} />

      <Route path="/productpage/:id" element={<ProductPage />} />

      <Route
        path="/cart"
        element={
          <ProtectedRoute>
            <AddtoCart />
          </ProtectedRoute>
        }
      />

      <Route
        path="/address"
        element={
          <ProtectedRoute>
            <AddressTakingPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/payment"
        element={
          <ProtectedRoute>
            <PaymentPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/myorder"
        element={
          <ProtectedRoute>
            <MyOrder />
          </ProtectedRoute>
        }
      />

      <Route path="/search" element={<SearchPage />} />

      <Route path="/category/:category" element={<CategoryProductPage />} />

      {/* Admin only */}

      <Route
        path="/admindashboard"
        element={
          <AdminRoute>
            <AdminDashboard />
          </AdminRoute>
        }
      />

      <Route
        path="/adminallorderlist"
        element={
          <AdminRoute>
            <Allorders />
          </AdminRoute>
        }
      />

      <Route
        path="/addproduct"
        element={
          <AdminRoute>
            <AddProductPage />
          </AdminRoute>
        }
      />

      <Route
        path="/adminallproduct"
        element={
          <AdminRoute>
            <AdminAllProduct />
          </AdminRoute>
        }
      />

      <Route
        path="/editproduct/:id"
        element={
          <AdminRoute>
            <AdminEditProduct />
          </AdminRoute>
        }
      />

      <Route path="*" element={<NotFound />} />
    </Routes>

    
  );
}

export default App;
