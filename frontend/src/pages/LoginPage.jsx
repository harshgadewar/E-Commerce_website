import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
      );


      alert("Login Successful");

      navigate("/");
    } catch (err) {
      console.log(err);
      console.log(err.response);
      console.log(err.message);

      console.log(err);

      alert(err.response?.data?.message || "Something went wrong");
    }
  };
  return (
    <div className="min-h-screen bg-pink-50 flex justify-center pt-10">
      <div className="bg-white w-[450px]">
        <div className="p-8">
          <h1 className="text-3xl font-bold">Login</h1>
          <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-8">
            <input
              placeholder="Email"
              type="text"
              className="border w-full p-3 mt-8"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              type="password"
              placeholder="Password"
              className="border w-full p-3 mt-8"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="mt-6 flex gap-2"></div>

            <button
              className="
            bg-pink-500
            text-white
            w-full
            py-3
            mt-6
            "
              type="submit"
            >
              CONTINUE
            </button>
          </form>

          <span className="font-normal mt-6">Signup?</span>
        </div>
      </div>
    </div>
  );
}
