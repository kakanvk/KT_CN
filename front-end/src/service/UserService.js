
import { axiosInstance } from "./AxiosCofig";

const getAllUser = () => {
    return axiosInstance.get(`/admin/users`);
};

const addUser = (email) => {
    const data = {
        email: email
    }
    return axiosInstance.post(`/admin/users`, data);
};

const updateRoleUser = (data) => {
    return axiosInstance.put(`admin/users/role/change`,data);
};

const softDeleteUser = (id) => {
    return axiosInstance.put(`admin/users/soft-delete/${id}`);
};

export { getAllUser, addUser, updateRoleUser, softDeleteUser };