import mongoose from "mongoose";
const orderSchema = new mongoose.Schema({
  customerName: { type: String, required: true },
  customerEmail: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  postalCode: { type: String, required: true },
  country: { type: String, required: true },
  products: [
    {
      name: String,
      size: String,
      color: String,
      quantity: Number,
      price: Number,
    },
  ],
  shippingMethod: {
    type: String,
    enum: ["standard", "express"],
    default: "standard",
  },
  shippingDays: Number,
  tax: Number,
  total: Number,
  paymentMethod: { type: String, required: true },
  paymentProof: String, // Cloudinary URL
  status: { type: String, default: "Processing" },
  date: { type: Date, default: Date.now },
});

export const Order = mongoose.model("Order", orderSchema);
