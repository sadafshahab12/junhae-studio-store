"use client";
import { Product } from "@/app/data/types";
import { useProduct } from "@/app/context/ProductContext";
import EditIcon from "@/app/icons/EditIcon";
import MoreVerticalIcon from "@/app/icons/MoreVerticalIcon";
import TrashIcon from "@/app/icons/TrashIcon";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { AddProductModal } from "@/app/components/adminPageComp/Add ProductModal";





const ProductPage: React.FC = () => {
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

export default ProductPage;
