export const uploadProductImage = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ success: false, message: "No file uploaded" });
    }

    res.status(200).json({
      success: true,
      message: "Main image uploaded successfully",
      url: req.file.path, // Cloudinary returns the URL here
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading main image",
      error: error.message,
    });
  }
};

export const uploadGalleryImages = async (req, res) => {
  try {
    if (!req.files || req.files.length === 0) {
      return res.status(400).json({ success: false, message: "No files uploaded" });
    }

    const urls = req.files.map((file) => file.path);

    res.status(200).json({
      success: true,
      message: "Gallery images uploaded successfully",
      urls,
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error uploading gallery images",
      error: error.message,
    });
  }
};
