import { CategoryBar } from "../components/CategoryBar";
import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { api } from "../api/axios";

import { Footer } from "../components/Footer";

export function HomePage() {
  const [products, setProducts] = useState([]);
  const [electronics, setElectronics] = useState([]);
  const [searching, setSearching] = useState(false);

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
        const [productsRes, electronicsRes] = await Promise.all([
          api.get("/useraction/alllistings"),

          api.get(
            "/useraction/category/electronics",
          ),
        ]);

        setProducts(productsRes.data);
        setElectronics(electronicsRes.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, []);

  const handleSearch = async (query) => {
    try {
      if (!query.trim()) {
        setSearching(false);

        const res = await api.get(
          "/useraction/alllistings",
        );

        setProducts(res.data);
        return;
      }

      setSearching(true);

      const res = await api.get(
        `/useraction/search?q=${encodeURIComponent(
          query,
        )}`,
      );

      setProducts(res.data);
    } catch (err) {
      console.log(err);
    }
  };

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
            className="
    absolute
    left-[-14px]
    top-1/2
    -translate-y-1/2
    w-9
    h-9
    rounded-full
    bg-gray-500
    text-white
    shadow-xl
    border-2
    border-white
    flex
    items-center
    justify-center
    hover:bg-gray-700
    hover:scale-110
    transition-all
    duration-200
    z-20
  "
          >
            <ChevronLeft size={19} strokeWidth={2.5} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel(trendingRef, "right")}
            className="
    absolute
    right-[-14px]
    top-1/2
    -translate-y-1/2
    w-9
    h-9
    rounded-full
    bg-gray-500
    text-white
    shadow-xl
    border-2
    border-white
    flex
    items-center
    justify-center
    hover:bg-gray-700
    hover:scale-110
    transition-all
    duration-200
    z-20
  "
          >
            <ChevronRight size={19} strokeWidth={2.5} />
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
          {/* Left Arrow */}
          <button
            onClick={() => scrollCarousel(trendingRef, "left")}
            className="
    absolute
    left-[-14px]
    top-1/2
    -translate-y-1/2
    w-9
    h-9
    rounded-full
    bg-gray-500
    text-white
    shadow-xl
    border-2
    border-white
    flex
    items-center
    justify-center
    hover:bg-gray-700
    hover:scale-110
    transition-all
    duration-200
    z-20
  "
          >
            <ChevronLeft size={19} strokeWidth={2.5} />
          </button>

          {/* Right Arrow */}
          <button
            onClick={() => scrollCarousel(trendingRef, "right")}
            className="
    absolute
    right-[-14px]
    top-1/2
    -translate-y-1/2
    w-9
    h-9
    rounded-full
    bg-gray-500
    text-white
    shadow-xl
    border-2
    border-white
    flex
    items-center
    justify-center
    hover:bg-gray-700
    hover:scale-110
    transition-all
    duration-200
    z-20
  "
          >
            <ChevronRight size={19} strokeWidth={2.5} />
          </button>
        </div>
      </div>

      {/* All Products */}

      <div className="max-w-7xl mx-auto mt-10 px-2 md:px-0">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold">All Products</h2>

          <button>View All →</button>
        </div>

        <div
          className="
      flex
      flex-wrap
      justify-start
      gap-4
      mt-6
    "
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
