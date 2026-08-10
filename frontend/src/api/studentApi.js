import axiosInstance from "./axiosInstance";

export let createStudent = (data) => {
  return axiosInstance.post("/students/addStudent", data);
};

export let getStudent = () => {
  return axiosInstance.get("/students/getStudent");
};

export let getSingleStudent = (id) => {
  return axiosInstance.get(`/students/getStudent/${id}`);
};

export let updateStudent = (id, data) => {
  return axiosInstance.put(`/students/getStudent/${id}`, data);
};

export let deleteStudent = (id) => {
  return axiosInstance.delete(`/students/getStudent/${id}`);
};
