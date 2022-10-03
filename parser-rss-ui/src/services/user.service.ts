import http from "./http-common";
import authHeader from "./auth-header";

export const getUserBoard = () => {
    return http.get("/auth/user", { headers: authHeader() });
};
