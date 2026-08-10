import { useNavigate } from "react-router-dom";
import React from "react";

export default function Logout() {
  let navigate = useNavigate();
  let handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };
  return (
    <button onClick={handleLogout} className="cursor-pointer">
      Logout
    </button>
  );
}
