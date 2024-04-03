import axios from "axios";
import { axiosInstance } from "./AxiosCofig";

const GetNewViEnById = (id) => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/news/${id}`);
};

const get5LatestNews = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/news/get5LatestNews`);
};

const getTop5ViewCount = () => {
    return axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/news/getTop5ViewCount`
    );
};

const getTop5RelatedCategory = (id) => {
    return axios.get(
        `${process.env.REACT_APP_API_DOMAIN}/news/getTop5RelatedCategory/${id}`
    );
};

const GetAllCategories = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/categories`);
};

const SaveDataNewViEn = (
    id_category,
    title_en,
    title_vi,
    content_en,
    content_vi,
    thumbnail
) => {
    const data = {
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: 0,
        thumbnail: thumbnail,
    };
    console.log(data);
    return axios.post(`${process.env.REACT_APP_API_DOMAIN}/admin/news`, data, {
        withCredentials: true,
    });
};

const ListNews = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/admin/news`, {
        withCredentials: true,
    });
};

const GetNewCanUpdate = (id) => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/news/${id}`, {
        withCredentials: true,
    });
};

const updateViewCount = (id) => {
    return axios.put(
        `${process.env.REACT_APP_API_DOMAIN}/news/updateViewCount/${id}`
    );
};

const PutNewsByID = (
    id,
    id_category,
    title_en,
    title_vi,
    content_en,
    content_vi,
    view_count,
    thumbnail
) => {
    const data = {
        id_category: id_category,
        title_en: title_en,
        title_vi: title_vi,
        content_en: content_en,
        content_vi: content_vi,
        view_count: view_count,
        thumbnail: thumbnail,
    };
    console.log("data", data);
    return axios.put(
        `${process.env.REACT_APP_API_DOMAIN}/admin/news/${id}`,
        data,
        {
            withCredentials: true,
        }
    );
};

const UpdateStatusVi = (id) => {
    return axiosInstance.put(`/admin/news/update/status-vi/${id}`);
};

// Hàm update trạng thái cho tiếng Anh
const UpdateStatusEn = (id) => {
    return axiosInstance.put(`/admin/news/update/status-en/${id}`);
};

const UpdateStatuses = (data) => {
    return axiosInstance.put(`/admin/news/update/UpdateStatuses`, data);
};

export {
    GetNewViEnById,
    getTop5RelatedCategory,
    getTop5ViewCount,
    get5LatestNews,
    GetAllCategories,
    SaveDataNewViEn,
    ListNews,
    GetNewCanUpdate,
    PutNewsByID,
    UpdateStatusVi,
    UpdateStatusEn,
    updateViewCount,
    UpdateStatuses,
};

// CreateUser, GetAllUser, GetUserById
// const CreateUser = (name, email) => {
//     const data = new FormData();

//     data.append("name", name);
//     data.append("email", email);

//     return axios.post("${process.env.REACT_APP_API_DOMAIN}/users", data);
// };

// const GetAllUser = () => {
//     return axios.get("${process.env.REACT_APP_API_DOMAIN}/users");
// };

// const GetUserById = (id) => {
//     return axios.get(`${process.env.REACT_APP_API_DOMAIN}/users/${id}`);
// };
