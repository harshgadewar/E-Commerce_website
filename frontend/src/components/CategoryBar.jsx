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
  mx-auto
  border-y border-gray-200
  h-12
  gap-8
  px-4
  overflow-x-auto
  whitespace-nowrap
  bg-white scrollbar-hide
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
