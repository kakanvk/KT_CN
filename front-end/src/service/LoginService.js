import axios from "axios";

const postToken = (email,uid,photoURL) => {
    const data = {
        email: email,
        uid: uid,
        photoURL: photoURL
    };

    return axios.post(`${process.env.REACT_APP_API_DOMAIN}/login`, data, { withCredentials: true });
};

const logoutToken = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/logout`, { withCredentials: true });
};

const getUserByToken = () => {
    return axios.get(`${process.env.REACT_APP_API_DOMAIN}/getUserByToken`, { withCredentials: true });
};

export {postToken, logoutToken, getUserByToken}