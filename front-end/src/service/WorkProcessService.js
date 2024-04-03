import { axiosInstance } from "./AxiosCofig";

const getAllWorkProcess = () => {
    return axiosInstance.get(`work-process/`);
};

const getWorkProcessByID = (id) => {
    return axiosInstance.get(`work-process/${id}`);
};

const postWorkProcess = (data) => {
    return axiosInstance.post(`/admin/work-process`, data);
};

const updateWorkProcess = (id, data) => {
    return axiosInstance.put(`/admin/work-process/${id}`, data);
};

const deleteWorkProcessList = (data) => {
    console.log("delete", data);
    return axiosInstance.delete(`admin/work-process/soft-list/delete`, {
        params: data,
    });
};

export {
    getAllWorkProcess,
    getWorkProcessByID,
    postWorkProcess,
    updateWorkProcess,
    deleteWorkProcessList,
};
