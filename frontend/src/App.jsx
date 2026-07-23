import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";
import { ProductPage } from "./pages/ProductPage";
import { AddtoCart } from "./pages/AddtoCart";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/productpage/:id" element={<ProductPage />} />
        <Route path="/cart" element={<AddtoCart/> }/>
      </Routes>
    </>
  );
}

export default App;
