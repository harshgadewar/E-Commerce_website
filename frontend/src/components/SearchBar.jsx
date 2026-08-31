import { useState } from "react";
import { FiSearch } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

export function SearchBar() {
  const [query, setQuery] = useState("");

  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();

    if (!query.trim()) {
      return;
    }

    navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  return (
    <form onSubmit={handleSearch} className="relative w-full">
      <FiSearch
        className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500"
        size={18}
      />

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Search products, brands and categories..."
        className="
          w-full
          border
          border-gray-300
          rounded-2xl
          py-3
          pl-12
          pr-4
          outline-none
          focus:border-blue-500
        "
      />
    </form>
  );
}
