"use client";
import AccordionItem from "@/app/components/productDetailPageComp/AccordionItem";
import ImageGallery from "@/app/components/productDetailPageComp/ImageGallery";
import ProductCard from "@/app/components/shopPageComp/ProductCard";
import Toast from "@/app/components/ui/Toast";
import { PRODUCTS, REVIEWS } from "@/app/data/constants";
import { Product, Review } from "@/app/data/types";
import MinusIcon from "@/app/icons/MinusIcon";
import PlusIcon from "@/app/icons/PlusIcon";
import StarIcon from "@/app/icons/StarIcon";
import Image from "next/image";
import React, { useState } from "react";

interface ProductDetailProps {
  product: Product;
}

const Reviews: React.FC<{ reviews: Review[] }> = ({ reviews }) => {
  const averageRating =
    reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-16 sm:py-24 border-t border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="text-2xl font-bold tracking-tight text-gray-900">
          Customer Reviews
        </h2>
        <div className="mt-4 flex items-center">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <StarIcon
                key={i}
                filled={i < Math.round(averageRating)}
                className="text-yellow-400"
              />
            ))}
          </div>
          <p className="ml-2 text-sm text-gray-600">
            {averageRating.toFixed(1)} out of 5
          </p>
          <p className="ml-4 pl-4 border-l border-gray-200 text-sm text-gray-600">
            {reviews.length} reviews
          </p>
        </div>

        <div className="mt-10 space-y-10">
          {reviews.map((review) => (
            <div key={review.id} className="flex flex-col sm:flex-row gap-6">
              <div className="shrink-0">
                <Image
                  className="h-12 w-12 rounded-full object-cover"
                  src={review.avatarUrl}
                  alt={review.author}
                  width={1000}
                  height={1000}
                />
              </div>
              <div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <StarIcon
                      key={i}
                      filled={i < review.rating}
                      className="text-yellow-400"
                    />
                  ))}
                </div>
                <p className="mt-4 text-base text-gray-600">{review.text}</p>
                <p className="mt-4 text-sm font-medium text-gray-900">
                  {review.author}
                </p>
                <p className="text-sm text-gray-500">{review.date}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const ProductDetailPage: React.FC<ProductDetailProps> = ({ product }) => {
  const [selectedSize, setSelectedSize] = useState("M");
  const [quantity, setQuantity] = useState(1);
  const [showToast, setShowToast] = useState(false);

  const relatedProducts = PRODUCTS.filter(
    (p) => p.category === product.category && p.id !== product.id
  ).slice(0, 4);
  const sizes = ["S", "M", "L", "XL"];

  const handleAddToCart = () => {
    setShowToast(true);
    console.log(
      `Added to cart: ${quantity} x ${product.name} (Size: ${selectedSize})`
    );
  };

  return (
    <div className="pt-16 bg-white">
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

            <div className="mt-8">
              <button
                onClick={handleAddToCart}
                className="w-full px-8 py-4 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors"
              >
                Add to Cart
              </button>
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

      <Reviews reviews={REVIEWS} />

      {/* Related Products */}
      <section className="py-16 sm:py-24 bg-stone-50 border-t border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-bold tracking-tight text-center text-gray-900">
            You May Also Like
          </h2>
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-12">
            {relatedProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
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
