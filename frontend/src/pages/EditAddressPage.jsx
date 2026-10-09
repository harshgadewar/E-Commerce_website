import { Navbar } from "../components/Navbar";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
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

  const location = useLocation();
  const checkoutState = location.state;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

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

    if (loading) return;

    // Validate first name
    if (!address.firstname.trim()) {
      alert("Please enter your first name");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(address.firstname.trim())) {
      alert("First name can contain only letters, spaces, hyphens, and apostrophes");
      return;
    }

    // Validate last name
    if (!address.lastname.trim()) {
      alert("Please enter your last name");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(address.lastname.trim())) {
      alert("Last name can contain only letters, spaces, hyphens, and apostrophes");
      return;
    }

    // Validate phone number
    if (!/^[6-9]\d{9}$/.test(address.phoneno.trim())) {
      alert("Please enter a valid 10-digit Indian mobile number");
      return;
    }

    // Validate address
    if (address.address.trim().length < 5) {
      alert("Address must contain at least 5 characters");
      return;
    }

    // Validate pincode
    if (!/^[1-9]\d{5}$/.test(address.pincode.trim())) {
      alert("Please enter a valid 6-digit Indian pincode");
      return;
    }

    // Validate city
    if (!address.city.trim()) {
      alert("Please enter your city");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(address.city.trim())) {
      alert("City can contain only letters, spaces, hyphens, and apostrophes");
      return;
    }

    // Validate state
    if (!address.state.trim()) {
      alert("Please enter your state");
      return;
    }

    if (!/^[a-zA-Z\s'-]+$/.test(address.state.trim())) {
      alert("State can contain only letters, spaces, hyphens, and apostrophes");
      return;
    }

    setLoading(true);

    try {
      const res = await api.put(
        "/useraction/editaddress",
        {
          ...address,
          firstname: address.firstname.trim(),
          lastname: address.lastname.trim(),
          phoneno: address.phoneno.trim(),
          address: address.address.trim(),
          pincode: address.pincode.trim(),
          city: address.city.trim(),
          state: address.state.trim(),
        },
        {
          withCredentials: true,
        },
      );

      console.log("Address updated:", res.data);

      alert("Address updated successfully!!");

      navigate("/payment", {
        state: checkoutState,
        replace: true,
      });
    } catch (e) {
      console.log("Edit address error:", e);
      console.log(e.response);

      alert(e.response?.data?.message || "Something went wrong");
    } finally {
      setLoading(false);
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
                type="tel"
                name="phoneno"
                placeholder="Phone Number"
                className="border rounded p-2"
                value={address.phoneno}
                onChange={handleChange}
                maxLength={10}
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
                maxLength={6}
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
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
              >
                {loading ? "Updating Address..." : "Update Address"}
              </button>
            </div>
          </form>
        </div>
      </div>

      <Footer />
    </div>
  );
    }
