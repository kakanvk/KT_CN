import { axiosInstance } from "./AxiosCofig";

const SaveProgramsAll=(data)=>{
    return axiosInstance.post(`/admin/programs`,data);
}
const GetProgramsByID=(id)=>{
    return axiosInstance.get(`/admin/programs/${id}`);
}

const PutProgramsByID=(id, data)=>{
    return axiosInstance.put(`/admin/programs/${id}`,data);
}
export {
    SaveProgramsAll,
    GetProgramsByID,
    PutProgramsByID
};

