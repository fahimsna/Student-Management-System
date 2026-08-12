import axiosInstance from "./axiosInstance";

export const registerUser = (data) => {
  return axiosInstance.post("/register", data);
};

export const loginUser = (data) => {
  return axiosInstance.post("/login", data);
};

export const getProfile = () => {
  return axiosInstance.get("/profile");
};

export const updateProfile = (data) => {
  return axiosInstance.put("/profile", data);
};
