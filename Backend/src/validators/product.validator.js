import { body, validationResult } from "express-validator";

const validate = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ success: false, errors: errors.array() });
    }
    next();
}

export const ProductValidator = [
    body("name").notEmpty().withMessage("Name is required"),
    body("brand").notEmpty().withMessage("Brand is required"),
    body("gender").notEmpty().withMessage("Gender is required"),
    body("category").notEmpty().withMessage("Category is required"),
    body("priceAmount").notEmpty().withMessage("PriceAmount is required"),
    body("priceCurrency").notEmpty().withMessage("PriceCurrency is required"),
    body("description").notEmpty().withMessage("Description is required"),
    validate
]

export const VariantValidator = [
    body("size").notEmpty().withMessage("Size is required"),
    body("sizeStandard").isIn(["US", "UK", "EU"]).withMessage("Size Standard is required"),
    body("stock").notEmpty().withMessage("Stock is required"),
    body("color").notEmpty().withMessage("Color is required"),
    validate
]