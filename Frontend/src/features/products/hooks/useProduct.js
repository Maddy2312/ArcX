import { useDispatch } from "react-redux";
import { createProductApi, sellerProductsApi } from "../services/product.api.js";
import { setProducts, setSellerProducts } from "../state/product.slice.js";

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
    const handleSellerProducts = async () => {
        try {
            const response = await sellerProductsApi();
            dispatch(setSellerProducts(response.products));
            return response;
        } catch (error) {
            throw error;
        }
    };
    return {
        handleCreateProduct,
        handleSellerProducts
    };
};

export default useProduct;
