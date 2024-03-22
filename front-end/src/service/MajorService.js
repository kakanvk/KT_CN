import { axiosInstance } from "./AxiosCofig";

const getAllMajors =()=>{
    return axiosInstance.get(`/admin/majors`);
}

const getMajorsByID =(id)=>{
    return axiosInstance.get(`/admin/majors/${id}`);
}


const deletedListMajors = (data)=>{
    console.log("cehck",data);
    return axiosInstance.delete(`/admin/majors/soft-list/delete`, {params:data});
}

const saveMajor = (data)=>{
    return axiosInstance.post(`/admin/majors`, data);
}

const updateMajor = (id, data)=>{
    return axiosInstance.put(`/admin/majors/${id}`, data);
}

export {
    getAllMajors,
    getMajorsByID,
    deletedListMajors,
    saveMajor,
    updateMajor
};