import axiosInstance from "./axiosInstance";

export const saveAttendance = (data) => {
  return axiosInstance.post("/attendance", data);
};

export const getAttendance = (params) => {
  return axiosInstance.get("/attendance", { params });
};
