import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { api } from "../api/axios";

import { Navbar } from "../components/Navbar";
import { CategoryBar } from "../components/CategoryBar";
import { ProductCard } from "../components/ProductCard";
import { Footer } from "../components/Footer";

export function CategoryProductPage() {
  const { category } = useParams();

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchCategoryProducts = async () => {
      try {
        const res = await api.get(
          `/useraction/category/${encodeURIComponent(
            category,
          )}`,
        );

        setProducts(res.data);
      } catch (err) {
        console.log(err);
        setProducts([]);
      }
    };

    fetchCategoryProducts();
  }, [category]);

  return (
    <>
      <Navbar />

      <div className="mt-[151px] md:mt-20 sticky top-[151px] md:top-20 z-40 bg-white">
        <CategoryBar />
      </div>

      <div className="min-h-screen bg-slate-50 py-8 mb-20">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">{category}</h1>

              <p className="text-gray-500 mt-1">
                Explore our {category.toLowerCase()} products
              </p>
            </div>

            <p className="text-gray-500">{products.length} products</p>
          </div>

          {products.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center">
              <h2 className="text-xl font-semibold text-gray-800">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                There are no products in this category yet.
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

      <Footer />
    </>
  );
}
