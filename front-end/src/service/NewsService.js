import { axiosInstance } from "./AxiosCofig";

const getAllNewsForAdmin = () => {
    return axiosInstance.get(`/admin/news`);
};

const getAllNewsHiddenForAdmin = () => {
    return axiosInstance.get(`/admin/news-hidden`);
};

const softDeleteNewsById = (id) => {
    return axiosInstance.put(`/admin/news/softDelete/${id}`);
};

const softDeleteNewsByIds = (data) => {
    return axiosInstance.put(`/admin/news/soft-list/delete`, data);
};

const forceDeleteNewsByIds = (data) => {
    return axiosInstance.delete(`/admin/news/force-delete`, { params: data });
};

const GetNewCanUpdate = (id) => {
    console.log("id", id);
    return axiosInstance.get(`/admin/news/${id}`);
};

const PutNewsByID = (id, data) => {
    return axiosInstance.put(`/admin/news/${id}`, data);
};

const SaveDataNews = (data) => {
    return axiosInstance.post(`/admin/news`, data);
};

// client

const GetNewViEn = () => {
    return axiosInstance.get(`/news`);
};

const SaveDataNewsAdmissions = (data) => { 

}

const UpdateStatusVi =(id)=>{
    return axiosInstance.put(`/admin/news/update/status-vi/${id}`);
}
const UpdateStatusEn =(id)=>{
    return axiosInstance.put(`/admin/news/update/status-en/${id}`);
}
const GetAllCategories =()=>{
    return axiosInstance.get(`/categories`);

}
const UpdateStatuses =(data)=>{
    return axiosInstance.put(`/admin/news/update/UpdateStatuses`, data);

}

const getTop5RelatedCategory = (id, data)=> {
    console.log('getTop5RelatedCategory', id, data);
    return axiosInstance.get(`/news/getTop5RelatedCategory/${id}`,  { params: data });
}

export {
    getAllNewsForAdmin,
    getAllNewsHiddenForAdmin,
    getTop5RelatedCategory,
    softDeleteNewsById,
    softDeleteNewsByIds,
    forceDeleteNewsByIds,
    GetNewCanUpdate,
    PutNewsByID,
    SaveDataNews,
    SaveDataNewsAdmissions,
    GetNewViEn,
    UpdateStatusVi, 
    UpdateStatusEn, 
    GetAllCategories, 
    UpdateStatuses
};
