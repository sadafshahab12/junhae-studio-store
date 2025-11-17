import { Product } from "../models/Product.js";

// 🧩 Create Product
export const createProduct = async (req, res) => {
  try {
    // Destructure request body
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

    // 🔹 Basic validation
    if (!name || !price || !description || !category) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields: name, price, description, or category"
      });
    }

    // 🔹 Parse nested arrays safely (sizeGuide, details, colors, galleryImages)
    const parsedSizeGuide = sizeGuide
      ? typeof sizeGuide === "string"
        ? JSON.parse(sizeGuide)
        : sizeGuide
      : [];

    const parsedDetails = details
      ? typeof details === "string"
        ? JSON.parse(details)
        : details
      : [];

    const parsedColors = colors
      ? typeof colors === "string"
        ? JSON.parse(colors)
        : colors
      : [];

    const parsedGallery = galleryImages
      ? typeof galleryImages === "string"
        ? JSON.parse(galleryImages)
        : galleryImages
      : [];

    // 🔹 Create new product
    const newProduct = new Product({
      name,
      tagline,
      price,
      imageUrl,
      galleryImages: parsedGallery,
      description,
      details: parsedDetails,
      sizeGuide: parsedSizeGuide,
      category,
      newest: newest ?? false,
      bestseller: bestseller ?? false,
      stock: stock ?? 0,
      colors: parsedColors
    });

    // 🔹 Save to database
    const savedProduct = await newProduct.save();

    res.status(201).json({
      success: true,
      message: "Product created successfully",
      product: savedProduct
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      success: false,
      message: "Server error while creating product",
      error: error.message
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
      products
    });
  } catch (error) {
    console.error("Error fetching products:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching products",
      error: error.message
    });
  }
};
