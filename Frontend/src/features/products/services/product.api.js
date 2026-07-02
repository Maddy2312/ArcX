import axios from "axios";

const productApiInstance = axios.create({
    baseURL: "http://localhost:3000/api/products",
    withCredentials: true,
});

export const createProductApi = async (data)=>{
    try {
        const response = await productApiInstance.post("/create",data);
        return response.data;
    } catch (error) {
        return error;
    }
}

export const sellerProductsApi = async () => {
    try {
        const response = await productApiInstance.get("/seller");
        return response.data;
    } catch (error) {
        return error;
    }
}