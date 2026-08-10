import React, { useState } from "react";
import { loginUser } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export default function Login() {
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");
  let navigate = useNavigate();

  let handleLogin = async () => {
    try {
      let data = {
        email,
        password,
      };

      let result = await loginUser(data);
      localStorage.setItem("token", result.data.token);
      setMessage(result.data.message);
    } catch (error) {
      console.log(error);
      setMessage(error.response?.data?.message || "Login Failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F9FA] px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-xl shadow-md p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-[#212529] text-center mb-6">
          Login
        </h1>

        <div className="space-y-4">
          <input
            className="w-full border border-[#CED4DA] rounded-md px-4 py-2.5 bg-[#E9ECEF] text-[#343A40] placeholder-[#6C757D] outline-none focus:bg-white focus:border-[#6C757D] focus:ring-1 focus:ring-[#6C757D]"
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            className="w-full border border-[#CED4DA] rounded-md px-4 py-2.5 bg-[#E9ECEF] text-[#343A40] placeholder-[#6C757D] outline-none focus:bg-white focus:border-[#6C757D] focus:ring-1 focus:ring-[#6C757D]"
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            onClick={handleLogin}
            className="w-full bg-[#343A40] text-white rounded-md py-2.5 font-semibold hover:bg-[#212529] transition duration-200"
          >
            Login
          </button>
        </div>

        <div className="py-4 flex justify-center gap-2 text-sm">
          <p className="text-[#6C757D]">Don't have an account?</p>

          <button
            onClick={() => navigate("/register")}
            className="text-[#343A40] font-semibold cursor-pointer hover:underline"
          >
            Register
          </button>
        </div>

        {message && (
          <p className="text-center text-sm text-[#495057] font-medium">
            {message}
          </p>
        )}
      </div>
    </div>
  );
}
