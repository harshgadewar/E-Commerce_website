import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

import { Navbar } from "../components/Navbar";
import { CategoryBar } from "../components/CategoryBar";
import { ProductCard } from "../components/ProductCard";

export function CategoryProductPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        setLoading(true);

        const res = await axios.get(
          `http://localhost:8080/useraction/category/${encodeURIComponent(
            category,
          )}`,
        );

        console.log("Category products:", res.data);

        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <>
      <Navbar />

      <div className="sticky top-20 z-40 bg-white">
        <CategoryBar />
      </div>

      <div className="min-h-screen bg-slate-50 py-8 mt-10 pt-10">
        <div className="max-w-7xl mx-auto px-4">
          {/* Header */}

          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category}</h1>

              <p className="text-gray-500 mt-1">
                Explore our {category.toLowerCase()} products
              </p>
            </div>

            <p className="text-gray-500">{products.length} products</p>
          </div>

          {/* Loading */}

          {loading && (
            <div className="flex justify-center py-20">
              <p className="text-gray-500">Loading products...</p>
            </div>
          )}

          {/* Empty */}

          {!loading && products.length === 0 && (
            <div className="bg-white rounded-xl p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                There are no products in this category yet.
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
                md:grid-cols-5
                lg:grid-cols-5
                
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
