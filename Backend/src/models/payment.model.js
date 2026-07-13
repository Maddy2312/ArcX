import mongoose, { mongo } from "mongoose";

const paymentSchema = new mongoose.Schema({
  status: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  price: {
    amount: {
      type: Number,
      required: true,
    },
    currency: {
      type: String,
      required: true,
    },
  },
  razorpay: {
    orderId: {
      type: String,
    },
    paymentId: {
      type: String,
    },
    signature: {
      type: String,
    },
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  orderItems: [
    {
      title: String,
      productId: mongoose.Schema.Types.ObjectId,
      variantId: mongoose.Schema.Types.ObjectId,
      quantity: Number,
      price: {
        amount: {
          type: Number,
          required: true,
        },
        currency: {
          type: String,
          required: true,
        },
      },
      images: [{url: String}],
      description: String,
    },
  ],
});

const paymentModel = mongoose.model("Payment", paymentSchema);

export default paymentModel;