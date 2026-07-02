import { useDispatch } from "react-redux";
import { createProductApi } from "../services/product.api.js";
import { setProducts } from "../state/product.slice.js";

const useProduct = () => {
    const dispatch = useDispatch();
    const handleCreateProduct = async (formData) => {
        try {
            const response = await createProductApi(formData);
            return response;
        } catch (error) {
            throw error;
        }
    };
    return {
        handleCreateProduct
    };
};

export default useProduct;
