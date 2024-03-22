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
    return axiosInstance.put(`/admin/programs/all/status`,data);
}

const DeleteProgramById =(id)=>{
    return axiosInstance.delete(`/admin/programs/${id}`);
}

const DeleteListProgram =(data)=>{
    return axiosInstance.delete(`/admin/programs/delete/list`,{params: data});
}


export {
    SaveProgramsAll,
    GetProgramsByID,
    PutProgramsByID,
    GetAllPrograms,
    PutStatusOneProgram,
    UpdateStatusesProgram,
    DeleteProgramById,
    DeleteListProgram
};

