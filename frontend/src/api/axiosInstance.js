import axios from "axios";

let axiosInstance = axios.create({
  baseURL: "http://localhost:8007/api",
});

axiosInstance.interceptors.request.use((config) => {
  let token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export default axiosInstance;
