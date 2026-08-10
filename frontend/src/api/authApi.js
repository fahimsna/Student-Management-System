import axiosInstance from "./axiosInstance";

export let registerUser = (data) => {
  return axiosInstance.post("/register", data);
};
export let loginUser = (data) => {
  return axiosInstance.post("/login", data);
};
export let getProfile = () => {
  return axiosInstance.get("/profile");
};
