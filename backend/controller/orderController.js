import pkg from "express-validator";
import { Order } from "../models/Order.js";

const { validationResult } = pkg;

// GET ORDERS (optionally by customer email)
export const getOrders = async (req, res) => {
  try {
    const { email } = req.query;
    const query = email ? { customerEmail: email } : {};
    const orders = await Order.find(query).sort({ createdAt: -1 });
    res.status(200).json({ orders });
  } catch (error) {
    console.error("Failed to fetch orders", error);
    res.status(500).json({ message: "Server error" });
  }
};

// GET SINGLE ORDER BY ID
export const getOrderById = async (req, res) => {
  try {
    const { id } = req.params;
    const order = await Order.findById(id);
    if (!order) return res.status(404).json({ message: "Order not found" });
    res.status(200).json({ order });
  } catch (error) {
    console.error("Failed to fetch order", error);
    res.status(500).json({ message: "Server error" });
  }
};

export const orderCreate = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  try {
    const {
      customerName,
      customerEmail,
      address,
      city,
      postalCode,
      country,
      products,
      shippingMethod,
      total,
      tax,
      paymentMethod,
    } = req.body;
    const shippingDays = shippingMethod === "express" ? 5 : 12;

    const order = new Order({
      customerName,
      customerEmail,
      address,
      city,
      postalCode,
      country,
      products: JSON.parse(products),
      shippingMethod,
      shippingDays,
      tax,
      total,
      paymentMethod,
      paymentProof: req.file?.path, // Cloudinary URL
    });

    await order.save();
    res.status(201).json({ message: "Order placed successfully", order });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const updateOrderStatus = async (req, res) => {
  try {
    const { id } = req.params;
    const { status } = req.body;

    if (!status) {
      return res.status(400).json({ message: "Status is required" });
    }

    const allowedStatus = ["Processing", "Shipped", "Delivered", "Cancelled"];

    if (!allowedStatus.includes(status)) {
      return res.status(400).json({ message: "Invalid status value" });
    }

    const updatedOrder = await Order.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }

    return res.status(200).json({
      message: "Order status updated successfully",
      order: updatedOrder,
    });
  } catch (error) {
    console.error("Status update error:", error);
    res.status(500).json({ message: "Server error" });
  }
};
