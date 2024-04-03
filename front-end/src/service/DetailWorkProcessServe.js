import { axiosInstance } from "./AxiosCofig";

const postDetailWorkProcess = (data) => {
    console.log("dc");
    return axiosInstance.post(`/admin/detail-work-process`, data);
};

const putDetailWorkProcess = (id, data) => {
    console.table(data);
    return axiosInstance.put(
        `/admin/detail-work-process/work-process/${id}`,
        data
    );
};

const deleteListDetailWorkProcess = (data) => {
    console.log("hung", data);
    return axiosInstance.delete(`/admin/detail-work-process/delete`, {
        params: data,
    });
};

const getDetailWorkProcessById = (id) => {
    return axiosInstance.get(`/detail-work-process/work-process/${id}`);
};

export {
    postDetailWorkProcess,
    putDetailWorkProcess,
    deleteListDetailWorkProcess,
    getDetailWorkProcessById,
};
