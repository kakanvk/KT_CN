import { axiosInstance } from "./AxiosCofig";

const getAllTeacher = () => {
    return axiosInstance.get(`/teacher`);
};

const getTeacherByID = (id) => {
    return axiosInstance.get(`/teacher/${id}`);
};

const putTeacher = (id, data) => {
    return axiosInstance.put(`/teacher/${id}`, data);
};

const createTeacher = (data) => {
    return axiosInstance.post(`/teacher`, data);
};

export { getAllTeacher, getTeacherByID, putTeacher, createTeacher };
