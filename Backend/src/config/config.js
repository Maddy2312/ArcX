import dotenv from "dotenv";
dotenv.config();

if (!process.env.MONGO_URI) {
    throw new Error("MONGO_URI is not defined");
}

if (!process.env.PORT) {
    throw new Error("PORT is not defined");
}

if (!process.env.JWT_SECRET) {
    throw new Error("JWT_SECRET is not defined");
}

if(!process.env.IMAGEKIT_PRIVATE_KEY){
    throw new Error("IMAGEKIT_PRIVATE_KEY is not defined");
}


if(!process.env.Razorpay_API_Key){
    throw new Error("Razorpay_API_Key is not defined");
}

if(!process.env.Razorpay_Key_Secret){
    throw new Error("Razorpay_Key_Secret is not defined");
}


export const config = {
    MONGO_URI: process.env.MONGO_URI,
    PORT: process.env.PORT,
    JWT_SECRET: process.env.JWT_SECRET,
    IMAGEKIT_PRIVATE_KEY: process.env.IMAGEKIT_PRIVATE_KEY,
    Razorpay_API_Key: process.env.Razorpay_API_Key,
    Razorpay_Key_Secret: process.env.Razorpay_Key_Secret,
};