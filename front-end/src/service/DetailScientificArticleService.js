
import { axiosInstance } from "./AxiosCofig";

const postDetailScientificArticle = (data) => {
    return axiosInstance.post(`/admin/detail-scientific-article`, data);
};

const putDetailScientificArticle = (id, data) => {
    console.table(data);
    return axiosInstance.put(`/admin/detail-scientific-article/scientific-article/${id}`, data);
};

const deleteListDetailScientificArticle = (data) => {

    console.log('hung',data);
    return axiosInstance.delete(`/admin/detail-scientific-article/delete`, {params: data});
};

const getDetailScientificArticleById= (id) => {
    return axiosInstance.get(`/detail-scientific-article/scientific-article/${id}`);
}

export { postDetailScientificArticle, putDetailScientificArticle, deleteListDetailScientificArticle, getDetailScientificArticleById};