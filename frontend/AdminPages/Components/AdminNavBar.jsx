import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import logo from "/image.png";
import { Link } from "react-router-dom";

export function AdminNavbar() {
  return (
    <nav className="w-full  h-20 b bg-[#F2F3F2]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4   items-center ">
        {/* Logo */}
        <div className="gap-3 flex items-center mr-4 pr-2 md:pr-10">
          <img src={logo} alt="Velora" className="h-12 w-auto" />
        </div>

        {/* Right Section */}
        <div className="hidden md:flex items-center gap-10 ">
          <Link
            to={"/adminallproduct"}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span className="text-1xl">All Products</span>
          </Link>

          <Link
            to={"/adminallorderlist"}
            className="relative flex items-center gap-2 cursor-pointer"
          >
            <span className="text-1xl">Allorders</span>
          </Link>

          <div className="relative">
            <FiUser size={20} />

            <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
        </div>

        {/* for mobile view */}
        <div className="flex md:hidden gap-2">
          <div className="relative flex items-center gap-2 cursor-pointer mr-3">
            <FiShoppingCart size={24} />

            <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              8
            </span>
          </div>

          <div className="relative">
            <FiUser size={24} />

            <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              1
            </span>
          </div>
        </div>
      </div>
    </nav>
  );
}
