import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Footer } from "../components/Footer";
import { api } from "../api/axios";

export function EditAddressPage() {
  const [address, setAddress] = useState({
    firstname: "",
    lastname: "",
    phoneno: "",
    address: "",
    pincode: "",
    city: "",
    state: "",
  });

  const navigate = useNavigate();

  // ================= GET EXISTING ADDRESS =================

  useEffect(() => {
    const fetchAddress = async () => {
      try {
        const res = await api.get(
          "/useraction/getaddress",
          {
            withCredentials: true,
          },
        );

        setAddress({
          firstname: res.data.address.firstname || "",
          lastname: res.data.address.lastname || "",
          phoneno: res.data.address.phoneno || "",
          address: res.data.address.address || "",
          pincode: res.data.address.pincode || "",
          city: res.data.address.city || "",
          state: res.data.address.state || "",
        });
      } catch (e) {
        console.log("Get address error:", e);
        console.log(e.response);

        alert(e.response?.data?.message || "Failed to load address");
      }
    };

    fetchAddress();
  }, []);

  // ================= HANDLE CHANGE =================

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  // ================= UPDATE ADDRESS =================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.put(
        "/useraction/editaddress",
        address,
        {
          withCredentials: true,
        },
      );

      console.log("Address updated:", res.data);

      alert("Address updated successfully!!");

      navigate("/payment");
    } catch (e) {
      console.log("Edit address error:", e);
      console.log(e.response);

      alert(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-27 mb-50">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Edit Address</h1>

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

            <div className="flex gap-3 mt-6">
              <button
                type="button"
                onClick={() => navigate(-1)}
                className="border border-gray-300 px-6 py-2 rounded hover:bg-gray-100"
              >
                Cancel
              </button>

              <button
                type="submit"
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                Update Address
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
}
