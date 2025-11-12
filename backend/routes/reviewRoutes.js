import express from "express";
import { createReviews, getReviews } from "../controller/reviewController.js";

const reviewRouter = express.Router();

reviewRouter.get("/reviews/:productId", getReviews);
reviewRouter.post("/reviews", createReviews);

export { reviewRouter };
