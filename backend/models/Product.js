import mongoose from "mongoose";
import slugify from "slugify";
const sizeGuideSchema = new mongoose.Schema({
  size: { type: String, required: true },
  chest: { type: String, required: true },
  length: { type: String, required: true },
});

const productSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    slug: { type: String, unique: true },
    tagline: String,
    price: Number,
    imageUrl: String,
    galleryImages: [String],
    description: String,
    details: [String],
    sizeGuide: [sizeGuideSchema],
    category: String,
    newest: { type: Boolean, default: false },
    bestseller: { type: Boolean, default: false },
    stock: { type: Number, default: 0 },
  },
  { timestamps: true }
);

// Auto-generate slug from name
productSchema.pre("save", function (next) {
  if (this.isModified("name") || !this.slug) {
    this.slug = slugify(this.name, { lower: true, strict: true });
  }
  next();
});

export const Product = mongoose.model("Product", productSchema);
