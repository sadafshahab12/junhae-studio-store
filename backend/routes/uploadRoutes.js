import express from "express";
import {
  uploadProductImage,
  uploadGalleryImages,
} from "../controller/uploadController.js";
import { upload } from "../config/cloudinary.js";

const uploadRouter = express.Router();

// Single main image
uploadRouter.post("/upload-main", upload.single("image"), uploadProductImage);

// Multiple gallery images
uploadRouter.post(
  "/upload-gallery",
  upload.array("images", 10),
  uploadGalleryImages
);

export { uploadRouter };
