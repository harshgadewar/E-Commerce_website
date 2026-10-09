import { useState } from "react";
import { api } from "../api/axios";
import { useNavigate, Link } from "react-router-dom";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { useLoading } from "../context/LoadingContext";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prevent multiple submissions
    if (loading) return;

    // Validate name
    const trimmedName = name.trim();

    if (!trimmedName) {
      alert("Please enter your name");
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(trimmedName)) {
      alert("Name can contain only letters and spaces");
      return;
    }

    // Validate email
    const trimmedEmail = email.trim();

    if (!trimmedEmail) {
      alert("Please enter your email");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(trimmedEmail)) {
      alert("Please enter a valid email address");
      return;
    }

    // Validate password
    if (!password.trim()) {
      alert("Please enter your password");
      return;
    }

    if (password.length < 8) {
      alert("Password must be at least 8 characters long");
      return;
    }

    setLoading(true);

    try {
      const res = await api.post(
        "/signup",
        {
          name: trimmedName,
          email: trimmedEmail,
          password,
        }
      );

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(
        err.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f7f8f7] flex items-center justify-center px-4">

      <div className="w-full max-w-[420px] rounded-2xl bg-white border border-gray-200 shadow-sm p-8">

        {/* Logo */}
        <div className="flex justify-center mb-8">
          <img
            src="/veloraaaalogo.png"
            alt="Velora"
            className="w-40"
          />
        </div>

        {/* Heading */}
        <div className="mb-7">
          <h1 className="text-2xl font-bold text-gray-900">
            Create an account
          </h1>

          <p className="mt-1 text-sm text-gray-500">
            Join Velora and start shopping
          </p>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit}
          className="space-y-5"
        >

          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Name
            </label>

            <input
              type="text"
              placeholder="Enter your name"
              value={name}
              onChange={(e) =>
                setName(e.target.value)
              }
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-[#087ea4]
                focus:ring-2
                focus:ring-[#087ea4]/10
              "
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Email
            </label>

            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) =>
                setEmail(e.target.value)
              }
              required
              className="
                w-full
                rounded-lg
                border border-gray-300
                px-4
                py-3
                text-sm
                outline-none
                transition
                focus:border-[#087ea4]
                focus:ring-2
                focus:ring-[#087ea4]/10
              "
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>

            <div className="relative">

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                placeholder="Create a password"
                value={password}
                onChange={(e) =>
                  setPassword(e.target.value)
                }
                required
                className="
                  w-full
                  rounded-lg
                  border border-gray-300
                  px-4
                  py-3
                  pr-11
                  text-sm
                  outline-none
                  transition
                  focus:border-[#087ea4]
                  focus:ring-2
                  focus:ring-[#087ea4]/10
                "
              />

              <button
                type="button"
                onClick={() =>
                  setShowPassword(!showPassword)
                }
                className="
                  absolute
                  right-3
                  top-1/2
                  -translate-y-1/2
                  text-gray-400
                  hover:text-gray-700
                "
              >
                {showPassword ? (
                  <FiEyeOff size={18} />
                ) : (
                  <FiEye size={18} />
                )}
              </button>

            </div>
          </div>

          {/* Signup */}
          <button
            type="submit"
            disabled={loading}
            className="
              w-full
              rounded-lg
              bg-[#087ea4]
              py-3
              text-sm
              font-semibold
              text-white
              transition
              hover:bg-[#066d8e]
              disabled:opacity-60
            "
          >
            {loading
              ? "Creating account..."
              : "Create Account"}
          </button>

        </form>

        {/* Login */}
        <p className="mt-7 text-center text-sm text-gray-500">
          Already have an account?{" "}

          <Link
            to="/login"
            className="
              font-semibold
              text-[#087ea4]
              hover:underline
            "
          >
            Login
          </Link>
        </p>

      </div>
    </div>
  );
}

export default Register;
