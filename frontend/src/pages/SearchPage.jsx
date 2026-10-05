import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { api } from "../api/axios";

import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";

export function SearchPage() {
  const [searchParams] = useSearchParams();

  const query = searchParams.get("q") || "";

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const searchProducts = async () => {
      try {
        const res = await api.get(
          `/useraction/search?q=${encodeURIComponent(query)}`,
        );

        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };

    if (query.trim()) {
      searchProducts();
    } else {
      setProducts([]);
    }
  }, [query]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-50 py-8 md:mt-20 mt-35">
        <div className="max-w-7xl mx-auto px-4">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900">Search Results</h1>

            <p className="text-gray-500 mt-2">
              Results for{" "}
              <span className="font-semibold text-gray-800">"{query}"</span>
            </p>
          </div>

          {!query.trim() ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                Search for a product
              </h2>

              <p className="text-gray-500 mt-2">
                Enter a product name to start searching.
              </p>
            </div>
          ) : products.length === 0 ? (
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h2 className="text-2xl font-semibold text-gray-800">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                Try searching for something else.
              </p>
            </div>
          ) : (
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
          )}
        </div>
      </div>
    </>
  );
}
