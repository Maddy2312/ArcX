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
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );
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
};

export const productDetails = async (req, res) => {
  try {
    const { id } = req.params;
    const product = await productModel.findById(id);
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    return res.status(200).json({
      success: true,
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

export const addVariants = async (req, res) => {
  try {
    const { id } = req.params;
    const { size, sizeStandard, stock, color } = req.body;
    const product = await productModel.findOne({
      _id: id,
      seller: req.user.id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const images = await Promise.all(
      req.files.map(async (file) => {
        return await uploadFile({
          buffer: file.buffer,
          fileName: file.originalname,
        });
      }),
    );

    product.variants.push({
      size: { sizeOfShoe: size, sizeStandard, stock },
      color,
      images,
    });
    await product.save();

    return res.status(200).json({
      success: true,
      message: "Variants added successfully",
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

export const addVariantSize = async (req, res) => {
  try {
    const { id, variantId } = req.params;
    const { sizeOfShoe, sizeStandard, stock } = req.body;
    const product = await productModel.findOne({
      _id: id,
      seller: req.user.id,
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        message: "Product not found",
      });
    }
    const variant = product.variants.id(variantId);
    if (!variant) {
      return res.status(404).json({
        success: false,
        message: "Variant not found",
      });
    }
    variant.size.push({ sizeOfShoe, sizeStandard, stock });
    await product.save();
    return res.status(200).json({
      success: true,
      message: "Variant size added successfully",
      product,
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  }
}

export const userProducts = async (req, res) => {
  try {
    const products = await productModel.find();
    if(!products){
      return res.status(404).json({
        success: false,
        message: "Products not found",
      });
    }
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
