import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Register from "./pages/Register";
import { Login } from "./pages/LoginPage";
import { HomePage } from "./pages/HomePage";

function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </>
  );
}

export default App;
