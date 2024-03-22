import { axiosInstance } from "./AxiosCofig";

const getAllsubjects = () => {
    return axiosInstance.get(`/subjects`);
};

const getSubjectByID = (id) => {
    return axiosInstance.get(`/subjects/${id}`);
};

const postSubject = (data) => {
    return axiosInstance.post(`/admin/subjects`,data);
};

const updateSubject = (id, data) => {
    return axiosInstance.put(`/admin/subjects/${id}`,data);
}

const deleteSubject = (data) => {
    return axiosInstance.delete(`admin/subjects/soft-list/delete`,{params: data});
}

export { getAllsubjects, getSubjectByID, postSubject, updateSubject, deleteSubject};