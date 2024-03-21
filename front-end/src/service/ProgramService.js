import { axiosInstance } from "./AxiosCofig";

const SaveProgramsAll=(data)=>{
    return axiosInstance.post(`/admin/programs`,data);
}
const GetProgramsByID=(id)=>{
    return axiosInstance.get(`/admin/programs/${id}`);
}

const GetAllPrograms=()=>{
    return axiosInstance.get(`/admin/programs/`);
}
const PutProgramsByID=(id, data)=>{
    return axiosInstance.put(`/admin/programs/${id}`,data);
}

const PutStatusOneProgram =(id)=>{
    return axiosInstance.put(`/admin/programs/${id}/update/one/status`);
}

const UpdateStatusesProgram =(data)=>{
    console.table(data);
    return axiosInstance.put(`/admin/programs/all/status`,data);
}

export {
    SaveProgramsAll,
    GetProgramsByID,
    PutProgramsByID,
    GetAllPrograms,
    PutStatusOneProgram,
    UpdateStatusesProgram
};

