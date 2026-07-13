import { Router } from "express";
import { authenticateUser } from "../middlewares/auth.middleware.js";
import { validateAddToCart } from "../validators/cart.validator.js";
import { addToCart, createOrderController, getCart, verifyOrderController } from "../controllers/cart.controller.js";

const cartRouter = Router();

cartRouter.post("/add/:productId/:variantId", authenticateUser, validateAddToCart, addToCart);
cartRouter.get("/cart", authenticateUser, getCart);
cartRouter.post("/payment/create/order", authenticateUser, createOrderController)
cartRouter.post("/payment/verify/order", authenticateUser, verifyOrderController)
export default cartRouter;
