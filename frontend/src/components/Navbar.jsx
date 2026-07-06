import { FiSearch, FiHeart, FiShoppingCart, FiUser } from "react-icons/fi";
import logo from "/image.png";

export function Navbar() {
  return (
    <nav className="w-full  h-18 b bg-[#F2F3F2]">
      <div className="flex justify-between items-center max-w-7xl mx-auto px-6 py-4   items-center ">
        {/* Logo */}
        <div className="gap-3 flex items-center mr-4 pr-2 md:pr-10">
          <img src={logo} alt="Velora" className="h-12 w-auto" />
        </div>

        <div className=" hidden md:flex w-full md:max-w-3xl mx-2 md:mx-10">
          <div className="relative w-full">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={15}
            />

            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="w-full border border-gray-300 rounded-2xl py-3 pl-14 pr-4 text-1xl outline-none focus:border-blue-500"
            />
          </div>
        </div>
        {/* Right Section */}
        <div className="hidden md:flex items-center gap-10 ">
          <div className="flex items-center gap-2 cursor-pointer">
            <FiHeart size={20} />
            <span className="text-1xl">Wishlist</span>
          </div>

          <div className="relative flex items-center gap-2 cursor-pointer">
            <FiShoppingCart size={20} />

            <span className="absolute -top-2 left-4 bg-orange-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
              8
            </span>

            <span className="text-1xl">Cart</span>
          </div>

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

      <div className="flex md:hidden justify-center">
        {/* Search Bar */}
        <div className="flex-1  w-full md:max-w-3xl mx-2 md:mx-10">
          <div className="relative ">
            <FiSearch
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
              size={15}
            />

            <input
              type="text"
              placeholder="Search products, brands and categories..."
              className="w-full border border-gray-300 rounded-2xl py-3 pl-14 pr-4 text-1xl outline-none focus:border-blue-500"
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
