import { useDispatch } from "react-redux";
import { addVariantsApi, addVariantSizeApi, createProductApi, productDetailsApi, sellerProductsApi, userProductsApi } from "../services/product.api.js";
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
    const handleProductDetails = async (id) => {
        try {
            const response = await productDetailsApi(id);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleAddVariants = async (id,formData) => {
        try {
            const response = await addVariantsApi(id,formData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleAddVariantSize = async (id,variantId,formData) => {
        try {
            const response = await addVariantSizeApi(id,variantId,formData);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleUserProducts = async () => {
        try {
            const response = await userProductsApi();
            dispatch(setProducts(response.products));
            return response;
        } catch (error) {
            throw error;
        }
    };
    return {
        handleCreateProduct,
        handleSellerProducts,
        handleProductDetails,
        handleAddVariants,
        handleAddVariantSize,
        handleUserProducts
    };
};

export default useProduct;
