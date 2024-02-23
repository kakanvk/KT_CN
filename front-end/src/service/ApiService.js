import axios from "axios";

const CreateUser = (name, email) => {
    const data = new FormData();

    data.append("name", name);
    data.append("email", email);

    return axios.post("http://127.0.0.1:8000/users", data);
};

const GetAllUser = () => {
    return axios.get("http://127.0.0.1:8000/users");
};

const GetUserById = (id) => {
    return axios.get(`http://127.0.0.1:8000/users/${id}`);
};

export { CreateUser, GetAllUser, GetUserById };
