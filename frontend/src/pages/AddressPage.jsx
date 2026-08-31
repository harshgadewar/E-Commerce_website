import { Navbar } from "../components/Navbar";
import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function AddressTakingPage() {
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

  const handleChange = (e) => {
    setAddress({
      ...address,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = axios.post(
        "http://localhost:8080/useraction/saveaddress",
        
          address,
        
        {
          withCredentials: true,
        },
      );
      alert("address saved!!");

      navigate("/payment");
    } catch (e) {
      console.log(e);
      console.log(e.response);
      console.log(e.message);
      alert(e.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div>
      <Navbar />

      <div className="max-w-3xl mx-auto mt-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Address</h1>
        <div className="bg-white  shadow-md rounded-lg p-6">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <input
                type="text"
                name="firstname"
                placeholder="First Name"
                className="border rounded p-2"
                value={address.firstname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="lastname"
                placeholder="lastname"
                className="border rounded p-2"
                value={address.lastname}
                onChange={handleChange}
              />
              <input
                type="text"
                name="phoneno"
                placeholder="phonenumber"
                className="border rounded p-2"
                value={address.phoneno}
                onChange={handleChange}
              />
              <input
                type="text"
                name="address"
                placeholder="address"
                className="border rounded p-2"
                value={address.address}
                onChange={handleChange}
              />
              <input
                type="text"
                name="pincode"
                placeholder="pincode"
                className="border rounded p-2"
                value={address.pincode}
                onChange={handleChange}
              />
              <input
                type="text"
                name="city"
                placeholder="city"
                className="border rounded p-2"
                value={address.city}
                onChange={handleChange}
              />
              <input
                type="text"
                name="state"
                placeholder="state"
                className="border rounded p-2"
                value={address.state}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="mt-6 bg-blue-600 text-white px-6 py-2 rounded "
            >
              Save Address
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
