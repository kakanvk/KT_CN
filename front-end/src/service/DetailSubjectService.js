
import { axiosInstance } from "./AxiosCofig";

const getAllDetailSubject = (data) => {
    return axiosInstance.post(`/admin/detail-subject`, data);
};

const getDetailByIdSubject = (id) => {
    return axiosInstance.get(`/detail-subject/subject/${id}`);
};

const updateDetailByIdSubject = (id, data) => {
    return axiosInstance.put(`/admin/detail-subject/subject/${id}`, data);
};

const deleteDetailListByIdSubject = (data) => {
    return axiosInstance.delete(`/admin/subject-detail-list/delete`, {params: data});
};


export { getAllDetailSubject, getDetailByIdSubject, updateDetailByIdSubject, deleteDetailListByIdSubject};