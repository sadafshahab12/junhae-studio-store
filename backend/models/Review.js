import mongoose from "mongoose";
const reviewSchema = new mongoose.Schema({
  productId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product", // <-- references your Product model
    required: true,
  },
  author: { type: String, required: true },
  avatarUrl: { type: String },
  rating: { type: Number, required: true, min: 1, max: 5 },
  text: { type: String, required: true },
  date: { type: Date, default: Date.now },
});
export const Review = mongoose.model("Review", reviewSchema);
