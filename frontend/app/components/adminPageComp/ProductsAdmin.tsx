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
}

const AddProductModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  product?: Product;
  onSave: (product: Product) => void;
}> = ({ isOpen, onClose, product, onSave }) => {
  const [formData, setFormData] = useState<ProductFormData>({
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
  });

  const [newDetail, setNewDetail] = useState("");
  const [newSizeGuide, setNewSizeGuide] = useState({ size: "", chest: "", length: "" });
  const [newGalleryImage, setNewGalleryImage] = useState("");

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        slug: product.slug,
        tagline: product.tagline,
        price: product.price,
        description: product.description,
        category: product.category,
        stock: product.stock || 0,
        newest: product.newest || false,
        bestseller: product.bestseller || false,
        imageUrl: product.imageUrl,
        galleryImages: product.galleryImages,
        details: product.details,
        sizeGuide: product.sizeGuide,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const productData: Product = {
      id: product?.id || Date.now(),
      ...formData,
      slug: formData.slug || formData.name.toLowerCase().replace(/\s+/g, "-"),
    };
    onSave(productData);
    onClose();
    // Reset form
    setFormData({
      name: "",
      slug: "",
      tagline: "",
      price: 0,
      description: "",
      category: "Tees",
      stock: 0,
      newest: false,
      bestseller: false,
      imageUrl: "",
      galleryImages: [],
      details: [],
      sizeGuide: [],
    });
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
                value={formData.name}
                onChange={(e) => {
                  setFormData({ ...formData, name: e.target.value });
                  if (!product) {
                    setFormData({
                      ...formData,
                      name: e.target.value,
                      slug: e.target.value.toLowerCase().replace(/\s+/g, "-"),
                    });
                  }
                }}
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
                value={formData.slug}
                onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
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
                value={formData.tagline}
                onChange={(e) => setFormData({ ...formData, tagline: e.target.value })}
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
                value={formData.price}
                onChange={(e) => setFormData({ ...formData, price: parseFloat(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                Category *
              </label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
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
                value={formData.stock}
                onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
          </div>

          {/* Flags */}
          <div className="flex gap-4">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.newest}
                onChange={(e) => setFormData({ ...formData, newest: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Newest</span>
            </label>
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={formData.bestseller}
                onChange={(e) => setFormData({ ...formData, bestseller: e.target.checked })}
                className="mr-2"
              />
              <span className="text-sm text-gray-700 dark:text-gray-300">Bestseller</span>
            </label>
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
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
              value={formData.imageUrl}
              onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
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
                  <span className="flex-1 text-sm text-gray-600 dark:text-gray-400 truncate">{img}</span>
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
                onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addDetail())}
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
                <li key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
                  <span className="text-sm text-gray-700 dark:text-gray-300">{detail}</span>
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

          {/* Size Guide */}
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
              Size Guide
            </label>
            <div className="grid grid-cols-4 gap-2 mb-2">
              <input
                type="text"
                value={newSizeGuide.size}
                onChange={(e) => setNewSizeGuide({ ...newSizeGuide, size: e.target.value })}
                placeholder="Size"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                value={newSizeGuide.chest}
                onChange={(e) => setNewSizeGuide({ ...newSizeGuide, chest: e.target.value })}
                placeholder="Chest"
                className="px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-900 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
              <input
                type="text"
                value={newSizeGuide.length}
                onChange={(e) => setNewSizeGuide({ ...newSizeGuide, length: e.target.value })}
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
                <div key={idx} className="flex items-center justify-between bg-gray-50 dark:bg-gray-700 px-3 py-2 rounded">
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
  const { products, addProduct, updateProduct, deleteProduct } = useProduct();
  const [openMenuId, setOpenMenuId] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(undefined);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setOpenMenuId(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleMenu = (id: number) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = (id: number) => {
    if (confirm("Are you sure you want to delete this product?")) {
      deleteProduct(id);
    }
    setOpenMenuId(null);
  };

  const handleSave = (product: Product) => {
    if (editingProduct) {
      updateProduct(product.id, product);
    } else {
      addProduct(product);
    }
    setEditingProduct(undefined);
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
              <th scope="col" className="px-6 py-3">Product Name</th>
              <th scope="col" className="px-6 py-3">Category</th>
              <th scope="col" className="px-6 py-3">Price</th>
              <th scope="col" className="px-6 py-3">Stock</th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
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
                <td className="px-6 py-4">${product.price.toFixed(2)}</td>
                <td className="px-6 py-4">{getStockStatus(product.stock || 0)}</td>
                <td className="px-6 py-4 text-right">
                  <div className="relative inline-block text-left" ref={menuRef}>
                    <button
                      onClick={() => toggleMenu(product.id)}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      <MoreVerticalIcon className="w-5 h-5" />
                    </button>
                    {openMenuId === product.id && (
                      <div className="absolute right-0 mt-2 w-40 origin-top-right bg-white dark:bg-gray-900 rounded-md shadow-lg ring-1 ring-black ring-opacity-5 z-10">
                        <div className="py-1">
                          <button
                            onClick={() => handleEdit(product)}
                            className="flex items-center w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                          >
                            <EditIcon className="w-4 h-4 mr-2" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(product.id)}
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
      <AddProductModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSave}
      />
    </div>
  );
};

export default ProductsAdmin;
