import mongoose from "mongoose";
import cartModel from "../models/cart.model.js";

export async function getCartDetails(userId) {
  try {
    let cart = (await cartModel.aggregate([
      {
        $match: {
          user: new mongoose.Types.ObjectId(userId),
        },
      },
      { $unwind: { path: "$items" } },
      {
        $lookup: {
          from: "products",
          localField: "items.product",
          foreignField: "_id",
          as: "items.product",
        },
      },
      { $unwind: { path: "$items.product" } },
      {
        $unwind: { path: "$items.product.variants" },
      },
      {
        $match: {
          $expr: {
            $eq: ["$items.product.variants._id", "$items.variant"],
          },
        },
      },
      {
        $addFields: {
          itemTotal: {
            $multiply: ["$items.quantity", "$items.product.price.amount"],
          },
        },
      },
      {
        $group: {
          _id: "$_id",
          totalPrice: { $sum: "$itemTotal" },
          currency: {
            $first: "$items.product.price.currency",
          },
          items: { $push: "$items" },
        },
      },
    ]))[0];
    return cart;
  } catch (error) {
    return error;
  }
}
