import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },

    brand: {
      type: String,
      required: true,
    },

    gender: {
      type: String,
      enum: ["Male", "Female"],
      required: true,
    },

    category: {
      type: String,
      required: true,
    },

    price: {
      amount: {
        type: Number,
        required: true,
        min: 0,
      },

      currency: {
        type: String,
        enum: ["USD", "AUD"],
        default: "AUD",
      },
    },

    description: {
      type: String,
      required: true,
    },
    images: [
      {
        url: {
          type: String,
          required: true,
        },
        alt: {
          type: String,
        },
      },
    ],

    variants: [
      {
        size: [
          {
            sizeOfShoe: {
              type: Number,
              required: true,
            },
            sizeStandard: {
              type: String,
              enum: ["US", "UK", "EU"],
              default: "US",
            },
            stock: {
              type: Number,
              required: true,
              min: 0,
            },
          },
        ],
        color: {
          type: String,
          required: true,
        },
        images: [
          {
            url: {
              type: String,
              required: true,
            },
          },
        ],
      },
    ],
    seller: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  },
);

const productModel = mongoose.model("Product", productSchema);
export default productModel;
