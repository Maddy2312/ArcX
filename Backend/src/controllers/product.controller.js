import productModel from "../models/product.model.js";
import { uploadFile } from "../services/storage.service.js";

export const createProduct = async (req, res) => {
  try {
    const {
      name,
      brand,
      gender,
      category,
      priceAmount,
      priceCurrency,
      description,
    } = req.body;
    const seller = req.user;
    const images = await Promise.all(
        req.files.map(async (file)=>{
            return await uploadFile({
                buffer: file.buffer,
                fileName: file.originalname,
            })
        })
    )
    const product = await productModel.create({
      name,
      brand,
      gender,
      category,
      price: {
        amount: priceAmount,
        currency: priceCurrency,
      },
      description,
      images,
      seller: seller.id,
    });
    return res.status(200).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

export const sellerProducts = async (req, res) => {
    try {
        const seller = req.user;
        const products = await productModel.find({ seller: seller.id });
        return res.status(200).json({
            success: true,
            products,
        });
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        });
    }
}