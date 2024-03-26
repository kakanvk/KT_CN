
import { axiosInstance } from "./AxiosCofig";

const getAllDetailResearchProject = () => {
    return axiosInstance.get(`/detail-research-project`);
};

const postDetailResearchProject = (data) => {
    return axiosInstance.post(`/admin/detail-research-project/`,data);
};

const updateDetailResearchProject = (id, data) => {
    return axiosInstance.post(`/admin/detail-research-project/research-project/${id}`, data);
};

const deleteListDetailResearchProject = (data) => {
    return axiosInstance.delete(`/admin/detail-research-project/delete`, {params: data});
};

const getdeleteListDetailByIdResearchProject = (id) => {
    return axiosInstance.get(`/detail-research-project/research-project/${id}`);
};

export { 
    getAllDetailResearchProject,
    postDetailResearchProject,
    updateDetailResearchProject,
    deleteListDetailResearchProject,
    getdeleteListDetailByIdResearchProject,
};
