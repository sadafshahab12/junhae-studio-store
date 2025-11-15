"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { Product } from "../data/types";

interface ProductContextType {
  products: Product[];
  addProduct: (product: FormData) => Promise<void>;
  updateProduct: (id: string, product: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({
  children,
}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  void isLoading; // prevent unused warning

  // Fetch products from backend
  const fetchProducts = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`
      );
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      // Map MongoDB _id to frontend id
      const mappedProducts = data.products.map((p: Product) => ({
        ...p,
        id: p._id,
      }));
      setProducts(mappedProducts);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  const refreshProducts = async () => {
    await fetchProducts();
  };

  // Add product
  const addProduct = async (formData: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
        {
          method: "POST",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to add product");
      const data = await res.json();
      const newProduct: Product = { ...data.product, id: data.product._id };
      setProducts((prev) => [newProduct, ...prev]);
    } catch (error) {
      console.error("Error adding product:", error);
      throw error;
    }
  };

  // Update product
  const updateProduct = async (id: string, formData: FormData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`,
        {
          method: "PUT",
          body: formData,
        }
      );
      if (!res.ok) throw new Error("Failed to update product");
      const data = await res.json();
      const updated: Product = { ...data.product, id: data.product._id };
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error) {
      console.error("Error updating product:", error);
      throw error;
    }
  };

  // Delete product
  const deleteProduct = async (id: string) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${id}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error) {
      console.error("Error deleting product:", error);
      throw error;
    }
  };

  // Get product by ID
  const getProductById = (id: string) => products.find((p) => p.id === id);

  // Get product by slug
  const getProductBySlug = (slug: string) =>
    products.find((p) => p.slug === slug);

  const value: ProductContextType = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductBySlug,
    refreshProducts,
  };

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (!context)
    throw new Error("useProduct must be used within a ProductProvider");
  return context;
};
