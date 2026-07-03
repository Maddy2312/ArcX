import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import {
  ProductValidator,
  VariantSizeValidator,
  VariantValidator,
} from "../validators/product.validator.js";
import {
  addVariants,
  addVariantSize,
  createProduct,
  productDetails,
  sellerProducts,
} from "../controllers/product.controller.js";
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
});
const productRouter = Router();

productRouter.post(
  "/create",
  authenticateSeller,
  upload.array("images", 10),
  ProductValidator,
  createProduct,
);
productRouter.get("/seller", authenticateSeller, sellerProducts);
productRouter.get("/detail/:id", productDetails);
productRouter.post(
  "/:id/variants",
  authenticateSeller,
  upload.array("images", 10),
  VariantValidator,
  addVariants,
);
productRouter.post(
  "/:id/variants/:variantId/size",
  authenticateSeller,
  VariantSizeValidator,
  addVariantSize,
);
export default productRouter;
