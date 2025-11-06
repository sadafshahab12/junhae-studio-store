"use client"

import React, { useState } from "react";
import { CustomizableProduct, Design } from "../data/types";
import { CUSTOMIZABLE_PRODUCTS } from "../data/constants";
import ArrowRightIcon from "../icons/ArrowRightIcon";
import DesignCanvas from "../design/DesignCanvas";
import ControlPanel from "../design/ControlPanel";
import HowItWorks from "../design/HowItWorks";
import Toast from "../components/ui/Toast";
import Link from "next/link";


const CreatePage: React.FC = () => {
  const [product, setProduct] = useState<CustomizableProduct>(
    CUSTOMIZABLE_PRODUCTS[0]
  );
  const [color, setColor] = useState(product.colors[0]);
  const [design, setDesign] = useState<Design | null>(null);
  const [showToast, setShowToast] = useState(false);

  const handleSetProduct = (newProduct: CustomizableProduct) => {
    setProduct(newProduct);
    // Reset color if the new product doesn't support the current one
    if (!newProduct.colors.find((c) => c.hex === color.hex)) {
      setColor(newProduct.colors[0]);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      setDesign({
        imageUrl: e.target?.result as string,
        position: {
          x: product.printableArea.left,
          y: product.printableArea.top,
        },
        scale: 1,
        rotation: 0,
      });
    };
    reader.readAsDataURL(file);
  };

  const handleDesignChange = (newProps: Partial<Design>) => {
    if (design) {
      setDesign({ ...design, ...newProps });
    }
  };

  const handleDesignRemove = () => {
    setDesign(null);
  };

  const handleAddToCart = () => {
    // In a real app, this would add the configuration to a cart context
    setShowToast(true);
    console.log("Added to cart:", { product, color, design });
  };

  return (
    <div className="pt-16">
      {/* Hero Section */}
      <section className="py-20 sm:py-24 text-center bg-stone-100 border-b border-gray-200">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-gray-900 animate-fade-in-up">
            Create What You Wear.
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg text-gray-600 animate-fade-in-up animation-delay-200">
            Upload your design, place it, and make it uniquely yours.
          </p>
          <div className="mt-8 animate-fade-in-up animation-delay-400">
            <Link
              href="#designer"
              className="inline-flex items-center justify-center gap-2 px-8 py-3 bg-gray-900 text-white font-semibold rounded-full hover:bg-gray-700 transition-colors duration-300"
            >
              Start Designing
              <ArrowRightIcon className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Design Tool */}
      <section id="designer" className="bg-white border-b border-gray-200">
        <div className="flex flex-col lg:flex-row min-h-screen">
          <DesignCanvas
            product={product}
            color={color}
            design={design}
            onDesignChange={handleDesignChange}
          />
          <ControlPanel
            product={product}
            setProduct={handleSetProduct}
            color={color}
            setColor={setColor}
            design={design}
            onDesignChange={handleDesignChange}
            onImageUpload={handleImageUpload}
            onDesignRemove={handleDesignRemove}
            onAddToCart={handleAddToCart}
          />
        </div>
      </section>

      <HowItWorks />

      <Toast
        message="Your design was added to the cart!"
        show={showToast}
        onClose={() => setShowToast(false)}
      />
    </div>
  );
};

export default CreatePage;
