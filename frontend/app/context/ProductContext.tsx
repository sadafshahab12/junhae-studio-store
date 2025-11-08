"use client";
import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { Product } from "@/app/data/types";
import { PRODUCTS } from "@/app/data/constants";

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => void;
  updateProduct: (id: number, product: Partial<Product>) => void;
  deleteProduct: (id: number) => void;
  getProductById: (id: number) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
}

const ProductContext = createContext<ProductContextType | undefined>(undefined);

interface ProductProviderProps {
  children: ReactNode;
}

export const ProductProvider: React.FC<ProductProviderProps> = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load products from localStorage on mount
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem("junhaeProducts");
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        // Initialize with default products
        setProducts(PRODUCTS);
        localStorage.setItem("junhaeProducts", JSON.stringify(PRODUCTS));
      }
    } catch (error) {
      console.error("Failed to load products from localStorage", error);
      setProducts(PRODUCTS);
    } finally {
      setIsLoaded(true);
    }
  }, []);

  // Save products to localStorage whenever they change
  useEffect(() => {
    if (isLoaded) {
      localStorage.setItem("junhaeProducts", JSON.stringify(products));
    }
  }, [products, isLoaded]);

  const addProduct = (product: Product) => {
    const newProduct = {
      ...product,
      id: Date.now(),
      slug: product.slug || product.name.toLowerCase().replace(/\s+/g, "-"),
    };
    setProducts((prevProducts) => [newProduct, ...prevProducts]);
  };

  const updateProduct = (id: number, updatedProduct: Partial<Product>) => {
    setProducts((prevProducts) =>
      prevProducts.map((product) =>
        product.id === id ? { ...product, ...updatedProduct } : product
      )
    );
  };

  const deleteProduct = (id: number) => {
    setProducts((prevProducts) => prevProducts.filter((product) => product.id !== id));
  };

  const getProductById = (id: number) => {
    return products.find((product) => product.id === id);
  };

  const getProductBySlug = (slug: string) => {
    return products.find((product) => product.slug === slug);
  };

  const value = {
    products,
    addProduct,
    updateProduct,
    deleteProduct,
    getProductById,
    getProductBySlug,
  };

  return <ProductContext.Provider value={value}>{children}</ProductContext.Provider>;
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};

