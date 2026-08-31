// import { Link } from "react-router-dom";

// import {
//   FiHome,
//   FiSmartphone,
//   FiShoppingBag,
//   FiCoffee,
//   FiGift
// } from "react-icons/fi";

// export function CategoryBar() {
//   return (
//     <nav className="flex items-center max-w-7xl mt-20 md:mt-2 mx-auto border-y border-gray-300 h-14 gap-10 px-4 overflow-x-auto">

// <Link to="/" className="text-lg font-medium">All</Link>

//       <Link to="/category/cafe" className="text-lg  font-medium text-gray-700">Cafe</Link>

//       <Link to="/category/home" className="text-lg font-medium text-gray-700"> Home</Link>

//       <Link to="/category/toys" className="text-lg font-medium text-gray-700">Toys</Link>

//       <Link to="/category/fresh" className="text-lg font-medium text-gray-700">Fresh</Link>

//       <Link to="/category/electronics" className="text-lg font-medium text-gray-700">Electronics</Link>

//       <Link to="/category/mobiles" className="text-lg font-medium text-gray-700">Mobiles</Link>

//       <Link to="/category/beauty" className="text-lg font-medium text-gray-700">Beauty</Link>

//       <Link to="/category/fashion" className="text-lg font-medium text-gray-700">Fashion</Link>

//     </nav>
//   );
// }

import { Link } from "react-router-dom";

export function CategoryBar() {
  const categories = [
    "Electronics",
    "Computers",
    "Mobiles",
    "Gaming",
    "Grocery",
    "Beauty",
    "Home",
    "fashion",
  ];

  return (
    <nav
      className="
        flex items-center
        max-w-7xl
        mt-20 md:mt-2
        mx-auto
        border-y border-gray-300
        h-14
        gap-10
        px-4
        overflow-x-auto
      "
    >
      {/* All */}
      <Link to="/" className="text-lg font-medium text-gray-700">
        All
      </Link>

      {/* Categories */}
      {categories.map((category) => (
        <Link
          key={category}
          to={`/category/${category}`}
          className="
            text-lg font-medium text-gray-700
          "
        >
          {category.charAt(0).toUpperCase() + category.slice(1)}
        </Link>
      ))}
    </nav>
  );
}
