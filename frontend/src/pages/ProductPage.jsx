import { Navbar } from "../components/Navbar";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { Truck, ShieldCheck, RotateCcw, CreditCard } from "lucide-react";

const AddtoCart = async (productId) => {
  try {
    await axios.post(
      `http://localhost:8080/useraction/addtocart/${productId}`,
      {
        quantity:1
      },
      { withCredentials: true },
    );
    alert("added to cart!!");
    fetchproduct();
  } catch (e) {
    console.log(e);
  }
};
export function ProductPage() {
  const [product, setProduct] = useState({});

  const { id } = useParams();

  useEffect(() => {
    const fetchproduct = async () => {
      try {
        const res = await axios.get(
          `http://localhost:8080/useraction/viewproduct/${id}`,
        );
        setProduct(res.data);
        console.log(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchproduct();
  }, [id]);

  return (
    <div>
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Product Image */}
          <div className="bg-gray-100 rounded-2xl p-8 flex items-center justify-center">
            <img
              src={product.image}
              alt="product"
              className="w-full max-w-md object-contain"
            />
          </div>

          {/* Product Details */}
          <div className="flex flex-col justify-center mt-10">
            <h1 className="text-3xl font-md text-gray-900">{product.title}</h1>

            {/* Price */}
            <div className="mt-8">
              <p className="text-2xl  text-black">₹{product.price}</p>

              <div className="flex items-center gap-3 mt-2">
                <span className="text-gray-400 line-through">₹1,09,000</span>

                <span className="text-green-600 font-semibold">11% OFF</span>
              </div>
            </div>

            {/* Stock */}
            <div className="mt-5">
              <span className="text-green-600 font-semibold">✓ In Stock</span>
            </div>

            {/* Buttons */}
            <div className="flex gap-4 mt-8">
              <button
                onClick={() => AddtoCart(product._id)}
                className="flex-1 bg-yellow-400 hover:bg-yellow-500 h-12 rounded-xl font-semibold transition"
              >
                Add To Cart
              </button>

              <button className="flex-1 bg-orange-500 hover:bg-orange-600 text-white h-12 rounded-xl font-semibold transition">
                Buy Now
              </button>
            </div>

            {/* Delivery Card */}

            <div className="mt-8 rounded-xl  bg-white ">
              <div className="flex items-center gap-4 p-4 ">
                <Truck className="w-6 h-6 text-green-600" />

                <div>
                  <p className="text-sm text-gray-500">Delivery</p>
                  <p className="font-semibold text-gray-900">
                    Delivered in 2 Days
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <ShieldCheck className="w-6 h-6 text-blue-600" />

                <div>
                  <p className="text-sm text-gray-500">Seller</p>
                  <p className="font-semibold text-gray-900">Velora Official</p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4 ">
                <RotateCcw className="w-6 h-6 text-orange-500" />

                <div>
                  <p className="text-sm text-gray-500">Returns</p>
                  <p className="font-semibold text-gray-900">
                    7 Days Easy Return
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-4 p-4">
                <CreditCard className="w-6 h-6 text-purple-600" />

                <div>
                  <p className="text-sm text-gray-500">Payment</p>
                  <p className="font-semibold text-gray-900">
                    Secure Transaction
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Description */}
        <div className="mt-12 bg-white border rounded-xl p-6 shadow-sm">
          <h2 className="text-2xl font-bold mb-4">Product Description</h2>

          <p className="text-gray-600 leading-8">{product.description}</p>
        </div>
      </div>
    </div>
  );
}
