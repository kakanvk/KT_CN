import { axiosInstance } from "./AxiosCofig";

const getAllMajors =()=>{
    return axiosInstance.get(`/admin/majors`);
}

const getMajorsByID =(id)=>{
    return axiosInstance.get(`/admin/majors/${id}`);
}



export {
    getAllMajors,
    getMajorsByID
};