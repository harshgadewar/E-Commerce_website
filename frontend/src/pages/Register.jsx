import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:8080/signup", {
        name,
        email,
        password,
      });

      console.log(res.data);

      alert("Registration Successful");

      navigate("/login");
    } catch (err) {
      console.log(err);

      alert(err.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen bg-pink-50 flex justify-center items-center">
      <div className="bg-white w-[450px] rounded-lg shadow-lg">
        <div className="p-8">
          <h1 className="text-3xl font-bold">Signup</h1>

          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <input
              type="text"
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="border p-3 rounded"
            />

            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="border p-3 rounded"
            />

            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="border p-3 rounded"
            />

            <button
              type="submit"
              className="
              bg-pink-500
              text-white
              py-3
              rounded
              "
            >
              CONTINUE
            </button>
          </form>

          <p className="mt-6 text-center">
            Already have an account?
            <span
              className="
              text-pink-500
              cursor-pointer
              ml-2
              "
              onClick={() => navigate("/login")}
            >
              Login
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
