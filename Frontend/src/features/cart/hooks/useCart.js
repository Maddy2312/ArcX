import { useDispatch } from "react-redux";
import { addItemToCart , createOrder, getCart, verifyOrder} from "../services/cart.api.js";
import { setCart } from "../state/cart.slice.js";

const useCart = () => {
    const dispatch = useDispatch();

    const handleAddToCart = async (productId, variantId) => {
        try {
            const response = await addItemToCart(productId, variantId);
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleGetCart = async () => {
        try {
            const response = await getCart();
            dispatch(setCart(response.cart))
            return response;
        } catch (error) {
            throw error;
        }
    };

    const handleCreateOrder = async () => {
        try {
            const response = await createOrder();
            return response.order;
        } catch (error) {
            throw error;
        }
    };
    const handleVerifyOrder = async ({razorpay_order_id,razorpay_payment_id,razorpay_signature}) => {
        try {
            const response = await verifyOrder({razorpay_order_id,razorpay_payment_id,razorpay_signature});
            return response;
        } catch (error) {
            throw error;
        }
    };
    return {
        handleAddToCart,
        handleGetCart,
        handleCreateOrder,
        handleVerifyOrder
    };
};

export default useCart;