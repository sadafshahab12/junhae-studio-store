import express from "express";
import { upload } from "../config/cloudinary.js";
import pkg from "express-validator";
import {
  getOrderById,
  getOrders,
  orderCreate,
  updateOrderStatus,
} from "../controller/orderController.js";

const { body } = pkg;

const orderRouter = express.Router();

orderRouter.get("/orders", getOrders);

// GET SINGLE ORDER BY ID
orderRouter.get("/orders/:id", getOrderById);

orderRouter.post(
  "/orders",
  [
    upload.single("paymentProof"),
    body("customerEmail").isEmail().withMessage("Invalid Email"),
    body("city").notEmpty().withMessage("City is required"),
    body("postalCode").notEmpty().withMessage("Postal code is required"),
    body("country").notEmpty().withMessage("Country is required"),
    body("paymentMethod").notEmpty().withMessage("Payment method is required"),
  ],
  orderCreate
);

orderRouter.put(
  "/orders/:id",
  [body("status").notEmpty().withMessage("Status is required")],
  updateOrderStatus
);
export { orderRouter };
