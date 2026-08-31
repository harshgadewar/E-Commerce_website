import { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import { AdminNavbar } from "./Components/AdminNavbar";

export function AdminEditProduct() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    title: "",
    description: "",
    price: "",
    stockQuantity: "",
    image: "",
  });

  const [selectedImage, setSelectedImage] = useState(null);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/admin/product/${id}`,
          {
            withCredentials: true,
          },
        );
        console.log(res.data.product);
        setProduct(res.data.product);
      } catch (e) {
        console.log(e);
        alert("Failed to load product");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];

    if (file) {
      setSelectedImage(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setSaving(true);

      const formData = new FormData();

      formData.append("title", product.title);
      formData.append("description", product.description);
      formData.append("price", product.price);
      formData.append("stockQuantity", product.stockQuantity);
      formData.append("category", product.category);

      if (selectedImage) {
        formData.append("image", selectedImage);
      }

      await axios.put(
        `http://localhost:8080/admin/updateproduct/${id}`,
        formData,
        {
          withCredentials: true,
        },
      );

      alert("Product updated successfully!");

      navigate("/adminallproduct");
    } catch (e) {
      console.log(e);

      alert(e.response?.data?.message || "Failed to update product");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />

        <div className="min-h-screen flex justify-center items-center">
          <p className="text-gray-500">Loading product...</p>
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />

      <div className="min-h-screen bg-slate-50 px-4 py-8">
        <div className="max-w-3xl mx-auto">
          <h1 className="text-3xl font-bold text-gray-900 mb-6">
            Edit Product
          </h1>

          <form
            onSubmit={handleSubmit}
            className="bg-white rounded-xl shadow-md p-6 space-y-5"
          >
            {/* IMAGE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Image
              </label>

              <div className="w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-3">
                {selectedImage ? (
                  <img
                    src={URL.createObjectURL(selectedImage)}
                    alt="New product"
                    className="w-full h-full object-contain"
                  />
                ) : product.image ? (
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-full h-full object-contain"
                  />
                ) : (
                  <p className="text-gray-400">No Image</p>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="w-full border rounded-lg p-3"
              />

              <p className="text-sm text-gray-500 mt-2">
                Leave empty to keep the current image.
              </p>
            </div>

            {/* TITLE */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Product Title
              </label>

              <input
                type="text"
                name="title"
                value={product.title}
                onChange={handleChange}
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* DESCRIPTION */}

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Description
              </label>

              <textarea
                name="description"
                value={product.description}
                onChange={handleChange}
                rows="4"
                className="w-full border rounded-lg p-3"
                required
              />
            </div>

            {/* PRICE + STOCK */}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Price
                </label>

                <input
                  type="number"
                  name="price"
                  value={product.price}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Stock Quantity
                </label>

                <input
                  type="number"
                  name="stockQuantity"
                  value={product.stockQuantity}
                  onChange={handleChange}
                  className="w-full border rounded-lg p-3"
                  required
                />
              </div>
            </div>
            <div>
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

            {/* BUTTONS */}

            <div className="flex justify-end gap-3 pt-4">
              <button
                type="button"
                onClick={() => navigate("/adminallproduct")}
                className="px-5 py-2 rounded-lg bg-gray-200 hover:bg-gray-300"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={saving}
                className="px-5 py-2 rounded-lg bg-blue-900 hover:bg-blue-800 text-white disabled:opacity-50"
              >
                {saving ? "Updating..." : "Update Product"}
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
