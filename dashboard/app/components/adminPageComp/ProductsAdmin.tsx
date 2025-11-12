"use client";
import { Product } from "@/app/data/types";
import { useProduct } from "@/app/context/ProductContext";
import EditIcon from "@/app/icons/EditIcon";
import MoreVerticalIcon from "@/app/icons/MoreVerticalIcon";
import TrashIcon from "@/app/icons/TrashIcon";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";

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

const AddProductModal: React.FC<{
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
  const [newGalleryImage, setNewGalleryImage] = useState("");

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

  const addGalleryImage = () => {
    if (newGalleryImage.trim()) {
      setFormData({
        ...formData,
        galleryImages: [...formData.galleryImages, newGalleryImage.trim()],
      });
      setNewGalleryImage("");
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

          {/* Main Image */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Main Image URL *
            </label>
            <input
              type="url"
              name="imageUrl"
              value={formData.imageUrl}
              onChange={handleChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              required
            />
          </div>

          {/* Gallery Images */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Gallery Images
            </label>
            <div className="flex gap-2 mb-2">
              <input
                type="url"
                value={newGalleryImage}
                onChange={(e) => setNewGalleryImage(e.target.value)}
                placeholder="Image URL"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <button
                type="button"
                onClick={addGalleryImage}
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
              >
                Add
              </button>
            </div>
            <div className="space-y-2">
              {formData.galleryImages.map((img, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">
                    {img}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeGalleryImage(idx)}
                    className="px-3 py-1 text-sm bg-red-100 text-red-700 rounded hover:bg-red-200"
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
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
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
                    className="text-red-600 hover:text-red-800"
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
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
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
                    className="ml-2 text-red-600 hover:text-red-800"
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
                className="px-4 py-2 bg-gray-900 text-white rounded-md hover:bg-gray-700"
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
                    className="text-red-600 hover:text-red-800"
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

const ProductsAdmin: React.FC = () => {
  // Destructure context functions
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Adjusted condition to correctly check if the click is outside the dropdown menu
      const buttonElement = document.querySelector(
        `[data-product-id="${openMenuId}"]`
      );
      if (
        openMenuId &&
        menuRef.current &&
        !menuRef.current.contains(event.target as Node) &&
        (!buttonElement || !buttonElement.contains(event.target as Node))
      ) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [openMenuId]);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string) => {
    // ID should be string per context
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id); // Use context deleteProduct
        alert("✅ Product deleted successfully!");
      } catch (error) {
        console.error("Delete failed:", error);
        alert("Something went wrong while deleting the product.");
      }
    }
    setOpenMenuId(null);
  };

  // ✅ Use context functions for saving/updating
  const handleSave = async (productData: Product) => {
    const isUpdating = productData.id !== undefined && productData.id !== null;

    try {
      if (isUpdating) {
        // ID should be string as per ProductContextType
        await updateProduct(productData.id as string, productData);
        alert("✅ Product updated successfully!");
      } else {
        // Strip out the client-side generated 'id' before passing to addProduct,
        // although the ProductContext addProduct implementation should handle it
        // by only using the product properties for the POST body.
        await addProduct(productData);
        alert("✅ Product added successfully!");
      }
    } catch (error) {
      console.error(
        `Failed to ${isUpdating ? "update" : "add"} product:`,
        error
      );
      alert("Something went wrong while saving the product.");
    }
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditingProduct(undefined);
  };

  const getStockStatus = (stock: number) => {
    if (stock > 50)
      return (
        <span className="px-2 py-1 text-xs font-medium text-green-800 bg-green-100 rounded-full dark:bg-green-900 dark:text-green-300">
          In Stock
        </span>
      );
    if (stock > 0)
      return (
        <span className="px-2 py-1 text-xs font-medium text-yellow-800 bg-yellow-100 rounded-full dark:bg-yellow-900 dark:text-yellow-300">
          Low Stock
        </span>
      );
    return (
      <span className="px-2 py-1 text-xs font-medium text-red-800 bg-red-100 rounded-full dark:bg-red-900 dark:text-red-300">
        Out of Stock
      </span>
    );
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
          Products ({products.length})
        </h2>
        <button
          onClick={() => {
            setEditingProduct(undefined);
            setIsModalOpen(true);
          }}
          className="px-4 py-2 text-sm font-semibold text-white bg-gray-800 rounded-lg hover:bg-gray-700 dark:bg-gray-200 dark:text-gray-900 dark:hover:bg-gray-300 transition"
        >
          Add New Product
        </button>
      </div>

      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow overflow-x-auto">
        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product Name
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Stock
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product, index) => (
              <tr
                key={index}
                className="bg-white dark:bg-gray-800 border-b dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
              >
                <td className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap">
                  <div className="flex items-center">
                    <Image
                      src={product.imageUrl}
                      alt={product.name}
                      className="w-10 h-10 rounded-md object-cover mr-4"
                      width={1000}
                      height={1000}
                    />
                    {product.name}
                  </div>
                </td>
                <td className="px-6 py-4">{product.category}</td>
                <td className="px-6 py-4">
                  ${(product.price ?? 0).toFixed(2)}
                </td>
                <td className="px-6 py-4">
                  {getStockStatus(product.stock || 0)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left">
                    <button
                      data-product-id={product.id} // Added data attribute for click outside logic
                      onClick={() =>
                        product.id && toggleMenu(String(product.id))
                      }
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVerticalIcon className="w-5 h-5" />
                    </button>
                    {openMenuId === product.id && (
                      <div
                        className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10"
                        ref={menuRef}
                      >
                        <div className="py-1">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <EditIcon className="w-4 h-4 mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id as string)} // Cast to string for context
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <TrashIcon className="w-4 h-4 mr-2" /> Delete
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* ✅ FIX: Add a key to force React to remount the modal component whenever it opens 
        or the product being edited changes. This ensures the component's internal 
        useState is re-initialized correctly, fixing the cascading render bug.
      */}
      <AddProductModal
        key={isModalOpen ? editingProduct?.id || "new-product" : "modal-closed"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsAdmin;
