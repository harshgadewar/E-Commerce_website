import { Navbar } from "../components/Navbar";
import { ProductCard } from "../components/ProductCard";
import { useState, useEffect } from "react";
import axios from "axios";
import { Loading } from "../components/Loading";
import { Link } from "react-router-dom";

const increaseQuantity = async (cartId) => {
  try {
    await axios.patch(
      `http://localhost:8080/useraction/cart/${cartId}/increase`,
      {},
      {
        withCredentials: true,
      },
    );

    fetchCart();
  } catch (e) {
    console.log(e);
  }
};

const decreaseQuantity = async (cartId) => {
  try {
    await axios.patch(
      `http://localhost:8080/useraction/cart/${cartId}/decrease`,
      {},
      {
        withCredentials: true,
      },
    );

    fetchCart();
  } catch (e) {
    console.log(e);
  }
};

export function AddtoCart() {
  const [carts, setCart] = useState([]);
  const [checkoutdata, setCheckout] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchcart = async () => {
      try {
        setLoading(true);

        const res1 = await axios.get(
          "http://localhost:8080/useraction/viewcart",
          { withCredentials: true },
        );

        let res2 = await axios.get(
          `http://localhost:8080/useraction/cart/checkout`,

          {
            withCredentials: true,
          },
        );

        setCart(res1.data.cart);
        setCheckout(res2.data);
      } catch (e) {
        console.log(e.response);
        console.log(e.response?.data);
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchcart();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-8 mt-35 pt-4 md:mt-18">
        <h1 className="font-bold text-3xl text-gray-900 mt-4">Cart</h1>
        {carts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <div className="text-6xl mb-4">🛒</div>

            <h2 className="text-2xl font-bold text-gray-900">
              Your cart is empty
            </h2>

            <p className="text-gray-500 mt-2">
              You don't have any products in your cart.
            </p>

            <Link
              to="/"
              className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-semibold"
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            {/* LEFT — PRODUCTS */}
            <div>
              <div className="w-full">
                {carts.map((cart) => (
                  <div
                    key={cart._id}
                    className="flex flex-col sm:flex-row gap-5 p-5 mb-5 bg-white rounded-xl shadow-sm hover:shadow-md transition"
                  >
                    {/* Product Image */}
                    <div className="w-full sm:w-40 h-40 bg-gray-100 rounded-lg flex items-center justify-center">
                      <img
                        src={cart.productId.image}
                        alt={cart.productId.title}
                        className="h-32 object-contain"
                      />
                    </div>

                    {/* Product Details */}
                    <div className="flex-1 flex flex-col justify-between">
                      <div>
                        <h2 className="text-xl font-semibold text-gray-900">
                          {cart.productId.title}
                        </h2>

                        <p className="text-2xl font-bold text-blue-600 mt-2">
                          ₹{cart.productId.price}
                        </p>

                        <p className="text-sm text-green-600 mt-1">In Stock</p>
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center gap-3 mt-5">
                        <button
                          onClick={() => decreaseQuantity(cart._id)}
                          className="w-9 h-9 rounded-full border text-lg hover:bg-gray-100"
                        >
                          −
                        </button>

                        <span className="font-semibold text-lg">
                          {cart.quantity}
                        </span>

                        <button
                          onClick={() => increaseQuantity(cart._id)}
                          className="w-9 h-9 rounded-full border text-lg hover:bg-gray-100"
                        >
                          +
                        </button>

                        <button className="ml-6 text-red-500 font-medium hover:underline">
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* RIGHT — PRICE DETAILS */}
            <div className="mt-6 md:mt-0">
              <div className="bg-white border rounded-xl shadow-md p-6 sticky top-24">
                <h2 className="text-xl font-bold border-b pb-4">
                  Price Details
                </h2>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span>Price ({checkoutdata.productnum} items)</span>

                    <span>₹{checkoutdata.total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>

                    <span className="text-green-600">FREE</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>

                    <span>₹{checkoutdata.total}</span>
                  </div>
                </div>

                <Link
                  to="/payment"
                  className="block w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition text-center"
                >
                  Proceed to Checkout
                </Link>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
