"use client";
import { Product } from "@/app/data/types";
import { useProduct } from "@/app/context/ProductContext";
import EditIcon from "@/app/icons/EditIcon";
import MoreVerticalIcon from "@/app/icons/MoreVerticalIcon";
import TrashIcon from "@/app/icons/TrashIcon";
import Image from "next/image";
import React, { useState, useRef, useEffect } from "react";
import { AddProductModal } from "@/app/components/adminPageComp/Add ProductModal";
import Toast from "@/app/components/ui/Toast";

interface ProductFormData extends Partial<Product> {
  mainImageFile?: File;
  galleryFiles?: File[];
}

const toFormData = (product: ProductFormData) => {
  const formData = new FormData();

  // Append all fields from the product form
  Object.keys(product).forEach((key) => {
    const value = product[key as keyof ProductFormData];
    if (key === "mainImageFile" || key === "galleryFiles") return; // Handled separately

    if (value !== undefined && value !== null) {
      if (Array.isArray(value)) {
        value.forEach((item) => formData.append(key, item));
      } else if (typeof value === "object") {
        formData.append(key, JSON.stringify(value));
      } else {
        formData.append(key, String(value));
      }
    }
  });

  // Append files
  if (product.mainImageFile) {
    formData.append("imageFile", product.mainImageFile);
  }
  if (product.galleryFiles) {
    product.galleryFiles.forEach((file) =>
      formData.append("galleryFiles", file)
    );
  }

  return formData;
};

const getErrorMessage = (error: unknown): string => {
  if (error instanceof Error) {
    return error.message;
  }
  return String(error);
};

const ProductPage: React.FC = () => {
  const {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    isDeleting,
    error,
    clearError,
  } = useProduct();
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>(
    undefined
  );
  const [toast, setToast] = useState<{ message: string; show: boolean }>({
    message: "",
    show: false,
  });
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
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

  useEffect(() => {
    if (error) {
      setToast({ message: error, show: true });
      clearError();
    }
  }, [error, clearError]);

  const toggleMenu = (id: string) => {
    setOpenMenuId(openMenuId === id ? null : id);
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsModalOpen(true);
    setOpenMenuId(null);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this product?")) {
      try {
        await deleteProduct(id);
        setToast({ message: "✅ Product deleted successfully!", show: true });
      } catch (err: unknown) {
        setToast({
          message: getErrorMessage(err) || "Something went wrong while deleting.",
          show: true,
        });
      }
    }
    setOpenMenuId(null);
  };

  const handleSave = async (productData: ProductFormData & { id?: string }) => {
    try {
      const formData = toFormData(productData);
      const isUpdating = !!productData.id;

      if (isUpdating) {
        await updateProduct(productData.id as string, formData);
        setToast({ message: "✅ Product updated successfully!", show: true });
      } else {
        await addProduct(formData);
        setToast({ message: "✅ Product added successfully!", show: true });
      }
      handleCloseModal();
    } catch (err: unknown) {
      setToast({
        message: getErrorMessage(err) || "Something went wrong while saving.",
        show: true,
      });
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
                      width={40}
                      height={40}
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
                      data-product-id={product.id}
                      onClick={() => toggleMenu(String(product.id))}
                      className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
                      disabled={isDeleting}
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
                            onClick={() => handleDelete(product.id as string)}
                            className="flex items-center w-full px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-gray-100 dark:hover:bg-gray-700"
                            disabled={isDeleting}
                          >
                            {isDeleting ? (
                              "Deleting..."
                            ) : (
                              <>
                                <TrashIcon className="w-4 h-4 mr-2" /> Delete
                              </>
                            )}
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
        key={isModalOpen ? editingProduct?.id || "new-product" : "modal-closed"}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        product={editingProduct}
        onSave={handleSave}
      />
      <Toast
        message={toast.message}
        show={toast.show}
        onClose={() => setToast({ message: "", show: false })}
      />
    </div>
  );
};

export default ProductPage;