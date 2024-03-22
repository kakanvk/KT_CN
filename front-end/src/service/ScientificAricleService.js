import { axiosInstance } from "./AxiosCofig";

const getByIdScientific = (id) => {
    console.log("dc");
    return axiosInstance.get(`/scientific-article/${id}`);
};


export { getByIdScientific };