import { axiosInstance } from "./AxiosCofig";

const getAllsubjects = () => {
    return axiosInstance.get(`/subjects`);
};

const getSubjectByID = (id) => {
    return axiosInstance.get(`/subjects/${id}`);
};

const postSubject = (data) => {
    return axiosInstance.get(`/admin/subjects`,data);
};

const updateSubject = (id, data) => {
    return axiosInstance.put(`/admin/subjects/${id}`,data);
}

const deleteSubject = (id) => {
    return axiosInstance.delete(`admin/subjects/${id}`);
}
const softDeleteCategoryByIds=()=>{
    return axiosInstance.get();
}

export { getAllsubjects, getSubjectByID, postSubject, updateSubject, deleteSubject ,softDeleteCategoryByIds};