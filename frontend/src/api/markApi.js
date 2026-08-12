import axiosInstance from "./axiosInstance";

export const createMarks = (data) => {
  return axiosInstance.post("/marks/addMarks", data);
};

export const getMarks = () => {
  return axiosInstance.get("/marks/getMarks");
};

export const getStudentMarks = (studentId) => {
  return axiosInstance.get(`/marks/student/${studentId}`);
};

export const updateMarks = (id, data) => {
  return axiosInstance.put(`/marks/updateMarks/${id}`, data);
};

export const deleteMarks = (id) => {
  return axiosInstance.delete(`/marks/deleteMarks/${id}`);
};
