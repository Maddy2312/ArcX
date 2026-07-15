import axios from "axios";

const CartApiInstance = axios.create({
  baseURL: "http://localhost:3000/api/cart",
  withCredentials: true,
});

export const addItemToCart = async (productId, variantId) => {
  try {
    const response = await CartApiInstance.post(
      `/add/${productId}/${variantId}`,
      {
        quantity: 1,
      },
    );
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const getCart = async () => {
  try {
    const response = await CartApiInstance.get("/cart");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const createOrder = async () => {
  try {
    const response = await CartApiInstance.post("/payment/create/order");
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOrder = async ({razorpay_order_id,razorpay_payment_id,razorpay_signature}) => {
  try {
    const response = await CartApiInstance.post("/payment/verify/order",{
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
