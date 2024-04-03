import { axiosInstance } from "./AxiosCofig";

const getAllDepartments = () => {
    return axiosInstance.get(`/admin/department`);
};

const deleteDepartment = (data) => {
    return axiosInstance.put(`/admin/department/soft-list/delete`, data);
};

const updateDepartment = (id, data) => {
    return axiosInstance.put(`/admin/department/${id}`, data);
};

const getDepartmentById = (id, data) => {
    return axiosInstance.get(`/admin/department/${id}`, data);
};

const postDepartment = (data) => {
    return axiosInstance.post(`/admin/department`, data);
};

export {
    getAllDepartments,
    deleteDepartment,
    updateDepartment,
    getDepartmentById,
    postDepartment,
};
