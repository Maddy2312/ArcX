import productModel from "../models/product.model";

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

    const images = await Promise.all(
        req.files.map(async (file)=>{
            return await uploadFile({
                buffer: file.buffer,
                fleName: file.originalname,
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
      images
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
