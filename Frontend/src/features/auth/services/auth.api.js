import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "/api/auth",
    withCredentials: true,
});

export const register = async (data) => {
    try {
        const response = await authApiInstance.post("/register", data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const login = async (data) => {
    try {
        const response = await authApiInstance.post("/login", data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const getMe = async () => {
    try {
        const response = await authApiInstance.get("/getUser");
        return response.data;
    } catch (error) {
        return error;
    }
}