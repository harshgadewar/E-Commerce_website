
import { Navbar } from "../components/Navbar";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Footer } from "../components/Footer";
import { api } from "../api/axios";

export function AddressTakingPage() {
  const navigate = useNavigate();
  const location = useLocation();

  // Preserve checkout information received from PaymentPage
  const checkoutState = location.state;

  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Wait until the address is successfully saved
      await api.post(
        "/useraction/saveaddress",
        address,
        {
          withCredentials: true,
        },
      );

      alert("Address saved successfully!");

      // Return to checkout with the original product information
      navigate("/payment", {
        state: checkoutState,
        replace: true,
      });
    } catch (e) {
      console.error("Save address error:", e);

      alert(
        e.response?.data?.message || "Something went wrong",
      );
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-27 mb-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">
          Address
        </h1>

        <div className="bg-white shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="border rounded p-2"
                value={address.firstname}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="lastname"
                placeholder="Last Name"
                className="border rounded p-2"
                value={address.lastname}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="phoneno"
                placeholder="Phone Number"
                className="border rounded p-2"
                value={address.phoneno}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                className="border rounded p-2"
                value={address.address}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="pincode"
                placeholder="Pincode"
                className="border rounded p-2"
                value={address.pincode}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="city"
                placeholder="City"
                className="border rounded p-2"
                value={address.city}
                onChange={handleChange}
                required
              />

              <input
                type="text"
                name="state"
                placeholder="State"
                className="border rounded p-2"
                value={address.state}
                onChange={handleChange}
                required
              />
            </div>

            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
            >
              Save Address
            </button>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
        }
