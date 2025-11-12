import mongoose from "mongoose";
import { Review } from "../models/Review.js";

// GET /reviews/:productId
export const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;

    // Validate productId format (must be ObjectId)
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    const reviews = await Review.find({ productId }).sort({ date: -1 }).lean();

    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res
      .status(500)
      .json({ success: false, message: "Failed to fetch reviews" });
  }
};

// POST /reviews
export const createReviews = async (req, res) => {
  try {
    const { productId, author, rating, text, avatarUrl } = req.body;

    // Validate required fields
    if (!productId || !author || !rating || !text) {
      return res.status(400).json({ message: "All fields are required" });
    }

    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ message: "Invalid product ID format" });
    }

    // Create and save review
    const review = await Review.create({
      productId,
      author,
      rating,
      text,
      avatarUrl:
        avatarUrl ||
        `https://ui-avatars.com/api/?name=${encodeURIComponent(author)}`,
    });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ success: false, message: "Failed to save review" });
  }
};
