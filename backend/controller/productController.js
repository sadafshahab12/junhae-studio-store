import { Product } from "../models/Product.js";

// 🧩 Create Product
export const createProduct = async (req, res) => {
  try {
    const {
      name,
      tagline,
      price,
      imageUrl,
      galleryImages,
      description,
      details,
      sizeGuide,
      category,
      newest,
      bestseller,
      stock,
      colors
    } = req.body;

    if (!name || !price || !description || !category) {
      return res
        .status(400)
        .json({ success: false, message: "Missing required fields" });
    }

    const newProduct = new Product({
      name,
      tagline,
      price,
      imageUrl,
      galleryImages,
      description,
      details,
      sizeGuide,
      category,
      newest,
      bestseller,
      stock,
      colors
    });

    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct,
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message,
    });
  }
};

// 🧩 Get All Products (with optional filters)
export const getProducts = async (req, res) => {
  try {
    const { category, newest, bestseller } = req.query;
    const filter = {};

    if (category) filter.category = category;
    if (newest) filter.newest = newest === "true";
    if (bestseller) filter.bestseller = bestseller === "true";

    const products = await Product.find(filter).sort({ createdAt: -1 });

    res.status(200).json({
      success: true,
      message: "Products fetched successfully",
      count: products.length,
      products,
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message,
    });
  }
};

// 🧩 Update Product
export const updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const updates = req.body;

    const updatedProduct = await Product.findByIdAndUpdate(id, updates, {
      new: true,
      runValidators: true,
    });

    if (!updatedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product updated successfully",
      product: updatedProduct,
    });
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while updating product",
      error: error.message,
    });
  }
};

// 🧩 Delete Product
export const deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;

    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res
        .status(404)
        .json({ success: false, message: "Product not found" });
    }

    res.status(200).json({
      success: true,
      message: "Product deleted successfully",
      product: deletedProduct,
    });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while deleting product",
      error: error.message,
    });
  }
};
