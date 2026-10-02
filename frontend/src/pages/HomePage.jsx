import { CategoryBar } from "../components/CategoryBar";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { SearchBar } from "../components/SearchBar";
import { Loading } from "../components/Loading";
import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Footer } from "../components/Footer";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [search, setSearch] = useState("");
  const [searching, setSearching] = useState(false);
  const [loading, setLoading] = useState(true);

  const trendingRef = useRef(null);
  const electronicsRef = useRef(null);

  const scrollCarousel = (ref, direction) => {
    if (!ref.current) return;

    ref.current.scrollBy({
      left: direction === "right" ? 500 : -500,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [productsRes, electronicsRes] = await Promise.all([
          axios.get(`${import.meta.env.VITE_API_URL}/useraction/alllistings`),

          axios.get(`${import.meta.env.VITE_API_URL}/useraction/category/electronics`),
        ]);

        setProducts(productsRes.data);
        setElectronics(electronicsRes.data);
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        setSearching(false);

        const res = await axios.get(
          `${import.meta.env.VITE_API_URL}/useraction/alllistings`,
        );

        setProducts(res.data);
        return;
      }

      setSearching(true);

      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}/useraction/search?q=${encodeURIComponent(
          query,
        )}`,
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };
  if (loading) {
    return <Loading />;
  }
  return (
    <div className="p-2">
      <Navbar onSearch={handleSearch} />
      <div className="mt-[151px] md:mt-20 sticky top-[151px] md:top-20 z-40 bg-white">
        <CategoryBar />
      </div>

      {/* Hero image */}

      <div className="max-w-7xl mx-auto  rounded-4xl px-2  md:pt-10 md:px-0">
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

        {/* <div className="flex overflow-x-auto gap-4 mt-4 scrollbar-hide">
          {products.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div> */}

        <div className="relative mt-4">
          <div
            ref={trendingRef}
            className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
          >
            {products.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel(trendingRef, "left")}
            className="absolute left-2 top-1/2 -translate-y-1/2
               w-10 h-10 rounded-full bg-white shadow-lg border
               flex items-center justify-center
               text-xl font-bold hover:bg-gray-100 z-10"
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel(trendingRef, "right")}
            className="absolute right-2 top-1/2 -translate-y-1/2
               w-10 h-10 rounded-full bg-white shadow-lg border
               flex items-center justify-center
               text-xl font-bold hover:bg-gray-100 z-10"
          >
            →
          </button>
        </div>
      </div>

      {/*Electronics  */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">Electronics</h2>

          <button>View All →</button>
        </div>

        {/* <div className="flex overflow-x-auto gap-4 mt-4 scrollbar-hide">
          {electronics.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div> */}
        <div className="relative mt-4">
          <div
            ref={electronicsRef}
            className="flex overflow-x-auto gap-4 scrollbar-hide scroll-smooth"
          >
            {electronics.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel(electronicsRef, "left")}
            className="absolute left-2 top-1/2 -translate-y-1/2
               w-10 h-10 rounded-full bg-white shadow-lg border
               flex items-center justify-center
               text-xl font-bold hover:bg-gray-100 z-10 "
          >
            ←
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel(electronicsRef, "right")}
            className="absolute right-2 top-1/2 -translate-y-1/2
               w-10 h-10 rounded-full bg-white shadow-lg border
               flex items-center justify-center
               text-xl font-bold hover:bg-gray-100 z-10 "
          >
            →
          </button>
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
          grid-cols-2
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
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
}
