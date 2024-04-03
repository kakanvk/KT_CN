import { axiosInstance } from "./AxiosCofig";

const postToken = (email, uid, photoURL, displayName) => {
    const data = {
        email: email,
        uid: uid,
        photoURL: photoURL,
        displayName: displayName
    };
    console.log(data);

    return axiosInstance.post(`/login`, data);
};


const logoutToken = () => {
    return axiosInstance.get(`/logout`);
};

const getCurrentUser = () => {
    return axiosInstance.get(`/admin/getCurrentUser`);
};

export { postToken, logoutToken, getCurrentUser };
