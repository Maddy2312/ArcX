import axios from "axios";

const authApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/auth",
    withCredentials: true,
});

export const register = async (data) => {
    try {
        const response = await authApiInstance.post("/register", data);
        return response;
    } catch (error) {
        return error;
    }
}

export const login = async (data) => {
    try {
        const response = await authApiInstance.post("/login", data);
        return response;
    } catch (error) {
        return error;
    }
}