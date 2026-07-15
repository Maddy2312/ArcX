import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./routes/auth.routes.js";
import productRouter from "./routes/product.routes.js";
import cartRouter from "./routes/cart.routes.js";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(cors({
    origin: "https://arcx-8tgc.onrender.com",
    credentials: true
}));
app.use(morgan("dev"));
app.use(express.static("./public"))

app.use('/api/auth', authRouter);
app.use('/api/products', productRouter);
app.use("/api/cart", cartRouter);

export default app;