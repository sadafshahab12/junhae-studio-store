"use client";

import { useProduct } from "@/app/context/ProductContext";
import { Product, CartItem } from "@/app/data/types";
import MinusIcon from "@/app/icons/MinusIcon";
import PlusIcon from "@/app/icons/PlusIcon";
import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { useCart } from "@/app/context/CartContext";
import Link from "next/link";
import ImageGallery from "@/app/components/productDetailPageComp/ImageGallery";
import AccordionItem from "@/app/components/productDetailPageComp/AccordionItem";
import { Reviews } from "@/app/components/productDetailPageComp/Reviews";
import Toast from "@/app/components/ui/Toast";
import ProductCard from "@/app/components/shopPageComp/ProductCard";

const ProductDetailPage: React.FC = () => {
  const params = useParams();
  const router = useRouter();
  const { addToCart } = useCart();
  const { products, getProductBySlug } = useProduct();
  const [product, setProduct] = useState<Product | null>(null);
  const [selectedSize, setSelectedSize] = useState("M");
  const [selectedColor, setSelectedColor] = useState(
    product?.colors?.[0] || "Default"
  );
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const colorSelection = async () => {
      if (product?.colors && product.colors.length > 0) {
        setSelectedColor(product.colors[0]);
      }
    };
    colorSelection();
  }, [product]);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!products.length) return; // Wait for products to load

      const slug = params.slug as string;
      const foundProduct = getProductBySlug(slug);

      if (!foundProduct) {
        router.push("/junhae-edits");
      } else {
        setProduct(foundProduct);
      }
      setIsLoading(false);
    };
    fetchProduct();
  }, [params.slug, products, router, getProductBySlug]);

  if (isLoading || !product) {
    return (
      <div className="pt-16 bg-white min-h-screen flex items-center justify-center">
        <p className="text-gray-600">Loading...</p>
      </div>
    );
  }

  const relatedProducts = product
    ? (() => {
        const matches = products.filter(
          (p) =>
            p.category?.trim().toLowerCase() ===
              product.category?.trim().toLowerCase() && p._id !== product.id
        );
        if (matches.length <= 4) return matches;
        // Deterministic "shuffle": compute a seed from the product id and rotate the list.
        const seed = String(product.id || "")
          .split("")
          .reduce((s, ch) => s + ch.charCodeAt(0), 0);
        const start = seed % matches.length;
        const result: typeof matches = [];
        for (let i = 0; i < Math.min(4, matches.length); i++) {
          result.push(matches[(start + i) % matches.length]);
        }
        return result;
      })()
    : [];

  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    const cartItem: CartItem = {
      id: `${product.id}-${selectedSize}-${selectedColor}`,
      name: product.name,
      price: product.price,
      imageUrl: product.imageUrl,
      description: product.tagline,
      size: selectedSize,
      color: selectedColor,
      quantity: quantity,
    };

    addToCart(cartItem);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 3000);
  };

  return (
    <div className="pt-50 bg-white">
      <main className="container mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Left Column: Image Gallery */}
          <ImageGallery
            images={product.galleryImages}
            productName={product.name}
          />

          {/* Right Column: Product Info */}
          <div className="lg:sticky lg:top-24 self-start">
            <h1 className="text-3xl lg:text-4xl font-bold tracking-tight text-gray-900">
              {product.name}
            </h1>
            <p className="mt-2 text-lg text-gray-500">{product.tagline}</p>
            <p className="mt-4 text-3xl font-medium text-gray-900">
              ${product.price.toFixed(2)}
            </p>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-800">
                Select Size
              </h3>
              <div className="mt-2 flex gap-2">
                {sizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => setSelectedSize(size)}
                    className={`px-4 py-2 w-12 h-12 flex items-center justify-center border rounded-md text-sm font-medium transition-colors ${
                      selectedSize === size
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-800">
                Select Color
              </h3>
              <div className="mt-2 flex gap-2">
                {product.colors?.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors ${
                      selectedColor === color
                        ? "bg-gray-900 text-white border-gray-900"
                        : "bg-white text-gray-700 border-gray-300 hover:bg-gray-50"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-sm font-semibold text-gray-800">Quantity</h3>
              <div className="mt-2 flex items-center border border-gray-300 rounded-md w-fit">
                <button
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-l-md"
                >
                  <MinusIcon />
                </button>
                <span className="px-4 font-medium">{quantity}</span>
                <button
                  onClick={() => setQuantity((q) => q + 1)}
                  className="p-3 text-gray-500 hover:bg-gray-100 rounded-r-md"
                >
                  <PlusIcon />
                </button>
              </div>
            </div>

            <div className="mt-8 flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
              >
                Add to Cart
              </button>
              <Link
                href="/cart"
                className="flex-1 px-8 py-4 bg-white text-gray-900 font-semibold rounded-full border-2 border-gray-900 hover:bg-gray-50 transition-colors text-center"
              >
                View Cart
              </Link>
            </div>

            <div className="mt-10">
              <p className="text-base text-gray-700">{product.description}</p>
            </div>

            <div className="mt-8">
              <AccordionItem title="Details & Care" defaultOpen>
                <ul className="list-disc list-inside">
                  {product.details.map((detail, i) => (
                    <li key={i}>{detail}</li>
                  ))}
                </ul>
              </AccordionItem>
              <AccordionItem title="Size Guide">
                <table className="w-full text-left">
                  <thead>
                    <tr>
                      <th className="font-semibold">Size</th>
                      <th className="font-semibold">Chest</th>
                      <th className="font-semibold">Length</th>
                    </tr>
                  </thead>
                  <tbody>
                    {product.sizeGuide.map((guide) => (
                      <tr key={guide.size}>
                        <td>{guide.size}</td>
                        <td>{guide.chest}</td>
                        <td>{guide.length}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </AccordionItem>
              <AccordionItem title="Shipping & Returns">
                <p>
                  Free shipping on orders over $100. We accept returns on unworn
                  items within 30 days of delivery. As a print-on-demand studio,
                  some items may be final sale.
                </p>
              </AccordionItem>
            </div>
          </div>
        </div>
      </main>

      <Reviews reviews={[]} productId={product._id || ""} />

      {/* Related Products */}
      <section className="py-16 sm:py-24 bg-stone-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">
            You May Also Like
          </h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((p, index) => (
              <ProductCard key={index} product={p} />
            ))}
          </div>
        </div>
      </section>

      <Toast
        message={`${product.name} added to cart!`}
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default ProductDetailPage;
