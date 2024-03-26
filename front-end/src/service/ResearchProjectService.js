import { axiosInstance } from "./AxiosCofig";

const getAllResearchProject =()=>{
    return axiosInstance.get(`/research-project`);
}

const getResearchProjectByID =(id)=>{
    return axiosInstance.get(`/research-project/${id}`);
}

const postResearchProject =(data)=>{
    return axiosInstance.post(`/admin/research-project`, data);
}

const updateResearchProject =(id, data)=>{
    return axiosInstance.put(`/admin/research-project/${id}`, data);
}

const deleteListResearchProject =(data)=>{
    return axiosInstance.delete(`/admin/research-project/soft-list/delete`, {params: data});
}

export {
    getAllResearchProject,
    getResearchProjectByID,
    postResearchProject,
    updateResearchProject,
    deleteListResearchProject
};

