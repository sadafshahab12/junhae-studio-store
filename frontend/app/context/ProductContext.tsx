"use client";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
// Assuming you have Product and other related types defined elsewhere
// For completeness, I'll add a minimal definition for Product here.
// NOTE: You should keep your original import paths if they are correct.
// import { Product } from "@/app/data/types"; 

// Minimal Product type definition for context completeness
export interface Product {
    id: string;
    name: string;
    slug: string;
    price: number;
    tagline: string;
    description: string;
    stock: number;
    galleryImages: { id: string; url: string; alt: string }[];
    details: string[];
    sizeGuide: { size: string; chest: string; length: string }[];
}

interface ProductContextType {
  products: Product[];
  addProduct: (product: Product) => Promise<void>;
  updateProduct: (id: string, product: Partial<Product>) => Promise<void>;
  deleteProduct: (id: string) => Promise<void>;
  getProductById: (id: string) => Product | undefined;
  getProductBySlug: (slug: string) => Product | undefined;
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

  // Load products from API on mount
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`
        );
        if (!res.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await res.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const addProduct = async (product: Product) => {
    try {
      // FIX 1: Destructure out the client-side 'id'. 
      // The backend should generate the ID for POST requests, and sending 
      // an 'id' field often causes a 422 Unprocessable Entity error.
      const { id, ...payload } = product; 

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send only the necessary product data (payload)
          body: JSON.stringify(payload), 
        }
      );
      
      if (!res.ok) {
        // Log the detailed server response for better debugging
        const errorText = await res.text();
        console.error("API Error Response Status:", res.status);
        console.error("API Error Response Body:", errorText);
        throw new Error("Failed to add product: check server logs for validation details.");
      }
      
      const newProduct: Product = await res.json();
      setProducts((prev) => [newProduct, ...prev]);
    } catch (error) {
      console.error(error);
      // FIX 2: Re-throw the error so the calling function (handleSave) can catch it 
      // and provide user feedback (which fixes the second part of your error trace).
      throw error; 
    }
  };

  const updateProduct = async (
    id: string,
    updatedProduct: Partial<Product>
  ) => {
    try {
      // Find product slug to use in API
      const productToUpdate = products.find((p) => p.id === id);
      if (!productToUpdate) throw new Error("Product not found");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productToUpdate.slug}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedProduct),
        }
      );
      if (!res.ok) throw new Error("Failed to update product");
      const updated: Product = await res.json();
      setProducts((prev) =>
        prev.map((product) => (product.id === id ? updated : product))
      );
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const deleteProduct = async (id: string) => {
    try {
      const productToDelete = products.find((p) => p.id === id);
      if (!productToDelete) throw new Error("Product not found");
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_API_URL}/products/${productToDelete.slug}`,
        {
          method: "DELETE",
        }
      );
      if (!res.ok) throw new Error("Failed to delete product");
      setProducts((prev) => prev.filter((product) => product.id !== id));
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  const getProductById = (id: string) => {
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

  return (
    <ProductContext.Provider value={value}>{children}</ProductContext.Provider>
  );
};

export const useProduct = () => {
  const context = useContext(ProductContext);
  if (context === undefined) {
    throw new Error("useProduct must be used within a ProductProvider");
  }
  return context;
};