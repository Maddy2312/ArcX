import { validatePaymentVerification } from "razorpay/dist/utils/razorpay-utils.js";
import { getCartDetails } from "../dao/cart.dao.js";
import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import paymentModel from "../models/payment.model.js";
import productModel from "../models/product.model.js";
import { createOrder } from "../services/payment.service.js";
import { config } from "../config/config.js";

export const addToCart = async (req, res) => {
  try {
    const { productId, variantId } = req.params;
    const { quantity } = req.body;
    const user = req.user;
    const product = await productModel.findOne({
      _id: productId,
      "variants._id": variantId,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const cart =
      (await cartModel.findOne({ user: user.id })) ||
      (await cartModel.create({ user: user.id }));

    const isProductAlreadyInCart = cart.items.find(
      (item) =>
        item.product.toString() === productId &&
        item.variant.toString() === variantId
    );
    if (isProductAlreadyInCart) {
      const quantityInCart = cart.items.find(
        (item) =>
          item.product.toString() === productId &&
          item.variant.toString() === variantId,
      ).quantity;
      if (
        quantityInCart + quantity >
        (await stockOfVariant(productId, variantId))
      ) {
        return res.status(400).json({
          success: false,
          message: "Quantity exceeds stock",
        });
      }
      await cartModel.findOneAndUpdate(
        {
          user: req.user._id,
          "items.product": productId,
          "items.variant": variantId,
        },
        {
          $inc: {
            "items.$.quantity": quantity,
          },
        },
        { new: true },
      );
      return res.status(200).json({
        success: true,
        message: "Cart updated successfully",
      });
    }
    if (quantity > (await stockOfVariant(productId, variantId))) {
      return res.status(400).json({
        success: false,
        message: "Quantity exceeds stock",
      });
    }
    
    cart.items.push({
      product: productId,
      variant: variantId,
      quantity,
      price: product.price,
    });
    await cart.save();
    return res.status(200).json({
      success: true,
      message: "Product added to cart successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const getCart = async(req,res)=>{
    try{
    const user = req.user;
    // let cart = await cartModel.findOne({user:user.id}).populate("items.product");
    let cart = await getCartDetails(user.id);
    if (!cart) {
      cart = await cartModel.create({ user: user.id });
    }
    return res.status(200).json({
      success: true,
      message: "Cart fetched successfully",
      cart,
    });
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}

export const createOrderController = async (req, res) => {
  try {
    const cart = await getCartDetails(req.user._id);
    if(!cart){
      return res.status(404).json({
        success: false,
        message: "Cart not found",
      });
    }
    const order = await createOrder({amount:cart.totalPrice ,currency:cart.currency});
    await paymentModel.create({
      user: req.user._id,
      price: {
        amount: cart.totalPrice,
        currency: cart.currency,
      },
      razorpay: {
        orderId: order.id,
      },
      orderItems: cart.items.map((item)=>{
        return {
          title: item.product.name,
          productId: item.product._id,
          variantId: item.variant._id,
          quantity: item.quantity,
          price: {
            amount: item.product.price.amount,
            currency: item.product.price.currency,
          },
          description: item.product.description,
          images: item.product.variants.images || item.product.images,
        }
      })
    });
    return res.status(200).json({
      success: true,
      message: "Order created successfully",
      order,
    });
    
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const verifyOrderController = async (req, res) => {
  try {
    const { razorpay_payment_id,razorpay_order_id,razorpay_signature } = req.body;
    const order = await paymentModel.findOne({
      "razorpay.orderId": razorpay_order_id,
      status: "pending"
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        message: "Payment not found",
      });
    }
    const isValid = validatePaymentVerification(
      {
        order_id: razorpay_order_id,
        payment_id: razorpay_payment_id,
      },
      razorpay_signature,
      config.Razorpay_Key_Secret
    );
    if (!isValid) {
      order.status = "failed";
      await order.save();
      return res.status(400).json({
        success: false,
        message: "Invalid payment",
      });
    }
    order.razorpay.paymentId = razorpay_payment_id;
    order.razorpay.signature = razorpay_signature;
    order.status = "paid";
    await order.save();
    return res.status(200).json({
      success: true,
      message: "Order verified successfully",
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}