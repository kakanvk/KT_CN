import { axiosInstance } from "./AxiosCofig";

const getAllScientificArticle = () => {
    return axiosInstance.get(`/scientific-article`);
};

const getByIdScientific = (id) => {
    console.log("Gettin", id);
    return axiosInstance.get(`/scientific-article/${id}`);
};


const getScientificArticleAndDetail= (id) => {
    return axiosInstance.get(`scientific-article/${id}/get-scientific-article-by-id`);
};

const postScientificArticle= (data) => {
    return axiosInstance.post(`/admin/scientific-article/`,data);
};

const getByIdscientific_article = (id) => {
    console.log("Gettin", id);
    return axiosInstance.get(`scientific-article/get-all-teacher-scientific-article-by-id/${id}`);
};

const getone = (id) => {
    return axiosInstance.get(`scientific-article/getone/${id}`);
};



const updateScientificArticle= (id, data) => {
    console.table(data);
    return axiosInstance.put(`/admin/scientific-article/${id}`, data);
};

const deleteListScientificArticle= (data) => {
    return axiosInstance.delete(`/admin/scientific-article/soft-list/delete`, {params: data});
};

export { getAllScientificArticle,
     getByIdScientific ,getScientificArticleAndDetail , 
     postScientificArticle, updateScientificArticle, 
     deleteListScientificArticle,
     getByIdscientific_article,
     getone};