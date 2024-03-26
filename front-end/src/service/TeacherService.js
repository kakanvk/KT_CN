import { axiosInstance } from "./AxiosCofig";

const getAllTeacher = () => {
    return axiosInstance.get(`/teacher`);
};

const getTeacherByID = (id) => {
    return axiosInstance.get(`/teacher/${id}`);
};

export {getAllTeacher, getTeacherByID}