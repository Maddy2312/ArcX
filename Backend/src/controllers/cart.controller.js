import { stockOfVariant } from "../dao/product.dao.js";
import cartModel from "../models/cart.model.js";
import productModel from "../models/product.model.js";

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
        item.variant.toString() === variantId,
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
    let cart = await cartModel.findOne({user:user.id}).populate("items.product");
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