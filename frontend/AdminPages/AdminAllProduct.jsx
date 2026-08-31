import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { AdminNavbar } from "./Components/AdminNavbar";

export function AdminAllProduct() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchProducts = async () => {
    try {
      const res = await axios.get(
        "http://localhost:8080/admin/adminviewallproductt",
        {
          withCredentials: true,
        },
      );

      setProducts(res.data.data);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this product?",
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(`http://localhost:8080/admin/deleteproduct/${id}`, {
        withCredentials: true,
      });

      // Remove deleted product immediately from UI
      setProducts((prev) => prev.filter((product) => product._id !== id));
    } catch (e) {
      console.log(e);
      alert("Failed to delete product");
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-slate-50 px-4 py-6 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="mb-6 flex items-center justify-between">
            <h1 className="text-2xl font-bold text-gray-900">All Products</h1>

            <Link
              to="/addproduct"
              className="bg-blue-900 hover:bg-blue-800 px-4 py-2 text-white rounded-lg"
            >
              + Add Product
            </Link>
          </div>

          {/* Loading */}
          {loading ? (
            <div className="bg-white rounded-xl shadow p-8 text-center">
              <p className="text-gray-500">Loading products...</p>
            </div>
          ) : products.length === 0 ? (
            /* No products */
            <div className="bg-white rounded-xl shadow p-10 text-center">
              <h2 className="text-xl font-semibold text-gray-700">
                No products found
              </h2>

              <p className="text-gray-500 mt-2">
                Add your first product to get started.
              </p>
            </div>
          ) : (
            /* Table */
            <div className="bg-white rounded-xl shadow overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full min-w-[900px]">
                  {/* Table Header */}
                  <thead className="bg-gray-100 border-b">
                    <tr>
                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Product
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Price
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Stock
                      </th>

                      <th className="px-6 py-4 text-left text-sm font-semibold text-gray-600">
                        Status
                      </th>

                      <th className="px-6 py-4 text-center text-sm font-semibold text-gray-600">
                        Actions
                      </th>
                    </tr>
                  </thead>

                  {/* Table Body */}
                  <tbody className="divide-y">
                    {products.map((product) => (
                      <tr key={product._id} className="hover:bg-gray-50">
                        {/* Product */}
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden">
                              <img
                                src={product.image}
                                alt={product.title}
                                className="w-full h-full object-contain"
                              />
                            </div>

                            <div>
                              <h3 className="font-semibold text-gray-900">
                                {product.title}
                              </h3>

                              <p className="text-sm text-gray-500 max-w-xs truncate">
                                {product.description}
                              </p>
                            </div>
                          </div>
                        </td>

                        {/* Price */}
                        <td className="px-6 py-4">
                          <span className="font-semibold">
                            ₹{product.price}
                          </span>
                        </td>

                        {/* Stock */}
                        <td className="px-6 py-4">
                          <span
                            className={
                              product.stockQuantity === 0
                                ? "text-red-600 font-semibold"
                                : "text-gray-700"
                            }
                          >
                            {product.stockQuantity}
                          </span>
                        </td>

                        {/* Status */}
                        <td className="px-6 py-4">
                          {product.stockQuantity === 0 ? (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">
                              Out of Stock
                            </span>
                          ) : (
                            <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">
                              Available
                            </span>
                          )}
                        </td>

                        {/* Actions */}
                        <td className="px-6 py-4">
                          <div className="flex justify-center gap-2">
                            <Link
                              to={`/editproduct/${product._id}`}
                              className="px-3 py-1.5 rounded-lg bg-blue-100 text-blue-700 hover:bg-blue-200 text-sm font-medium"
                            >
                              Edit
                            </Link>

                            <button
                              onClick={() => handleDelete(product._id)}
                              className="px-3 py-1.5 rounded-lg bg-red-100 text-red-700 hover:bg-red-200 text-sm font-medium"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
