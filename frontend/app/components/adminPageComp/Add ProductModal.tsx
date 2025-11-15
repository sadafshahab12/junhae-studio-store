"use client"
import { Product } from "@/app/data/types";
import UploadCloudIcon from "@/app/icons/UploadCloudIcon";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
interface ProductFormData {
  name: string;
  slug: string;
  tagline: string;
  price: number;
  description: string;
  category: string;
  stock: number;
  newest: boolean;
  bestseller: boolean;
  imageUrl: string;
  galleryImages: string[];
  details: string[];
  sizeGuide: { size: string; chest: string; length: string }[];
  colors: string[]; // <-- NEW FIELD
}

// Helper function to calculate the initial form data based on the 'product' prop
const getInitialFormData = (product?: Product): ProductFormData => ({
  name: product?.name || "",
  slug: product?.slug || "",
  tagline: product?.tagline || "",
  price: product?.price || 0,
  description: product?.description || "",
  category: product?.category || "Tees",
  stock: product?.stock || 0,
  newest: product?.newest || false,
  bestseller: product?.bestseller || false,
  imageUrl: product?.imageUrl || "",
  galleryImages: product?.galleryImages || [],
  details: product?.details || [],
  sizeGuide: product?.sizeGuide || [],
  colors: product?.colors || [],
});

