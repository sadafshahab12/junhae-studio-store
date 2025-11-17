"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
  useCallback,
} from "react";
import { Product } from "../data/types";

interface ProductContextType {
  products: Product[];
  addProduct: (formData: FormData) => Promise<void>;
  updateProduct: (id: string, formData: FormData) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
  refreshProducts: () => Promise<void>;
  isLoading: boolean;
  isAdding: boolean;
  isUpdating: boolean;
  isDeleting: boolean;
  error: string | null;
}
interface RawProduct {
  _id: string;
  slug: string;
  name: string;
  tagline?: string;
  price?: number;
  imageUrl?: string;
  galleryImages?: string[];
  description?: string;
  category?: string;
  details?: string[];
  sizeGuide?: { size: string; chest: string; length: string }[];
  newest?: boolean;
  bestseller?: boolean;
  stock?: number;
  colors?: string[];
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
  const [isAdding, setIsAdding] = useState(false);
  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const backendUrl = process.env.NEXT_PUBLIC_BACKEND_API_URL;

  const getErrorMessage = (error: unknown): string => {
    if (error instanceof Error) {
      return error.message;
    }
    return String(error);
  };

  const fetchProducts = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);
      const res = await fetch(`${backendUrl}/products`);
      if (!res.ok) throw new Error("Failed to fetch products");
      const data = await res.json();
      const mappedProducts: Product[] = data.products.map((p: RawProduct) => ({
        ...p,
        id: p._id,
      }));
      setProducts(mappedProducts);
    } catch (error: unknown) {
      console.error("Error fetching products:", error);
      setError(getErrorMessage(error));
    } finally {
      setIsLoading(false);
    }
  }, [backendUrl]);

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const refreshProducts = async () => {
    await fetchProducts();
  };

  const addProduct = async (formData: FormData) => {
    try {
      setIsAdding(true);
      setError(null);

      let imageUrl = formData.get("imageUrl") as string;
      let galleryUrls: string[] = formData.getAll("galleryImages") as string[];

      // 1. Upload main image if a new file is provided
      const mainImageFile = formData.get("imageFile");
      if (mainImageFile instanceof File) {
        const mainForm = new FormData();
        mainForm.append("image", mainImageFile);
        const mainRes = await fetch(`${backendUrl}/upload-main`, {
          method: "POST",
          body: mainForm,
        });
        if (!mainRes.ok) throw new Error("Failed to upload main image");
        const mainData = await mainRes.json();
        imageUrl = mainData.url;
      }

      // 2. Upload gallery images if new files are provided
      const galleryFiles = formData.getAll("galleryFiles");
      if (galleryFiles.length > 0 && galleryFiles[0] instanceof File) {
        const galleryForm = new FormData();
        galleryFiles.forEach((file) => galleryForm.append("images", file));
        const galleryRes = await fetch(`${backendUrl}/upload-gallery`, {
          method: "POST",
          body: galleryForm,
        });
        if (!galleryRes.ok) throw new Error("Failed to upload gallery images");
        const galleryData = await galleryRes.json();
        galleryUrls = galleryData.urls;
      }

      // 3. Create product with uploaded URLs
      const productData = Object.fromEntries(formData);
      const productRes = await fetch(`${backendUrl}/products`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          imageUrl,
          galleryImages: galleryUrls,
        }),
      });

      if (!productRes.ok) {
        const errorData = await productRes.json();
        throw new Error(errorData.message || "Failed to add product");
      }
      const data = await productRes.json();
      const newProduct: Product = { ...data.product, id: data.product._id };
      setProducts((prev) => [newProduct, ...prev]);
    } catch (error: unknown) {
      console.error("Error adding product:", error);
      const message = getErrorMessage(error);
      setError(message);
      throw new Error(message);
    } finally {
      setIsAdding(false);
    }
  };

  const updateProduct = async (id: string, formData: FormData) => {
    try {
      setIsUpdating(true);
      setError(null);

      let imageUrl = formData.get("imageUrl") as string;
      let galleryUrls: string[] = formData.getAll("galleryImages") as string[];

      // 1. Upload main image if a new file is provided
      const mainImageFile = formData.get("imageFile");
      if (mainImageFile instanceof File) {
        const mainForm = new FormData();
        mainForm.append("image", mainImageFile);
        const mainRes = await fetch(`${backendUrl}/upload-main`, {
          method: "POST",
          body: mainForm,
        });
        if (!mainRes.ok) throw new Error("Failed to upload main image");
        const mainData = await mainRes.json();
        imageUrl = mainData.url;
      }

      // 2. Upload gallery images if new files are provided
      const galleryFiles = formData.getAll("galleryFiles");
      if (galleryFiles.length > 0 && galleryFiles[0] instanceof File) {
        const galleryForm = new FormData();
        galleryFiles.forEach((file) => galleryForm.append("images", file));
        const galleryRes = await fetch(`${backendUrl}/upload-gallery`, {
          method: "POST",
          body: galleryForm,
        });
        if (!galleryRes.ok) throw new Error("Failed to upload gallery images");
        const galleryData = await galleryRes.json();
        galleryUrls = galleryData.urls;
      }

      // 3. Update product with uploaded URLs
      const productData = Object.fromEntries(formData);
      const productRes = await fetch(`${backendUrl}/products/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...productData,
          imageUrl,
          galleryImages: galleryUrls,
        }),
      });

      if (!productRes.ok) {
        const errorData = await productRes.json();
        throw new Error(errorData.message || "Failed to update product");
      }
      const data = await productRes.json();
      const updated: Product = { ...data.product, id: data.product._id };
      setProducts((prev) => prev.map((p) => (p.id === id ? updated : p)));
    } catch (error: unknown) {
      console.error("Error updating product:", error);
      const message = getErrorMessage(error);
      setError(message);
      throw new Error(message);
    } finally {
      setIsUpdating(false);
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      setIsDeleting(true);
      setError(null);
      const res = await fetch(`${backendUrl}/products/${id}`, {
        method: "DELETE",
      });
      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Failed to delete product");
      }
      setProducts((prev) => prev.filter((p) => p.id !== id));
    } catch (error: unknown) {
      console.error("Error deleting product:", error);
      const message = getErrorMessage(error);
      setError(message);
      throw new Error(message);
    } finally {
      setIsDeleting(false);
    }
  };

  const getProductById = (id: string) => products.find((p) => p.id === id);
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
    isLoading,
    isAdding,
    isUpdating,
    isDeleting,
    error,
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