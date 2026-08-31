import { useState } from "react";
import axios from "axios";
import { AdminNavbar } from "./Components/AdminNavbar";

export function AddProductPage() {
  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stockQuantity: "",
  });

  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle text inputs
  const handleChange = (e) => {
    setProduct({
      ...product,
      [e.target.name]: e.target.value,
    });
  };

  // Handle image
  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (!file) return;

    setImage(file);

    // Image preview
    setPreview(URL.createObjectURL(file));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stockQuantity", product.stockQuantity);
      formData.append("category", product.category);
      formData.append("image", image);

      const res = await axios.post(
        "http://localhost:8080/admin/addproduct",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log(res.data);

      alert("Product added successfully!");

      // Clear form
      setProduct({
        title: "",
        description: "",
        price: "",
        stockQuantity: "",
      });

      setImage(null);
      setPreview(null);
    } catch (error) {
      console.error(error);

      alert(error.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen py-10">
        <div className="max-w-3xl mx-auto px-4">
          <h1 className="text-3xl font-bold text-gray-900 mb-8">Add Product</h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white shadow-lg rounded-2xl p-8"
          >
            {/* Title */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                placeholder="Enter product title"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                required
              />
            </div>

            {/* Description */}
            <div className="mb-5">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                placeholder="Enter product description"
                rows="4"
                className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500 resize-none"
                required
              />
            </div>

            {/* Price + Stock */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-5">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  placeholder="₹ Price"
                  min="1"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stockQuantity"
                  value={product.stockQuantity}
                  onChange={handleChange}
                  placeholder="Available quantity"
                  min="0"
                  className="w-full border border-gray-300 rounded-lg px-4 py-3 outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Image */}
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Product Image
              </label>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border border-gray-300 rounded-lg p-3 cursor-pointer"
                required
              />
            </div>

            <div className="mb-6">
              <select
                name="category"
                value={product.category}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              >
                <option value="">Select category</option>
                <option value="Electronics">Electronics</option>
                <option value="Computers">Computers</option>
                <option value="Mobiles">Mobiles</option>
                <option value="Gaming">Gaming</option>
                <option value="Grocery">Grocery</option>
                <option value="Beauty">Beauty</option>
                <option value="Home">Home</option>
                <option value="Fashion">Fashion</option>
              </select>
            </div>
            "",
    

            {/* Image Preview */}
            {preview && (
              <div className="mb-6">
                <p className="text-sm font-semibold text-gray-700 mb-2">
                  Preview
                </p>

                <div className="w-full h-64 bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
                  <img
                    src={preview}
                    alt="Product preview"
                    className="max-h-full max-w-full object-contain"
                  />
                </div>
              </div>
            )}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-semibold py-3 rounded-lg transition"
            >
              {loading ? "Adding Product..." : "Add Product"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