export const AddProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (product: Product) => void;
}> = ({ isOpen, onClose, product, onSave }) => {
  // ✅ FIX: Initialize formData using the helper function.
  // This state will reset correctly when the component is remounted via the 'key' prop in the parent.
  const [formData, setFormData] = useState<ProductFormData>(() =>
    getInitialFormData(product)
  );
  const [newColor, setNewColor] = useState("");

  const [newDetail, setNewDetail] = useState("");
  const [newSizeGuide, setNewSizeGuide] = useState({
    size: "",
    chest: "",
    length: "",
  });
  const [newGalleryImage, setNewGalleryImage] = useState(""); // Kept for logic

  // Ref for the hidden file input
  const galleryFileInputRef = useRef<HTMLInputElement>(null);
  // Ref for the main image file input
  const mainImageFileInputRef = useRef<HTMLInputElement>(null);

  // Keep this useEffect only for resetting auxiliary inputs on mount/remount
  useEffect(() => {
    const resetDetails = async () => {
      // Reset auxiliary inputs when the modal opens for a new product or an edit
      setNewDetail("");
      setNewSizeGuide({ size: "", chest: "", length: "" });
      setNewGalleryImage("");
    };
    resetDetails();
  }, [product, isOpen]); // Reruns when product context changes or modal state toggles

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      // **CRUCIAL CHANGE:** Ensure ID is included for updates, and explicitly can be undefined for new products
      id: product?.id,
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
      // Type casting necessary since we manually construct a Product, assuming all keys are present
    } as Product;
    onSave(productData);
    onClose();
  };

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const isNumber = name === "price" || name === "stock";

    setFormData((prev) => {
      const updatedFormData = {
        ...prev,
        [name]: isNumber ? parseFloat(value) || parseInt(value) || 0 : value,
      };

      // Auto-generate slug if not manually set
      if (name === "name" && !product && !prev.slug) {
        updatedFormData.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      } else if (name === "name" && product && product.id && !prev.slug) {
        // Auto-generate slug on name change for editing if slug was not manually changed
        updatedFormData.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }
      return updatedFormData;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData({ ...formData, [name]: checked });
  };

  const addDetail = () => {
    if (newDetail.trim()) {
      setFormData({
        ...formData,
        details: [...formData.details, newDetail.trim()],
      });
      setNewDetail("");
    }
  };

  const removeDetail = (index: number) => {
    setFormData({
      ...formData,
      details: formData.details.filter((_, i) => i !== index),
    });
  };

  const addSizeGuide = () => {
    if (newSizeGuide.size && newSizeGuide.chest && newSizeGuide.length) {
      setFormData({
        ...formData,
        sizeGuide: [...formData.sizeGuide, { ...newSizeGuide }],
      });
      setNewSizeGuide({ size: "", chest: "", length: "" });
    }
  };

  const removeSizeGuide = (index: number) => {
    setFormData({
      ...formData,
      sizeGuide: formData.sizeGuide.filter((_, i) => i !== index),
    });
  };

  const addGalleryImage = (imageUrl: string) => {
    if (imageUrl.trim()) {
      setFormData((prev) => ({
        ...prev,
        galleryImages: [...prev.galleryImages, imageUrl.trim()],
      }));
    }
  };

  const handleGalleryImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      // Mock the URL for each file selected.
      Array.from(files).forEach((file) => {
        const mockUrl = `https://mock-storage.com/gallery/${file.name.replace(
          /\s/g,
          "_"
        )}`;
        addGalleryImage(mockUrl);
      });

      // Clear the file input's value
      e.target.value = "";
    }
  };

  const handleMainImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      // Mock the URL for the main image
      const mockUrl = `https://mock-storage.com/main/${file.name.replace(
        /\s/g,
        "_"
      )}`;

      setFormData((prev) => ({
        ...prev,
        imageUrl: mockUrl,
      }));

      // Clear the file input's value
      e.target.value = "";
    }
  };

  const removeGalleryImage = (index: number) => {
    setFormData({
      ...formData,
      galleryImages: formData.galleryImages.filter((_, i) => i !== index),
    });
  };

  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData({
        ...formData,
        colors: [...formData.colors, newColor.trim()],
      });
      setNewColor("");
    }
  };

  const removeColor = (index: number) => {
    setFormData({
      ...formData,
      colors: formData.colors.filter((_, i) => i !== index),
    });
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 overflow-y-auto"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-4xl p-6 my-8 max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          {product ? "Edit Product" : "Add New Product"}
        </h3>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Slug *
              </label>
              <input
                type="text"
                name="slug"
                value={formData.slug}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Tagline *
              </label>
              <input
                type="text"
                name="tagline"
                value={formData.tagline}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Price ($) *
              </label>
              <input
                type="number"
                step="0.01"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              >
                <option value="Tees">Tees</option>
                <option value="Hoodies">Hoodies</option>
                <option value="Tops">Tops</option>
                <option value="Custom Prints">Custom Prints</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Stock Quantity
              </label>
              <input
                type="number"
                name="stock"
                value={formData.stock}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                name="newest"
                checked={formData.newest}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Newest
              </span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                name="bestseller"
                checked={formData.bestseller}
                onChange={handleCheckboxChange}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">
                Bestseller
              </span>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Main Image - REPLACED with File Upload UI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Main Image *
            </label>
            <div className="flex flex-col gap-2 mb-2">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={mainImageFileInputRef}
                onChange={handleMainImageUpload}
                accept="image/*"
                className="hidden"
                required={!formData.imageUrl} // Require file/URL unless one is already set (on edit)
              />

              {/* Image Preview or Upload Button */}
              {formData.imageUrl ? (
                <div className="flex items-center gap-4 p-3 border border-gray-300 rounded-md dark:border-gray-600">
                  <Image
                    src={formData.imageUrl}
                    alt="Main Product Preview"
                    width={80}
                    height={80}
                    className="w-20 h-20 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">
                      Current Image: {formData.imageUrl.substring(0, 50)}...
                    </p>
                    <button
                      type="button"
                      onClick={() => mainImageFileInputRef.current?.click()}
                      className="mt-1 text-xs text-blue-600 hover:underline dark:text-blue-400"
                    >
                      Change Image
                    </button>
                  </div>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => mainImageFileInputRef.current?.click()}
                  className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600"
                >
                  <UploadCloudIcon className="w-8 h-8 text-gray-400" />
                  <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                    Click to upload main image *
                  </span>
                  <span className="text-xs text-gray-500 dark:text-gray-400">
                    PNG, JPG
                  </span>
                </button>
              )}
            </div>
          </div>

          {/* Gallery Images - File Upload UI */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gallery Images
            </label>
            <div className="flex gap-2 mb-4">
              {/* Hidden File Input */}
              <input
                type="file"
                ref={galleryFileInputRef}
                onChange={handleGalleryImageUpload}
                multiple // Allows multiple file selection
                accept="image/*"
                className="hidden"
              />

              {/* File Upload Button UI */}
              <button
                type="button" // 👈 Use type="button" to prevent form submission
                onClick={() => galleryFileInputRef.current?.click()} // 👈 Trigger click on hidden input
                className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600"
              >
                <UploadCloudIcon className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Click to upload gallery images
                </span>
                <span className="text-xs text-gray-500 dark:text-gray-400">
                  PNG, JPG (Multiple files allowed)
                </span>
              </button>
            </div>

            {/* Displaying Current Gallery Images (Mock URLs) */}
            <div className="space-y-2">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {img}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200 dark:bg-red-900 dark:text-red-300 dark:hover:bg-red-800"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Details */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Product Details
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newDetail}
                onChange={(e) => setNewDetail(e.target.value)}
                placeholder="Add detail (e.g., 100% Cotton)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addDetail())
                }
              />
              <button
                type="button"
                onClick={addDetail}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Add
              </button>
            </div>
            <ul className="space-y-1">
              {formData.details.map((detail, idx) => (
                <li
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {detail}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeDetail(idx)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    ×
                  </button>
                </li>
              ))}
            </ul>
          </div>
          {/* available color  */}
          {/* Colors */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Available Colors
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="text"
                value={newColor}
                onChange={(e) => setNewColor(e.target.value)}
                placeholder="Add a color (e.g., Red)"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                onKeyPress={(e) =>
                  e.key === "Enter" && (e.preventDefault(), addColor())
                }
              />
              <button
                type="button"
                onClick={addColor}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Add
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              {formData.colors.map((color, idx) => (
                <span
                  key={idx}
                  className="flex items-center px-2 py-1 text-sm bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300 rounded"
                >
                  {color}
                  <button
                    type="button"
                    onClick={() => removeColor(idx)}
                    className="ml-2 text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    ×
                  </button>
                </span>
              ))}
            </div>
          </div>

          {/* Size Guide */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Size Guide
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                value={newSizeGuide.size}
                onChange={(e) =>
                  setNewSizeGuide({ ...newSizeGuide, size: e.target.value })
                }
                placeholder="Size"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                value={newSizeGuide.chest}
                onChange={(e) =>
                  setNewSizeGuide({ ...newSizeGuide, chest: e.target.value })
                }
                placeholder="Chest"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                value={newSizeGuide.length}
                onChange={(e) =>
                  setNewSizeGuide({ ...newSizeGuide, length: e.target.value })
                }
                placeholder="Length"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={addSizeGuide}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700 dark:bg-gray-700 dark:hover:bg-gray-600"
              >
                Add
              </button>
            </div>
            <div className="space-y-1">
              {formData.sizeGuide.map((guide, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded"
                >
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    {guide.size} - Chest: {guide.chest}, Length: {guide.length}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeSizeGuide(idx)}
                    className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300"
            >
              {product ? "Update Product" : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
