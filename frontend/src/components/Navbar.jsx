// import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
// import logo from "/veloraaaalogo.png";
// import { SearchBar } from "./SearchBar";
// import { Link } from "react-router-dom";

// export function Navbar({ onSearch }) {
//   return (
//     <nav className="fixed top-0 left-0 w-full  bg-white z-50 shadow-sm">
//       <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4   items-center ">
//         <div className="flex items-center w-50 mr-4 mt-2">
//           <img src={logo} alt="Velora" className="w-50 h-auto object-contain" />
//         </div>

//         {/*search bar  */}

//         <div className="hidden md:flex w-full md:max-w-3xl mx-2 md:mx-10">
//           <SearchBar onSearch={onSearch} />
//         </div>

//         {/* Right Section */}
//         <div className="hidden md:flex items-center gap-10 ">
//           <Link
//             to={"/myorder"}
//             className="flex items-center gap-2 cursor-pointer"
//           >
//             <span className="text-1xl">MyOrders</span>
//           </Link>

//           <Link
//             to={"/cart"}
//             className="relative flex items-center gap-2 cursor-pointer"
//           >
//             <FiShoppingCart size={20} />

//             <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               8
//             </span>

//             <span className="text-1xl">Cart</span>
//           </Link>

//           <div className="relative">
//             <FiUser size={20} />

//             <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               1
//             </span>
//           </div>
//         </div>

//         {/* for mobile view */}
//         <div className="flex md:hidden gap-2">
//           <div className="relative flex items-center gap-2 cursor-pointer mr-3">
//             <FiShoppingCart size={24} />

//             <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               8
//             </span>
//           </div>

//           <div className="relative">
//             <FiUser size={24} />

//             <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
//               1
//             </span>
//           </div>
//         </div>
//       </div>

//       <div className="flex-1 w-full md:hidden mx-2 md:mx-10">
//         <SearchBar onSearch={onSearch} />
//       </div>
//     </nav>
//   );
// }

import {
  FiSearch,
  FiShoppingCart,
  FiUser,
  FiLogOut,
  FiPackage,
  FiSettings,
  FiShield,
} from "react-icons/fi";

import logo from "/veloraaaalogo.png";
import { SearchBar } from "./SearchBar";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext";

export function Navbar({ onSearch }) {
  const [profileOpen, setProfileOpen] = useState(false);

  const { user, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:8080/logout", {
        withCredentials: true,
      });

      // Remove user from React state
      setUser(null);

      // Close dropdown
      setProfileOpen(false);

      // Go to login
      navigate("/login");
    } catch (error) {
      console.log("Logout error:", error.response?.data || error.message);
    }
  };

  return (
    <nav className="fixed top-0 left-0 w-full bg-white z-50 shadow-sm">
      {/* ================= NAVBAR ================= */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4">
        {/* LOGO */}

        <Link to={"/"} className="flex items-center w-50 mr-4 mt-2">
          <img src={logo} alt="Velora" className="w-50 h-auto object-contain" />
        </Link>

        {/* SEARCH */}
        <div className="hidden md:flex w-full md:max-w-3xl mx-2 md:mx-10">
          <SearchBar onSearch={onSearch} />
        </div>

        {/* ================= DESKTOP RIGHT SECTION ================= */}
        <div className="hidden md:flex items-center gap-10">
          {/* MY ORDERS */}
          <Link
            to="/myorder"
            className="flex items-center gap-2 cursor-pointer hover:text-gray-600"
          >
            <FiPackage size={20} />
            <span>MyOrders</span>
          </Link>

          {/* CART */}
          <Link
            to="/cart"
            className="relative flex items-center gap-2 cursor-pointer hover:text-gray-600"
          >
            <FiShoppingCart size={20} />

          

            <span>Cart</span>
          </Link>

          {/* USER PROFILE */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="relative cursor-pointer"
            >
              <FiUser size={22} />
            </button>

            {/* PROFILE DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 top-10 w-64 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                {/* USER INFO */}
                <div className="px-4 py-4 bg-gray-50 border-b">
                  <p className="font-semibold text-gray-900">
                    {user?.name || "User"}
                  </p>

                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* MY ORDERS */}
                <Link
                  to="/myorder"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FiPackage size={18} />
                  <span>My Orders</span>
                </Link>

                {/* ADMIN PANEL */}
                {user?.role === "admin" && (
                  <Link
                    to="/admindashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiShield size={18} />
                    <span>Admin Panel</span>
                  </Link>
                )}

             

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 border-t text-left"
                >
                  <FiLogOut size={18} />
                  <span>Logout</span>
                </button>
              </div>
            )}
          </div>
        </div>

        {/* ================= MOBILE ================= */}
        <div className="flex md:hidden gap-5">
          {/* MOBILE CART */}
          <Link
            to="/cart"
            className="relative flex items-center cursor-pointer"
          >
            <FiShoppingCart size={24} />
          </Link>

          {/* MOBILE USER */}
          <div className="relative">
            <button
              onClick={() => setProfileOpen(!profileOpen)}
              className="cursor-pointer"
            >
              <FiUser size={24} />
            </button>

            {/* MOBILE DROPDOWN */}
            {profileOpen && (
              <div className="absolute right-0 top-12 z-[100] w-60 bg-white border border-gray-200 rounded-xl shadow-xl overflow-hidden">
                {/* USER INFO */}
                <div className="px-4 py-4 bg-gray-50 border-b">
                  <p className="font-semibold">{user?.name || "User"}</p>

                  <p className="text-sm text-gray-500 truncate">
                    {user?.email}
                  </p>
                </div>

                {/* ORDERS */}
                <Link
                  to="/myorder"
                  onClick={() => setProfileOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                >
                  <FiPackage size={18} />
                  My Orders
                </Link>

                {/* ADMIN */}
                {user?.role === "admin" && (
                  <Link
                    to="/admindashboard"
                    onClick={() => setProfileOpen(false)}
                    className="flex items-center gap-3 px-4 py-3 hover:bg-gray-100"
                  >
                    <FiShield size={18} />
                    Admin Panel
                  </Link>
                )}

                {/* my order */}
                <button
                  onClick={() => setProfileOpen(false)}
                  className="w-full flex items-center gap-3 px-4 py-3 hover:bg-gray-100 text-left"
                >
                  <FiPackage size={18} />
                  My Orders
                </button>

                {/* LOGOUT */}
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center gap-3 px-4 py-3 text-red-500 hover:bg-red-50 border-t text-left"
                >
                  <FiLogOut size={18} />
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* MOBILE SEARCH */}
      <div className="flex-1 w-full md:hidden mx-2">
        <SearchBar onSearch={onSearch} />
      </div>
    </nav>
  );
}
