"use client";

import { Product } from "@/app/data/types";
import UploadCloudIcon from "@/app/icons/UploadCloudIcon";
import { useProduct } from "@/app/context/ProductContext";
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
  mainImageFile?: File;
  galleryFiles: File[];
  details: string[];
  sizeGuide: { size: string; chest: string; length: string }[];
  colors: string[];
  imageUrl?: string;
  galleryImages?: string[];
}

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
  mainImageFile: undefined,
  galleryFiles: [],
  details: product?.details || [],
  sizeGuide: product?.sizeGuide || [],
  colors: product?.colors || [],
  imageUrl: product?.imageUrl || "",
  galleryImages: product?.galleryImages || [],
});

export const AddProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (data: ProductFormData & { id?: string }) => Promise<void>;
}> = ({ isOpen, onClose, product, onSave }) => {
  const { isAdding, isUpdating } = useProduct();
  const [formData, setFormData] = useState<ProductFormData>(
    getInitialFormData(product)
  );
  const [newColor, setNewColor] = useState("");
  const [newDetail, setNewDetail] = useState("");
  const [newSizeGuide, setNewSizeGuide] = useState({
    size: "",
    chest: "",
    length: "",
  });

  const mainImageRef = useRef<HTMLInputElement>(null);
  const galleryImageRef = useRef<HTMLInputElement>(null);
  const isSaving = isAdding || isUpdating;

  useEffect(() => {
    const resetForm = async () => {
      setFormData(getInitialFormData(product));
      setNewColor("");
      setNewDetail("");
      setNewSizeGuide({ size: "", chest: "", length: "" });
    };
    resetForm();
  }, [product, isOpen]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    const isNumber = name === "price" || name === "stock";
    setFormData((prev) => {
      const updated: any = { ...prev, [name]: isNumber ? +value : value };
      if (name === "name" && !prev.slug) {
        updated.slug = value
          .toLowerCase()
          .replace(/\s+/g, "-")
          .replace(/[^a-z0-9-]/g, "");
      }
      return updated;
    });
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;
    setFormData((prev) => ({ ...prev, [name]: checked }));
  };

  const handleMainImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) {
      setFormData((prev) => ({ ...prev, mainImageFile: e.target.files![0] }));
    }
  };

  const handleGalleryImagesChange = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {
    if (e.target.files && e.target.files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        galleryFiles: [...prev.galleryFiles, ...Array.from(e.target.files!)],
      }));
    }
  };

  // Add/remove details
  const addDetail = () => {
    if (newDetail.trim()) {
      setFormData((prev) => ({
        ...prev,
        details: [...prev.details, newDetail.trim()],
      }));
      setNewDetail("");
    }
  };
  const removeDetail = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      details: prev.details.filter((_, i) => i !== index),
    }));
  };

  // Add/remove size guide
  const addSizeGuide = () => {
    if (newSizeGuide.size && newSizeGuide.chest && newSizeGuide.length) {
      setFormData((prev) => ({
        ...prev,
        sizeGuide: [...prev.sizeGuide, { ...newSizeGuide }],
      }));
      setNewSizeGuide({ size: "", chest: "", length: "" });
    }
  };
  const removeSizeGuide = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      sizeGuide: prev.sizeGuide.filter((_, i) => i !== index),
    }));
  };

  // Add/remove colors
  const addColor = () => {
    if (newColor.trim() && !formData.colors.includes(newColor.trim())) {
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, newColor.trim()],
      }));
      setNewColor("");
    }
  };
  const removeColor = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((_, i) => i !== index),
    }));
  };

  const removeGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      galleryFiles: prev.galleryFiles.filter((_, i) => i !== index),
    }));
  };

  // Main save handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      // Construct payload
      const payload: ProductFormData & { id?: string } = {
        ...formData,
        id: product?.id,
        galleryImages: formData.galleryFiles.map((f) => f.name), // Replace with uploaded URLs if needed
        imageUrl: formData.mainImageFile
          ? formData.mainImageFile.name
          : formData.imageUrl,
      };

      await onSave(payload);
    } catch (err) {
      console.error("Error saving product:", err);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50"
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
          <fieldset disabled={isSaving} className="space-y-6">
            {/* Form fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Product Name *
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Category *
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
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
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>
            </div>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Description *
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                rows={4}
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Main Image *
              </label>
              <input
                type="file"
                ref={mainImageRef}
                accept="image/*"
                onChange={handleMainImageChange}
                className="hidden"
              />
              <div
                onClick={() => mainImageRef.current?.click()}
                className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600 cursor-pointer"
              >
                {formData.mainImageFile ? (
                  <span>{formData.mainImageFile.name}</span>
                ) : (
                  <>
                    <UploadCloudIcon className="w-8 h-8 text-gray-400" />
                    <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                      Click to upload main image *
                    </span>
                  </>
                )}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Gallery Images
              </label>
              <input
                type="file"
                ref={galleryImageRef}
                accept="image/*"
                multiple
                onChange={handleGalleryImagesChange}
                className="hidden"
              />
              <div
                onClick={() => galleryImageRef.current?.click()}
                className="w-full flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 rounded-md hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors dark:border-gray-600 cursor-pointer"
              >
                <UploadCloudIcon className="w-8 h-8 text-gray-400" />
                <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Click to upload gallery images
                </span>
              </div>
              <ul className="space-y-1 mt-2">
                {formData.galleryFiles.map((file, idx) => (
                  <li
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                  >
                    <span className="truncate">{file.name}</span>
                    <button
                      type="button"
                      onClick={() => removeGalleryImage(idx)}
                      className="text-red-600 hover:text-red-800 dark:text-red-400 dark:hover:text-red-300"
                    >
                      ×
                    </button>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Product Details
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newDetail}
                  onChange={(e) => setNewDetail(e.target.value)}
                  placeholder="Add detail"
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
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                  >
                    <span>{detail}</span>
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
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Available Colors
              </label>
              <div className="flex gap-2 mb-2">
                <input
                  type="text"
                  value={newColor}
                  onChange={(e) => setNewColor(e.target.value)}
                  placeholder="Add a color"
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
                    setNewSizeGuide({
                      ...newSizeGuide,
                      length: e.target.value,
                    })
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
                {formData.sizeGuide.map((sg, idx) => (
                  <div
                    key={idx}
                    className="flex justify-between items-center bg-gray-50 dark:bg-gray-700 px-3 py-1 rounded"
                  >
                    <span>
                      {sg.size} - Chest: {sg.chest}, Length: {sg.length}
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
          </fieldset>
          <div className="flex justify-end space-x-3 pt-4 border-t">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md hover:bg-gray-200 dark:bg-gray-700 dark:text-gray-300 dark:hover:bg-gray-600 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-4 py-2 text-sm font-medium text-white bg-gray-800 rounded-md hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 disabled:opacity-50"
            >
              {isSaving
                ? "Saving..."
                : product
                ? "Update Product"
                : "Save Product"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
