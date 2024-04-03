import { axiosInstance } from "./AxiosCofig";

const getAllCategories = () => {
    return axiosInstance.get(`/admin/categories`);
};

const getAllCategoryByhidden = () => {
    return axiosInstance.get(`/admin/categoryByHidden`);
};

const postSaveCategory = (data) => {
    return axiosInstance.post(`/admin/category`, data);
};

const updateCategory = (id, data) => {
    return axiosInstance.put(`/admin/category/${id}`, data);
};

const getCategoryByID = (id) => {
    return axiosInstance.get(`/admin/category/${id}`);
};

const softDeleteCategoryByIds = (data) => {
    return axiosInstance.put(`/admin/category/soft-list/delete`, data);
};

const getAllNewByCategory = (id) => {
    console.log("aaaaaaaaa", id);
    return axiosInstance.get(`/news/category/${id}`);
};

export {
    getAllCategories,
    postSaveCategory,
    updateCategory,
    getCategoryByID,
    softDeleteCategoryByIds,
    getAllCategoryByhidden,
    getAllNewByCategory,
};
