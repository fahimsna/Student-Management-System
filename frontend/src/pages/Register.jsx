import React, { useState } from "react";
import { registerUser } from "../api/authApi";

export default function Register() {
  let [name, setName] = useState("");
  let [email, setEmail] = useState("");
  let [password, setPassword] = useState("");
  let [message, setMessage] = useState("");

  let handleRegister = async () => {
    try {
      let data = {
        name,
        email,
        password,
      };
      let result = await registerUser(data);
      setMessage(result.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Registration Failed");
    }
  };

  return (
    <div>
      <h1>Registration Form</h1>

      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
      />

      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />

      <button onClick={handleRegister}>Register</button>
      <p>{message}</p>
    </div>
  );
}
