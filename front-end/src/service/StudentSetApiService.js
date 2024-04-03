
import { axiosInstance } from "./AxiosCofig";

const getSixNewsByIdCategory =(id_category)=>{
    return axiosInstance.get(`/news/category/Take6/TakeFullNewsByCategory`);
}

export {
    getSixNewsByIdCategory
};