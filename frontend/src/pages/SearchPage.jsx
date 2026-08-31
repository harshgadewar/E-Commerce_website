import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8080/useraction/search?q=${encodeURIComponent(
            query,
          )}`,
        );

        console.log("Search results:", res.data);

        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    if (query.trim()) {
      searchProducts();
    } else {
      setProducts([]);
      setLoading(false);
    }
  }, [query]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>

            <p className="text-gray-500 mt-2">
              Results for{" "}
              <span className="font-semibold text-gray-800">"{query}"</span>
            </p>
          </div>

          {/* Loading */}
          {loading && (
            <div className="text-center py-20">
              <p className="text-gray-500">Searching products...</p>
            </div>
          )}

          {/* No products */}
          {!loading && products.length === 0 && (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching for something else.
              </p>
            </div>
          )}

          {/* Products */}
          {!loading && products.length > 0 && (
            <div
              className="
                grid
                grid-cols-2
                sm:grid-cols-3
                md:grid-cols-4
                lg:grid-cols-5
                gap-5
              "
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
