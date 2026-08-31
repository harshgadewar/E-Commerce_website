import { CategoryBar } from "../components/CategoryBar";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { useState, useEffect } from "react";
import axios from "axios";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/useraction/alllistings",
        );
        setProducts(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    const fetchElectronics = async () => {
      try {
        const res = await axios.get(
          "http://localhost:8080/useraction/category/electronics",
        );

        setElectronics(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchProducts();
    fetchElectronics();
  }, []);

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        setSearching(false);

        const res = await axios.get(
          "http://localhost:8080/useraction/alllistings",
        );

        setProducts(res.data);
        return;
      }

      setSearching(true);

      const res = await axios.get(
        `http://localhost:8080/useraction/search?q=${encodeURIComponent(
          query,
        )}`,
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div>
      <Navbar onSearch={handleSearch} />
      <div className="sticky top-20 z-40 bg-white">
        <CategoryBar />
      </div>

      {/* Hero image */}

      <div className="max-w-7xl mx-auto  mt-10 rounded-4xl px-2 pt-10 md:px-0">
        <img
          src="/heroimgg.png"
          alt="hero"
          className="
            w-full
            h-[280px]
            object-cover
            rounded-3xl  
            "
        />
      </div>

      {/* Trending section */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Trending Products</h2>

          <button>View All →</button>
        </div>

        <div className="flex overflow-x-auto gap-4 mt-4 scrollbar-hide">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/*Electronics  */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Electronics</h2>

          <button>View All →</button>
        </div>

        <div className="flex overflow-x-auto gap-4 mt-4 scrollbar-hide">
          {electronics.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>

      {/* All product*/}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All products</h2>

          <button>View All →</button>
        </div>

        <div
          className="grid
          grid-cols-3
          sm:grid-cols-2
          md:grid-cols-3
          lg:grid-cols-8
          gap-1
          mt-6"
        >
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
}
