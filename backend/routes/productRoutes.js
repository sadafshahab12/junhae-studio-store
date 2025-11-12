import express from "express";
import { createProduct, getProducts } from "../controller/productController.js";

const productRouter = express.Router();

productRouter.get("/products", getProducts);
productRouter.post("/products", createProduct);

export { productRouter };
