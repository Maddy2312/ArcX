import { Router } from "express";
import { authenticateSeller } from "../middlewares/auth.middleware.js";
import multer from "multer";
import { ProductValidator } from "../validators/product.validator.js";
import { createProduct } from "../controllers/product.controller.js";
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

export default productRouter;
