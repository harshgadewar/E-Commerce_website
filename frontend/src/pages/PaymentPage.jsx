import axios from "axios";
import { useState, useEffect } from "react";
import { Navbar } from "../components/Navbar";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { Loading } from "../components/Loading";

export function PaymentPage() {
  const navigate = useNavigate();

  const handlePayment = async () => {
    if (!address?._id) {
      alert("Please add an address before making a payment.");
      return;
    }

    try {
      const { data } = await axios.post(
        "http://localhost:8080/payment",
        {},
        {
          withCredentials: true,
        },
      );

      const order = data.order;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY,
        amount: order.amount,
        currency: order.currency,
        order_id: order.id,

        name: "My Ecommerce",
        description: "Product Payment",

        handler: async function (response) {
          console.log("Payment Success");

          const verify = await axios.post(
            "http://localhost:8080/payment/verify",
            {
              ...response,
            },
            {
              withCredentials: true,
            },
          );
        },

        theme: {
          color: "#3399cc",
        },
      };

      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (err) {
      console.log(err.message);
    }
  };

  const [carts, setCart] = useState([]);
  const [checkoutdata, setCheckout] = useState({});
  const [address, setAddress] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const res1 = await axios.get(
          "http://localhost:8080/useraction/viewcart",
          {
            withCredentials: true,
          },
        );

        setCart(res1.data.cart);

        const res2 = await axios.get(
          "http://localhost:8080/useraction/cart/checkout",
          {
            withCredentials: true,
          },
        );

        setCheckout(res2.data);
      } catch (e) {
        console.log("Cart/checkout error:", e.response?.data || e.message);
      }

      try {
        const res3 = await axios.get(
          "http://localhost:8080/useraction/getaddress",
          {
            withCredentials: true,
          },
        );

        setAddress(res3.data.address);
      } catch (e) {
        console.log("Address error:", e.response?.data || e.message);

        setAddress({});
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <Navbar />
      <div className="max-w-7xl mx-auto pt-4 mt-15">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 pt-8">
          <div>
            <div className="w-full flex rounded shadow-md p-4 justify-between">
              {address?._id ? (
                <>
                  <div>
                    <h1 className="mb-2 font-bold">Deliver to:</h1>

                    <h1 className="mb-2 text-gray-900">
                      Name: {address.firstname} {address.lastname}
                    </h1>

                    <p className="mb-2 text-gray-900">
                      Address: {address.address}
                    </p>

                    <p className="mb-2 text-gray-900">
                      Phoneno: {address.phoneno}
                    </p>

                    <p className="mb-2 text-gray-900">State: {address.state}</p>

                    <p className="mb-2 text-gray-900">
                      Pincode: {address.pincode}
                    </p>
                  </div>

                  <div>
                    <button
                      className="bg-[#F36F30] py-1 px-2 rounded text-white"
                      onClick={() => {
                        navigate("/address");
                      }}
                    >
                      Edit Address
                    </button>
                  </div>
                </>
              ) : (
                <>
                  <div>
                    <h1 className="font-bold text-lg">
                      No delivery address found
                    </h1>

                    <p className="text-gray-600 mt-1">
                      Please add an address before placing your order.
                    </p>
                  </div>

                  <div>
                    <button
                      className="bg-[#F36F30] py-2 px-4 rounded text-white"
                      onClick={() => {
                        navigate("/address");
                      }}
                    >
                      Add Address
                    </button>
                  </div>
                </>
              )}
            </div>

            <div className="w-full mt-4 rounded-xl shadow-lg">
              {carts.map((cart) => (
                <div
                  key={cart._id}
                  className="flex flex-col sm:flex-row gap-5 p-5 mb-5 bg-white  "
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
                      <p className=" font-bold">quantity:{cart.quantity}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="mt-6 sticky top-24">
              <div className="bg-white  border rounded-xl shadow-md p-6 ">
                <h2 className="text-xl font-bold border-b pb-4">
                  Price Details
                </h2>

                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span>Price ({checkoutdata.productnum}items)</span>
                    <span>₹{checkoutdata.total}</span>
                  </div>

                  <div className="flex justify-between">
                    <span>Delivery</span>
                    <span className="text-green-600">FREE</span>
                  </div>

                  <hr />

                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>{checkoutdata.total}</span>
                  </div>
                </div>

                <button
                  className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
                  onClick={handlePayment}
                >
                  Buy
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
