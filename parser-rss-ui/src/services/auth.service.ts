import http from "./http-common";
import { IUser } from "../types/user.type";

const register = (props: IUser) => {
    return http.post("/auth/signup", props);
};

const login = async (props: IUser) => {
    const response = await http.post("/auth/signin", props);
    if (response.data.accessToken) {
        localStorage.setItem("user", JSON.stringify(response.data));
    }
    return response.data;
};

const logout = () => {
    localStorage.removeItem("user");
};

const getCurrentUser = () => {
    const userStr = localStorage.getItem("user");
    if (userStr) return JSON.parse(userStr);

    return null;
};

const UserService = {
    register,
    login,
    logout,
    getCurrentUser
};


export default UserService;
